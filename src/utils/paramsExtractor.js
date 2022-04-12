const paramsExtractor = () => {
  const startNode = parseInt(document.getElementsByClassName('start')[0].id.replace('node-', ''));
  const endNode = parseInt(document.getElementsByClassName('end')[0].id.replace('node-', ''));

  const numRow = document.getElementsByClassName('row');
  const numCol = numRow[0].getElementsByClassName('node');

  const blockedNodes = Array.prototype.map.call(
    document.getElementsByClassName('blocked'),
    (node) => parseInt(node.id.replace('node-', ''))
  );

  return [startNode, endNode, numRow.length, numCol.length, new Set(blockedNodes)];
};

export default paramsExtractor;
