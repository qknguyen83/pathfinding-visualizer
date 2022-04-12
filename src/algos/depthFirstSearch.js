import paramsExtractor from '../utils/paramsExtractor.js';

const depthFirstSearch = () => {
  const [startNode, endNode, numRow, numCol, blockedNodes] = paramsExtractor();

  const pathFindingRecord = [];
  pathFindingRecord.push([startNode, startNode]);

  const dfsStack = [startNode];

  blockedNodes.add(startNode);

  while (dfsStack.length > 0) {
    const currentNode = dfsStack[dfsStack.length - 1];

    const currentX = Math.floor(currentNode / numCol);
    const currentY = currentNode % numCol;

    let nextNode;
    if (currentX + 1 < numRow && !blockedNodes.has((currentX + 1) * numCol + currentY)) {
      nextNode = (currentX + 1) * numCol + currentY;
    } else if (currentY + 1 < numCol && !blockedNodes.has(currentX * numCol + currentY + 1)) {
      nextNode = currentX * numCol + currentY + 1;
    } else if (currentX - 1 > -1 && !blockedNodes.has((currentX - 1) * numCol + currentY)) {
      nextNode = (currentX - 1) * numCol + currentY;
    } else if (currentY - 1 > -1 && !blockedNodes.has(currentX * numCol + currentY - 1)) {
      nextNode = currentX * numCol + currentY - 1;
    } else {
      dfsStack.pop();
      continue;
    }

    pathFindingRecord.push([nextNode, currentNode]);
    if (nextNode === endNode) break;
    blockedNodes.add(nextNode);
    dfsStack.push(nextNode);
  }

  return pathFindingRecord;
};

export default depthFirstSearch;
