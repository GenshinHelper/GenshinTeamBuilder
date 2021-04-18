import React from "react";
import { Characters, CharArray } from "../constants";
import { Roster } from "../Character/RosterRenderer";
import { TeamInputCharacter } from "./TeamInputCharacter";

export class TeamGenerator extends React.Component {
  rosterState;
  selectedTeam = [undefined, undefined, undefined, undefined];

  constructor(props) {
    super(props);

    this.rosterState = CharArray.map((c) => ({
      char: c,
      enabled: true,
      selected: false,
    }));
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
        <button className="recommend-button">Suggest!</button>
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

    this.selectedTeam[index] = char;
    return true;
  };

  clearSelectedTeam = (index) => {
    this.selectedTeam[index] = undefined;
  };
}
