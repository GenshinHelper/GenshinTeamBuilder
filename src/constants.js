import img_Albedo from "./char_img/UI_AvatarIcon_Albedo.png";
import img_Amber from "./char_img/UI_AvatarIcon_Amber.png";
import img_Barbara from "./char_img/UI_AvatarIcon_Barbara.png";
import img_Beidou from "./char_img/UI_AvatarIcon_Beidou.png";
import img_Bennett from "./char_img/UI_AvatarIcon_Bennett.png";
import img_Chongyun from "./char_img/UI_AvatarIcon_Chongyun.png";
import img_Diluc from "./char_img/UI_AvatarIcon_Diluc.png";
import img_Diona from "./char_img/UI_AvatarIcon_Diona.png";
import img_Fischl from "./char_img/UI_AvatarIcon_Fischl.png";
import img_Ganyu from "./char_img/UI_AvatarIcon_Ganyu.png";
import img_Hutao from "./char_img/UI_AvatarIcon_Hutao.png";
import img_Jean from "./char_img/UI_AvatarIcon_Jean.png";
import img_Kaeya from "./char_img/UI_AvatarIcon_Kaeya.png";
import img_Keqing from "./char_img/UI_AvatarIcon_Keqing.png";
import img_Klee from "./char_img/UI_AvatarIcon_Klee.png";
import img_Lisa from "./char_img/UI_AvatarIcon_Lisa.png";
import img_Mona from "./char_img/UI_AvatarIcon_Mona.png";
import img_Ningguang from "./char_img/UI_AvatarIcon_Ningguang.png";
import img_Noelle from "./char_img/UI_AvatarIcon_Noelle.png";
import img_Qiqi from "./char_img/UI_AvatarIcon_Qiqi.png";
import img_Razor from "./char_img/UI_AvatarIcon_Razor.png";
import img_Rosaria from "./char_img/UI_AvatarIcon_Rosaria.png";
import img_Sucrose from "./char_img/UI_AvatarIcon_Sucrose.png";
import img_Tartaglia from "./char_img/UI_AvatarIcon_Tartaglia.png";
import img_Traveler_Anemo from "./char_img/UI_AvatarIcon_Traveler_Anemo.png";
import img_Traveler_Geo from "./char_img/UI_AvatarIcon_Traveler_Geo.png";
import img_Venti from "./char_img/UI_AvatarIcon_Venti.png";
import img_Xiangling from "./char_img/UI_AvatarIcon_Xiangling.png";
import img_Xiao from "./char_img/UI_AvatarIcon_Xiao.png";
import img_Xingqiu from "./char_img/UI_AvatarIcon_Xingqiu.png";
import img_Xinyan from "./char_img/UI_AvatarIcon_Xinyan.png";
import img_Zhongli from "./char_img/UI_AvatarIcon_Zhongli.png";

export const Element = {
  Pyro: "Pyro",
  Hydro: "Hydro",
  Cryo: "Cryo",
  Electro: "Electro",
  Anemo: "Anemo",
  Geo: "Geo",
  Dendro: "Dendro",
};

export const TagMask = {
  Resonance_Pyro: 1 << 0,
  Resonance_Hydro: 1 << 1,
  Resonance_Cryo: 1 << 2,
  Resonance_Electro: 1 << 3,
  Resonance_Anemo: 1 << 4,
  Resonance_Geo: 1 << 5,
  Resonance_Dendro: 1 << 6,
  Reaction_Vaporize: 1 << 7,
  Reaction_Melt: 1 << 8,
  Reaction_Overload: 1 << 9,
  Reaction_Freeze: 1 << 10,
  Reaction_Electrocharged: 1 << 11,
  Reaction_Superconduct: 1 << 12,
  Reaction_Swirl: 1 << 13,
  Reaction_Crystallize: 1 << 14,
};

export const RoleMask = {
  None: 0,

  Carry: 1 << 0,
  Healer: 1 << 1,
};

export const Resonances = [
  {
    name: "Resonance_Pyro",
    element: Element.Pyro,
    mask: TagMask.Resonance_Pyro,
  },
  {
    name: "Resonance_Hydro",
    element: Element.Hydro,
    mask: TagMask.Resonance_Hydro,
  },
  {
    name: "Resonance_Cryo",
    element: Element.Cryo,
    mask: TagMask.Resonance_Cryo,
  },
  {
    name: "Resonance_Electro",
    element: Element.Electro,
    mask: TagMask.Resonance_Electro,
  },
  {
    name: "Resonance_Anemo",
    element: Element.Anemo,
    mask: TagMask.Resonance_Anemo,
  },
  {
    name: "Resonance_Geo",
    element: Element.Geo,
    mask: TagMask.Resonance_Geo,
  },
  {
    name: "Resonance_Dendro",
    element: Element.Dendro,
    mask: TagMask.Resonance_Dendro,
  },
];

