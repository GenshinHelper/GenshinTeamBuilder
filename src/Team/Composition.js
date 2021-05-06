import * as Constants from "../constants";

export class Composition {
  constructor(characters) {
    this.characters = characters;

    // Count elements
    this.elementCount = {};

    for (const char of characters) {
      if (!this.elementCount[char.element]) {
        this.elementCount[char.element] = 0;
      }

      ++this.elementCount[char.element];
    }

    // Check tags
    this.tagMask = 0;
    this.tags = this.characters.map((c) => c.name);

    // Add resonance tags
    for (const resonance of Constants.Resonances) {
      const count = this.elementCount[resonance.element];
      if (!!count && count >= 2) {
        this.tagMask |= resonance.mask;
        this.tags.push(resonance.name);
      }
    }

    // Add reaction tags
    for (const reaction of Constants.Reactions) {
      const count1 = this.elementCount[reaction.element1];
      const count2 = this.elementCount[reaction.element2];
      if (!!count1 && !!count2 && count1 >= 1 && count2 >= 1) {
        this.tagMask |= reaction.mask;
        this.tags.push(reaction.name);
      }
    }
  }
}
