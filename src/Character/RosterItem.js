import React from "react";
import { Characters } from '../constants';
import { CharacterPortrait} from './CharacterPortrait';
import './RosterItem.css';

export class RosterItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true
        };
    }

    render() {
        var name = this.state.active ? "roster-item-active" : "roster-item-inactive";

        return (
            <div className={name} onClick={this.handleClick}>
                <CharacterPortrait char={this.props.char}/>
            </div>
        );
    }

    handleClick = () => {
        this.setState((state, props) => ({ active: !state.active }));
    }
}