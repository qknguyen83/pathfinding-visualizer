import stateToggle from './stateToggle.js';
import paramsExtractor from './paramsExtractor.js';

const visualizer = (pathFindingRecord, delay) => {
  if (pathFindingRecord.length < 2) return;

  const params = paramsExtractor();

  stateToggle();

  for (let i = 0; i < pathFindingRecord.length; i++) {
    setTimeout(() => {
      const node = document.getElementById(`node-${pathFindingRecord[i][0]}`);
      if (!node.className.includes('start') && !node.className.includes('end')) {
        node.className = node.className + ' visited';
      }
    }, delay * i);
  }

  const path = [];
  let currentNode = pathFindingRecord[pathFindingRecord.length - 1];
  while (currentNode[0] !== currentNode[1]) {
    path.push(currentNode[0]);
    currentNode = pathFindingRecord.find((record) => record[0] === currentNode[1]);
  }
  path.push(pathFindingRecord[0][0]);
  path.reverse();

  if (path.length > 2 && path[path.length - 1] === params[1]) {
    setTimeout(() => {
      for (let i = 1; i < path.length - 1; i++) {
        setTimeout(() => {
          const node = document.getElementById(`node-${path[i]}`);
          node.className = node.className + ' path';
          if (i === path.length - 2) stateToggle();
        }, delay * i);
      }
    }, delay * pathFindingRecord.length);
  } else {
    setTimeout(() => {
      stateToggle();
    }, delay * pathFindingRecord.length);
  }
};

export default visualizer;