export const Reactions = [
  {
    name: "Reaction_Vaporize",
    element1: Element.Pyro,
    element2: Element.Hydro,
    mask: TagMask.Reaction_Vaporize,
  },
  {
    name: "Reaction_Melt",
    element1: Element.Pyro,
    element2: Element.Cryo,
    mask: TagMask.Reaction_Melt,
  },
  {
    name: "Reaction_Overload",
    element1: Element.Pyro,
    element2: Element.Electro,
    mask: TagMask.Reaction_Overload,
  },
  {
    name: "Reaction_Freeze",
    element1: Element.Hydro,
    element2: Element.Cryo,
    mask: TagMask.Reaction_Freeze,
  },
  {
    name: "Reaction_Electrocharged",
    element1: Element.Hydro,
    element2: Element.Electro,
    mask: TagMask.Reaction_Electrocharged,
  },
  {
    name: "Reaction_Superconduct",
    element1: Element.Cryo,
    element2: Element.Electro,
    mask: TagMask.Reaction_Superconduct,
  },
  {
    name: "Reaction_Swirl",
    element1: Element.Anemo,
    element2: Element.Anemo,
    mask: TagMask.Reaction_Swirl,
  },
  {
    name: "Reaction_Crystallize",
    element1: Element.Geo,
    element2: Element.Geo,
    mask: TagMask.Reaction_Crystallize,
  },
];

