const visualizer = (pathFindingRecord, delay) => {
  const body = document.getElementById('grid');
  body.className = 'grid-disabled';

  for (let i = 1; i < pathFindingRecord.length - 1; i++) {
    setTimeout(() => {
      const node = document.getElementById(`node-${pathFindingRecord[i][0]}`);
      node.className = node.className + ' visited';
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

  setTimeout(() => {
    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        const node = document.getElementById(`node-${path[i]}`);
        node.className = node.className + ' path';
        if (i === path.length - 2) body.className = '';
      }, delay * i);
    }
  }, delay * pathFindingRecord.length);
};

export default visualizer;
