import Heap from '../utils/Heap.js';
import paramsExtractor from '../utils/paramsExtractor.js';

const dijkstra = () => {
  const [startNode, endNode, numRow, numCol, blockedNodes] = paramsExtractor();
  if (startNode === endNode) return [];

  const pathFindingRecord = [];

  const dijkstraHeap = new Heap((a, b) => a[1] < b[1]);
  dijkstraHeap.push([startNode, 0, startNode]);

  let finish = false;
  while (dijkstraHeap.size() > 0 && !finish) {
    const currentNode = dijkstraHeap.top();
    dijkstraHeap.pop();

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
              dijkstraHeap.push([nextNode, currentNode[1] + 1, currentNode[0]]);
            }
          }
        }
      }

      blockedNodes.add(currentNode[0]);
      pathFindingRecord.push([currentNode[0], currentNode[2]]);
    }
  }

  return pathFindingRecord;
};

export default dijkstra;
