const stateToggle = () => {
  const body = document.getElementById('grid');
  const visualizeButton = document.getElementById('visualize');
  const clearButton = document.getElementById('clear');
  const generateMazeButton = document.getElementById('generateMaze');

  visualizeButton.disabled = !visualizeButton.disabled;
  visualizeButton.style.backgroundColor = visualizeButton.disabled ? '#0da471' : '#13eba2';
  visualizeButton.style.cursor = visualizeButton.disabled ? 'not-allowed' : 'pointer';

  clearButton.disabled = !clearButton.disabled;
  clearButton.style.backgroundColor = clearButton.disabled ? '#0da471' : '#13eba2';
  clearButton.style.cursor = clearButton.disabled ? 'not-allowed' : 'pointer';

  generateMazeButton.disabled = !generateMazeButton.disabled;
  generateMazeButton.style.backgroundColor = generateMazeButton.disabled ? '#0da471' : '#13eba2';
  generateMazeButton.style.cursor = generateMazeButton.disabled ? 'not-allowed' : 'pointer';

  body.className = visualizeButton.disabled ? 'grid-disabled' : '';
};

export default stateToggle;
