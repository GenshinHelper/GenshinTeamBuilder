import React from "react";
import { Characters } from "../constants";
import { RosterItem } from "./RosterItem";

const RosterOrder = [
  Characters.Albedo,
  Characters.Diluc,
  Characters.Ganyu,
  Characters.Hutao,
  Characters.Jean,
  Characters.Keqing,
  Characters.Klee,
  Characters.Mona,
  Characters.Qiqi,
  Characters.Tartaglia,
  Characters.Traveler_Anemo,
  Characters.Traveler_Geo,
  Characters.Venti,
  Characters.Xiao,
  Characters.Zhongli,
  Characters.Amber,
  Characters.Barbara,
  Characters.Beidou,
  Characters.Bennett,
  Characters.Chongyun,
  Characters.Diona,
  Characters.Fischl,
  Characters.Kaeya,
  Characters.Lisa,
  Characters.Ningguang,
  Characters.Noelle,
  Characters.Razor,
  Characters.Rosaria,
  Characters.Sucrose,
  Characters.Xiangling,
  Characters.Xingqiu,
  Characters.Xinyan,
];

export class Roster extends React.Component {
  render() {
    return RosterOrder.map((c) => (
      <RosterItem
        key={c.name}
        char={c}
        onCharEnabledCallback={this.props.onCharEnabledCallback}
        isCharSelected={this.props.isCharSelected}
      />
    ));
  }
}
