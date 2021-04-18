import React from "react";
import { db } from "../firebase";
import { Characters, CharArray } from "../constants";
import { CharacterPortrait } from "../Character/CharacterPortrait";
import { Roster } from "../Character/RosterRenderer";
import { TeamInputCharacter } from "./TeamInputCharacter";
import { GenerateAllPermutations } from "../utility";

const collectionName = "normalized-ratings";
const rankDocName = "char-ranking";
const synergyDocName = "synergy-rating";

const RATING_WEIGHT = 1;
const SYNERGY_WEIGHT = 1.5;

export class TeamGenerator extends React.Component {
  rosterState;
  selectedTeam = [undefined, undefined, undefined, undefined];

  characterRatings;
  synergyRatings;

  constructor(props) {
    super(props);

    this.rosterState = CharArray.map((c) => ({
      char: c,
      enabled: true,
      selected: false,
    }));

    this.state = {
      recommendedTeams: [],
    };
  }

  render() {
    return (
      <div className="team-generator">
        <div className="roster-grid">
          <Roster onCharEnabledCallback={this.onCharEnabledChanged} isCharSelected={this.isCharSelected} />
        </div>
        <div className="team-input-box">
          {[0, 1, 2, 3].map((id) => (
            <TeamInputCharacter id={id} tryAddToTeam={this.tryAddToTeam} onClear={this.clearSelectedTeam} />
          ))}
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

  isCharSelected = (char) => {
    return this.selectedTeam.findIndex((c) => char.id === c?.id) > -1;
  };

  tryAddToTeam = (index, char) => {
    // Special case for traveller
    // Allow if the spot being overridden contains traveler
    if (!!char.isTraveler && !this.selectedTeam[index]?.isTraveler) {
      if (
        this.selectedTeam.findIndex((c) => c?.id === Characters.Traveler_Anemo.id) > -1 ||
        this.selectedTeam.findIndex((c) => c?.id === Characters.Traveler_Geo.id) > -1
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
    let fetchRatings = Promise.resolve();
    let fetchSynergy = Promise.resolve();

    if (!this.characterRatings) {
      fetchRatings = db
        .collection(collectionName)
        .doc(rankDocName)
        .get()
        .then((doc) => {
          this.characterRatings = doc.data().rank;
        })
        .catch((error) => {
          console.error(`Error fetching char ratings - ${error}`);
        });
    }

    if (!this.synergyRatings) {
      fetchSynergy = db
        .collection(collectionName)
        .doc(synergyDocName)
        .get()
        .then((doc) => {
          this.synergyRatings = doc.data();
        })
        .catch((error) => {
          console.error(`Error fetching synergy ratings - ${error}`);
        });
    }

    Promise.all([fetchRatings, fetchSynergy]).then(() => {
      this.setState({ recommendedTeams: this.getSuggestions(1) });
    });
  };

  getSuggestions(count) {
    var results = [];

    // Get list of available chars
    var characterList = this.rosterState.filter((s) => s.enabled && !s.selected).map((s) => s.char);
    var groupSize = 0;
    this.selectedTeam.forEach((c) => {
      if (!c) {
        ++groupSize;
      }
    });
    var perms = GenerateAllPermutations(characterList, groupSize);

    perms.forEach((p) => {
      var comp = [...this.selectedTeam];

      for (var i = 0, j = 0; i < 4; ++i) {
        if (!comp[i]) {
          comp[i] = p[j++];
        }
      }

      results.push({
        comp,
        rating: this.rateComp(comp),
      });
    });

    results.sort((a, b) => b.rating - a.rating);
    return results.slice(0, count).map((r) => r.comp);
  }

  rateComp(comp) {
    if (comp.length !== 4) {
      console.error(`Invalid comp size ${comp.length}`);
      return -1;
    }

    if (!this.characterRatings || !this.synergyRatings) {
      console.error(`Ratings not fetched. Ratings: ${this.characterRatings} Synergy: ${this.synergyRatings}`);
      return -1;
    }

    // Add individual chars
    var rating = 0;
    for (var i = 0; i < 4; ++i) {
      rating += this.characterRatings[comp[i].id];
    }

    rating *= RATING_WEIGHT;

    var synergy = 0;
    var pairs = GenerateAllPermutations(comp, 2);

    pairs.forEach((pair) => {
      var val = this.getSynergy(pair[0], pair[1]);
      if (val > 0) {
        synergy += val;
      }
    });

    synergy *= SYNERGY_WEIGHT;

    // console.info(`${comp.map((c) => c.displayName)} Rating: ${rating} Synergy: ${synergy} Total: ${rating + synergy}`);

    return rating + synergy;
  }

  getSynergy(char_a, char_b) {
    let val = this.synergyRatings[char_a.name][char_b.id];
    if (val < 0) {
      console.error(`Invalid synergy value ${val} found between ${char_a.displayName} and ${char_b.displayName}.`);
      return -1;
    }

    return val;
  }
}
