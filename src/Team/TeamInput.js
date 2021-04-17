import React from "react";
import { TeamInputCharacter } from './TeamInputCharacter';

import './TeamInput.css';

export class TeamInput extends React.Component {
    render() {
        return (
            <div className="team-input-box">
                <TeamInputCharacter/>
                <TeamInputCharacter/>
                <TeamInputCharacter/>
                <TeamInputCharacter/>
            </div>
        );
    }
}