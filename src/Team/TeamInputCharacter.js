import React from "react";
import { Characters } from "../constants";
import { CharacterPortrait } from "../Character/CharacterPortrait";

import "./TeamGenerator.css";

export class TeamInputCharacter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: undefined,
    };
  }

  render() {
    return (
      <div
        className="team-input-character"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        onClick={this.handleClick}
      >
        <CharacterPortrait char={this.state.selected} />
      </div>
    );
  }

  handleDrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var char = Characters[data];

    // Check if this is a valid addition
    if (this.props.tryAddToTeam(this.props.id, char)) {
      this.setState({ selected: Characters[data] });
    }
  };

  handleDragOver = (ev) => {
    ev.preventDefault();
  };

  handleClick = (ev) => {
    ev.preventDefault();
    this.props.onClear(this.props.id);
    this.setState({ selected: undefined });
  };
}
