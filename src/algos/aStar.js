import Heap from '../utils/Heap.js';
import paramsExtractor from '../utils/paramsExtractor.js';

const manhattanDistance = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
};

const aStar = () => {
  const [startNode, endNode, numRow, numCol, blockedNodes] = paramsExtractor();
  if (startNode === endNode) return [];

  const pathFindingRecord = [];

  const endX = Math.floor(endNode / numCol);
  const endY = endNode % numCol;

  const aStarHeap = new Heap((a, b) => a[1] < b[1]);
  aStarHeap.push([startNode, 0, 0, startNode]);

  let finish = false;
  while (aStarHeap.size() > 0 && !finish) {
    const currentNode = aStarHeap.top();
    aStarHeap.pop();

    if (!blockedNodes.has(currentNode[0])) {
      const currentX = Math.floor(currentNode[0] / numCol);
      const currentY = currentNode[0] % numCol;

      if (currentNode[0] === endNode) finish = true;

      for (let i = 1; i > -2 && !finish; i--) {
        for (let j = 1; j > -2 && !finish; j--) {
          if ((i === 0 || j === 0) && i + j !== 0) {
            const nextNode = (currentX + i) * numCol + currentY + j;
            if (
              -1 < currentX + i &&
              currentX + i < numRow &&
              -1 < currentY + j &&
              currentY + j < numCol &&
              !blockedNodes.has(nextNode)
            ) {
              const nextNodeG = currentNode[2] + 1;
              const nextNodeH = 1.1 * manhattanDistance([currentX + i, currentY + j], [endX, endY]);
              const nextNodeF = nextNodeG + nextNodeH;
              aStarHeap.push([nextNode, nextNodeF, nextNodeG, currentNode[0]]);
            }
          }
        }
      }

      blockedNodes.add(currentNode[0]);
      pathFindingRecord.push([currentNode[0], currentNode[3]]);
    }
  }

  return pathFindingRecord;
};

export default aStar;
