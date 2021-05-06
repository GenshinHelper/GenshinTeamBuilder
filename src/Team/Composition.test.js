import * as Constants from "../constants";
import { Composition } from "./Composition";

test("Pyro Resonance / Vaporize / Melt / Freeze", () => {
  const expectTags =
    Constants.TagMask.Resonance_Pyro |
    Constants.TagMask.Reaction_Vaporize |
    Constants.TagMask.Reaction_Melt |
    Constants.TagMask.Reaction_Freeze;

  const chars = [
    Constants.Characters.Diluc,
    Constants.Characters.Amber,
    Constants.Characters.Barbara,
    Constants.Characters.Rosaria,
  ];

  const comp = new Composition(chars);

  expect(comp.tagMask).toEqual(expectTags);
  expect(comp.tags.sort()).toEqual(
    chars
      .map((c) => c.name)
      .concat([
        Constants.TagMask.Resonance_Pyro.name,
        Constants.TagMask.Reaction_Vaporize.name,
        Constants.TagMask.Reaction_Melt.name,
        Constants.TagMask.Reaction_Freeze.name,
      ])
      .sort()
  );
});
