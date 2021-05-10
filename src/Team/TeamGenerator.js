import React from "react";
import * as Constants from "../constants";
import { CharacterPortrait } from "../Character/CharacterPortrait";
import { Roster } from "../Character/RosterRenderer";
import { TeamInputCharacter } from "./TeamInputCharacter";
import { GenerateAllPermutations } from "../utility";
import { Database } from "../Rating/Database";
import { Composition } from "./Composition";

const collectionName = "normalized-ratings";
const tagDocName = "tags";

// Rating Weights

// Weight for individual character ratings
const TAG_RATING_WEIGHT = 1;

// Weight for character synergy ratings
const SYNERGY_WEIGHT = 1;

// Weight for penalty for overlapping roles
const ROLE_OVERLAP_WEIGHT = -2;

// Weight for selected character ratings
const SELECTED_CHAR_WEIGHT = 4;

// Constant value for required elements
const REQUIRED_WEIGHT = 50;

export class TeamGenerator extends React.Component {
  constructor(props) {
    super(props);

    this.rosterState = Constants.AllCharacters.map((c) => ({
      char: c,
      enabled: true,
      selected: false,
    }));

    this.selectedTeam = [undefined, undefined, undefined, undefined];
    this.state = {
      recommendedTeams: [],
      requireHealer: true,
    };
    this.database = new Database(collectionName, tagDocName);
    this.checkboxRef = React.createRef();
  }

