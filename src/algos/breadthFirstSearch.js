import paramsExtractor from '../utils/paramsExtractor.js';

const breadthFirstSearch = () => {
  const [startNode, endNode, numRow, numCol, blockedNodes] = paramsExtractor();
  if (startNode === endNode) return [];

  const pathFindingRecord = [];
  pathFindingRecord.push([startNode, startNode]);

  const bfsQueue = [startNode];

  blockedNodes.add(startNode);

  let finish = false;
  while (bfsQueue.length > 0 && !finish) {
    const currentNode = bfsQueue.shift();

    const currentX = Math.floor(currentNode / numCol);
    const currentY = currentNode % numCol;

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
            bfsQueue.push(nextNode);
            blockedNodes.add(nextNode);
            if (nextNode === endNode) finish = true;
            pathFindingRecord.push([nextNode, currentNode]);
          }
        }
      }
    }
  }

  return pathFindingRecord;
};

export default breadthFirstSearch;
