import React from "react";
import { CharacterPortrait } from "./CharacterPortrait";
import "./RosterItem.css";

export class RosterItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
    };
  }

  render() {
    var name = this.state.active ? "roster-item-active" : "roster-item-inactive";

    return (
      <div className={name} draggable="true" onClick={this.handleClick} onDragStart={this.handleDrag}>
        <CharacterPortrait char={this.props.char} />
      </div>
    );
  }

  handleClick = () => {
    this.setState((state, props) => {
      var toValue = !state.active;

      // If disabling, check if has been selected in the team
      if (!toValue && this.props.isCharSelected(this.props.char)) {
        // Skip disabling
        return;
      }

      this.props.onCharEnabledCallback(this.props.char, toValue);
      return { active: toValue };
    });
  };

  handleDrag = (ev) => {
    if (!this.state.active) {
      ev.preventDefault();
      return;
    }

    ev.dataTransfer.setData("text", this.props.char.name);
  };
}
