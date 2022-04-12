import paramsExtractor from './paramsExtractor.js';

const getRandomNum = (avoidNums) => {
  let num = Math.floor(Math.random() * 4);
  while (avoidNums.includes(num)) {
    num = Math.floor(Math.random() * 4);
  }
  return num;
};

const mazeGenerator = () => {
  const params = paramsExtractor();
  const numRow = params[2];
  const numCol = params[3];

  const mazePath = new Set([numCol + 1]);
  const mazeStack = [numCol + 1];

  while (mazeStack.length > 0) {
    const currentNode = mazeStack[mazeStack.length - 1];

    const currentX = Math.floor(currentNode / numCol);
    const currentY = currentNode % numCol;

    mazePath.add(currentNode);

    const avoidNums = [];
    for (let i = 0; i < 4; i++) {
      const num = getRandomNum(avoidNums);
      avoidNums.push(num);

      let nextNode;
      if (num === 0 && currentY + 2 < numCol) {
        nextNode = currentX * numCol + currentY + 2;
      } else if (num === 1 && currentX + 2 < numRow) {
        nextNode = (currentX + 2) * numCol + currentY;
      } else if (num === 2 && currentY - 2 > -1) {
        nextNode = currentX * numCol + currentY - 2;
      } else if (num === 3 && currentX - 2 > -1) {
        nextNode = (currentX - 2) * numCol + currentY;
      }

      if (nextNode && !mazePath.has(nextNode)) {
        mazeStack.push(nextNode);
        mazePath.add((currentNode + nextNode) / 2);
        break;
      }

      if (i === 3) mazeStack.pop();
    }
  }

  for (let i = 0; i < numRow * numCol; i++) {
    if (!mazePath.has(i)) {
      const wall = document.getElementById(`node-${i}`);
      if (!wall.className.includes('start') && !wall.className.includes('end')) {
        setTimeout(() => {
          wall.className = wall.className + ' blocked';
        }, 1 * i);
      }
    }
  }
};

export default mazeGenerator;