export const Characters = {
  Amber: {
    name: "Amber",
    displayName: "Amber",
    img: img_Amber,
    id: 0,
    element: Element.Pyro,
    roles: RoleMask.None,
  },
  Bennett: {
    name: "Bennett",
    displayName: "Bennett",
    img: img_Bennett,
    id: 1,
    element: Element.Pyro,
    roles: RoleMask.Healer,
  },
  Diluc: {
    name: "Diluc",
    displayName: "Diluc",
    img: img_Diluc,
    id: 2,
    element: Element.Pyro,
    roles: RoleMask.Carry,
  },
  Hutao: {
    name: "Hutao",
    displayName: "Hu Tao",
    img: img_Hutao,
    id: 3,
    element: Element.Pyro,
    roles: RoleMask.Carry,
  },
  Klee: {
    name: "Klee",
    displayName: "Klee",
    img: img_Klee,
    id: 4,
    element: Element.Pyro,
    roles: RoleMask.Carry,
  },
  Xiangling: {
    name: "Xiangling",
    displayName: "Xiangling",
    img: img_Xiangling,
    id: 5,
    element: Element.Pyro,
    roles: RoleMask.None,
  },
  Xinyan: {
    name: "Xinyan",
    displayName: "Xinyan",
    img: img_Xinyan,
    id: 6,
    element: Element.Pyro,
    roles: RoleMask.None,
  },
  Barbara: {
    name: "Barbara",
    displayName: "Barbara",
    img: img_Barbara,
    id: 7,
    element: Element.Hydro,
    roles: RoleMask.Healer,
  },
  Mona: {
    name: "Mona",
    displayName: "Mona",
    img: img_Mona,
    id: 8,
    element: Element.Hydro,
    roles: RoleMask.None,
  },
  Tartaglia: {
    name: "Tartaglia",
    displayName: "Tartaglia",
    img: img_Tartaglia,
    id: 9,
    element: Element.Hydro,
    roles: RoleMask.Carry,
  },
  Xingqiu: {
    name: "Xingqiu",
    displayName: "Xingqiu",
    img: img_Xingqiu,
    id: 10,
    element: Element.Hydro,
    roles: RoleMask.None,
  },
  Chongyun: {
    name: "Chongyun",
    displayName: "Chongyun",
    img: img_Chongyun,
    id: 11,
    element: Element.Cryo,
    roles: RoleMask.None,
  },
  Diona: {
    name: "Diona",
    displayName: "Diona",
    img: img_Diona,
    id: 12,
    element: Element.Cryo,
    roles: RoleMask.Healer,
  },
  Ganyu: {
    name: "Ganyu",
    displayName: "Ganyu",
    img: img_Ganyu,
    id: 13,
    element: Element.Cryo,
    roles: RoleMask.Carry,
  },
  Kaeya: {
    name: "Kaeya",
    displayName: "Kaeya",
    img: img_Kaeya,
    id: 14,
    element: Element.Cryo,
    roles: RoleMask.None,
  },
  Qiqi: {
    name: "Qiqi",
    displayName: "Qiqi",
    img: img_Qiqi,
    id: 15,
    element: Element.Cryo,
    roles: RoleMask.Healer,
  },
  Rosaria: {
    name: "Rosaria",
    displayName: "Rosaria",
    img: img_Rosaria,
    id: 16,
    element: Element.Cryo,
    roles: RoleMask.None,
  },
  Beidou: {
    name: "Beidou",
    displayName: "Beidou",
    img: img_Beidou,
    id: 17,
    element: Element.Electro,
    roles: RoleMask.None,
  },
  Fischl: {
    name: "Fischl",
    displayName: "Fischl",
    img: img_Fischl,
    id: 18,
    element: Element.Electro,
    roles: RoleMask.None,
  },
  Keqing: {
    name: "Keqing",
    displayName: "Keqing",
    img: img_Keqing,
    id: 19,
    element: Element.Electro,
    roles: RoleMask.Carry,
  },
  Lisa: {
    name: "Lisa",
    displayName: "Lisa",
    img: img_Lisa,
    id: 20,
    element: Element.Electro,
    roles: RoleMask.None,
  },
  Razor: {
    name: "Razor",
    displayName: "Razor",
    img: img_Razor,
    id: 21,
    element: Element.Electro,
    roles: RoleMask.Carry,
  },
  Jean: {
    name: "Jean",
    displayName: "Jean",
    img: img_Jean,
    id: 22,
    element: Element.Anemo,
    roles: RoleMask.Healer,
  },
  Sucrose: {
    name: "Sucrose",
    displayName: "Sucrose",
    img: img_Sucrose,
    id: 23,
    element: Element.Anemo,
    roles: RoleMask.None,
  },
  Traveler_Anemo: {
    name: "Traveler_Anemo",
    displayName: "Traveler (Anemo)",
    img: img_Traveler_Anemo,
    id: 24,
    element: Element.Anemo,
    roles: RoleMask.None,
    isTraveler: true,
  },
  Venti: {
    name: "Venti",
    displayName: "Venti",
    img: img_Venti,
    id: 25,
    element: Element.Anemo,
    roles: RoleMask.None,
  },
  Xiao: {
    name: "Xiao",
    displayName: "Xiao",
    img: img_Xiao,
    id: 26,
    element: Element.Anemo,
    roles: RoleMask.Carry,
  },
  Albedo: {
    name: "Albedo",
    displayName: "Albedo",
    img: img_Albedo,
    id: 27,
    element: Element.Geo,
    roles: RoleMask.None,
  },
  Ningguang: {
    name: "Ningguang",
    displayName: "Ningguang",
    img: img_Ningguang,
    id: 28,
    element: Element.Geo,
    roles: RoleMask.Carry,
  },
  Noelle: {
    name: "Noelle",
    displayName: "Noelle",
    img: img_Noelle,
    id: 29,
    element: Element.Geo,
    roles: RoleMask.None,
  },
  Traveler_Geo: {
    name: "Traveler_Geo",
    displayName: "Traveler (Geo)",
    img: img_Traveler_Geo,
    id: 30,
    element: Element.Geo,
    roles: RoleMask.None,
    isTraveler: true,
  },
  Zhongli: {
    name: "Zhongli",
    displayName: "Zhong Li",
    img: img_Zhongli,
    id: 31,
    element: Element.Geo,
    roles: RoleMask.None,
  },
};

export const AllCharacters = [
  Characters.Amber,
  Characters.Bennett,
  Characters.Diluc,
  Characters.Hutao,
  Characters.Klee,
  Characters.Xiangling,
  Characters.Xinyan,
  Characters.Barbara,
  Characters.Mona,
  Characters.Tartaglia,
  Characters.Xingqiu,
  Characters.Chongyun,
  Characters.Diona,
  Characters.Ganyu,
  Characters.Kaeya,
  Characters.Qiqi,
  Characters.Rosaria,
  Characters.Beidou,
  Characters.Fischl,
  Characters.Keqing,
  Characters.Lisa,
  Characters.Razor,
  Characters.Jean,
  Characters.Sucrose,
  Characters.Traveler_Anemo,
  Characters.Venti,
  Characters.Xiao,
  Characters.Albedo,
  Characters.Ningguang,
  Characters.Noelle,
  Characters.Traveler_Geo,
  Characters.Zhongli,
];
