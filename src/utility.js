export function GenerateAllPermutations(characterList, groupSize) {
  var results = [];
  var current = new Array(groupSize);

  GenerateAllPermutationsRecursive(results, characterList, 0, current, 0, groupSize - 1, false);

  return results;
}

function GenerateAllPermutationsRecursive(results, characterList, listIndex, current, depth, maxDepth, hasTraveler) {
  // Add remaining chars
  for (; listIndex < characterList.length; ++listIndex) {
    var currChar = characterList[listIndex];
    var isTraveler = !!currChar.isTraveler;
    if (isTraveler && hasTraveler) {
      continue;
    }

    current[depth] = characterList[listIndex];

    if (depth === maxDepth) {
      results.push([...current]);
    } else {
      GenerateAllPermutationsRecursive(results, characterList, listIndex + 1, current, depth + 1, maxDepth, isTraveler);
    }
  }
}
