import React from "react";
import { CharacterPortrait } from '../Character/CharacterPortrait';

export class TeamInputCharacter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: undefined
        }
    }

    render() {
        return (<CharacterPortrait char={this.state.selected}/>);
    }
}