  render() {
    return (
      <div className="team-generator">
        <div className="roster-grid">
          <Roster onCharEnabledCallback={this.onCharEnabledChanged} isCharSelected={this.isCharSelected} />
        </div>
        <div className="team-input-box">
          {[0, 1, 2, 3].map((id) => (
            <TeamInputCharacter key={id} id={id} tryAddToTeam={this.tryAddToTeam} onClear={this.clearSelectedTeam} />
          ))}
        </div>
        <div>
          <input type="checkbox" defaultChecked={true} onChange={this.onRequireHealerChanged} />
          <label>Require Healer</label>
        </div>
        <button className="recommend-button" onClick={this.onSuggestHandler}>
          Suggest!
        </button>
        {this.state.recommendedTeams.map((team) => {
          if (!team) {
            return null;
          }

          return (
            <div className="team-input-box">
              {team.map((char) => (
                <CharacterPortrait char={char} />
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  onCharEnabledChanged = (char, enabled) => {
    this.rosterState[char.id].enabled = enabled;
  };

  onRequireHealerChanged = (event) => {
    this.setState({
      requireHealer: event.target.checked,
    });
  };

  isCharSelected = (char) => {
    return this.selectedTeam.findIndex((c) => char.id === c?.id) > -1;
  };

  tryAddToTeam = (index, char) => {
    // Special case for traveller
    // Allow if the spot being overridden contains traveler
    if (!!char.isTraveler && !this.selectedTeam[index]?.isTraveler) {
      if (
        this.selectedTeam.findIndex((c) => c?.id === Constants.Characters.Traveler_Anemo.id) > -1 ||
        this.selectedTeam.findIndex((c) => c?.id === Constants.Characters.Traveler_Geo.id) > -1
      ) {
        return false;
      }
    }

    if (this.selectedTeam.findIndex((c) => c?.id === char.id) > -1) {
      return false;
    }

    this.rosterState[char.id].selected = true;
    this.selectedTeam[index] = char;
    return true;
  };

  clearSelectedTeam = (index) => {
    var char = this.selectedTeam[index];
    this.rosterState[char.id].selected = false;

    this.selectedTeam[index] = undefined;
  };

  onSuggestHandler = () => {
    this.database.readPromise.then(() => {
      this.setState({ recommendedTeams: this.getSuggestions(3) });
    });
  };

  getSuggestions(count) {
    var results = [];

    // Store selected chars
    this.selectedChars = {};
    this.rosterState
      .filter((r) => r.selected)
      .forEach((r) => {
        this.selectedChars[r.char.name] = true;
      });

    // Get list of available chars
    var characterList = this.rosterState.filter((r) => r.enabled && !r.selected).map((r) => r.char);
    var groupSize = 0;
    this.selectedTeam.forEach((c) => {
      if (!c) {
        ++groupSize;
      }
    });
    var perms = GenerateAllPermutations(characterList, groupSize);

    perms.forEach((p) => {
      var chars = [...this.selectedTeam];

      for (var i = 0, j = 0; i < 4; ++i) {
        if (!chars[i]) {
          chars[i] = p[j++];
        }
      }

      results.push(this.rateComp(chars));
    });

    results.sort((a, b) => b.rating - a.rating);

    // const debug = results.slice(0, 50);
    // for (const result of debug) {
    //   console.log(result.logString);
    // }

    return results.slice(0, count).map((r) => r.chars);
  }

  rateComp(chars) {
    if (chars.length !== 4) {
      console.error(`Invalid number of chars ${chars.length}`);
      return -1;
    }

    let logString = `[${chars[0].name},${chars[1].name},${chars[2].name},${chars[3].name}]`;

    const comp = new Composition(chars);

    // Calculate individual char ratings
    const tagRating = this.sumRatings(comp.tags);
    logString += `[Ratings: ${tagRating}] `;

    // Calculate synergy ratings
    const synergyRating = this.sumSynergy(comp.tags);
    logString += `[Synergy: ${synergyRating}] `;

    // Check overlaps
    const overlapRating = this.sumOverlap(comp.characters);
    logString += `[Overlap: ${overlapRating}] `;

    // Check if a healer is requested
    let healer = 0;
    if (
      this.state.requireHealer &&
      comp.characters.filter((c) => (c.roles & Constants.RoleMask.Healer) === Constants.RoleMask.Healer).length > 0
    ) {
      logString += `[Healer] `;
      healer += REQUIRED_WEIGHT;
    }

    const rating = tagRating + synergyRating + overlapRating + healer;
    logString += `[Total: ${rating}]`;

    return {
      chars,
      rating,
      logString: logString,
    };
  }

  sumRatings(tags) {
    let tagRatings = 0;

    for (const tag of tags) {
      tagRatings += this.database.data[tag].Rating;
    }

    tagRatings *= TAG_RATING_WEIGHT;
    return tagRatings;
  }

  sumSynergy(tags) {
    let synergyRating = 0;

    for (let i = 0; i < tags.length; ++i) {
      const tagA = tags[i];
      if (!this.isSelected(tagA)) {
        continue;
      }

      for (let j = i + 1; j < tags.length; ++j) {
        const tagB = tags[j];
        const rating = this.database.data[tagA][tagB];
        if (!!rating) {
          let multiplier = 1;

          if (this.isSelected(tagA) || this.isSelected(tagB)) {
            multiplier = SELECTED_CHAR_WEIGHT;
          }

          synergyRating += rating * multiplier;
        }
      }
    }

    synergyRating *= SYNERGY_WEIGHT;
    return synergyRating;
  }

  sumOverlap(chars) {
    let overlapRating = 0;
    for (let i = 0; i < 4; ++i) {
      const role1 = chars[i].roles;
      const nameA = chars[i].name;

      for (let j = i + 1; j < 4; ++j) {
        const role2 = chars[j].roles;
        const nameB = chars[j].name;

        if ((role1 & role2) !== Constants.RoleMask.None) {
          let multiplier = 1;

          if (this.isSelected(nameA) || this.isSelected(nameB)) {
            multiplier = SELECTED_CHAR_WEIGHT;
          }
          overlapRating += ROLE_OVERLAP_WEIGHT * multiplier;
        }
      }
    }

    return overlapRating;
  }

  isSelected(charName) {
    return !!this.selectedChars[charName];
  }
}
