const setupGrid = () => {
  const grid = document.getElementById('grid');

  const nodeEdgeLength =
    (window.innerHeight <= window.innerWidth ? window.innerHeight : window.innerWidth) * 0.035;

  const numRow = Math.floor((window.innerHeight * 0.75) / nodeEdgeLength);
  const numCol = Math.floor((window.innerWidth * 0.9) / nodeEdgeLength);

  for (let i = 0; i < numRow; i++) {
    const row = document.createElement('div');

    row.id = `row-${i}`;
    row.className = `row row-${i}`;

    for (let j = 0; j < numCol; j++) {
      const node = document.createElement('div');

      node.id = `node-${i * numCol + j}`;
      node.className = `node node-${i * numCol + j}`;

      node.style.width = `${nodeEdgeLength}px`;
      node.style.height = `${nodeEdgeLength}px`;

      row.appendChild(node);
    }

    grid.appendChild(row);
  }

  const startNode = document.getElementById(`node-${numCol + 1}`);
  const endNode = document.getElementById(`node-${numRow * numCol - numCol - 2}`);

  startNode.className = startNode.className + ' start';
  endNode.className = endNode.className + ' end';
};

export default setupGrid;
