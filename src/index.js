import './index.css';
import setupGrid from './utils/setupGrid.js';
import aStar from './algos/aStar.js';
import dijkstra from './algos/dijkstra.js';
import depthFirstSearch from './algos/depthFirstSearch.js';
import breadthFirstSearch from './algos/breadthFirstSearch.js';
import visualizer from './utils/visualizer.js';
import mazeGenerator from './utils/mazeGenerator.js';

setupGrid();

const nodes = document.getElementsByClassName('node');
const algosButton = document.getElementById('algos');
const visualizeButton = document.getElementById('visualize');
const clearButton = document.getElementById('clear');
const generateMazeButton = document.getElementById('generateMaze');

let start = false;
let end = false;
let build = false;
Array.prototype.forEach.call(nodes, (node) => {
  node.onmousedown = () => {
    if (node.className.includes('start')) {
      start = true;
    } else if (node.className.includes('end')) {
      end = true;
    } else {
      node.className = node.className.includes('blocked')
        ? node.className.replace(' blocked', '')
        : node.className + ' blocked';
      build = true;
    }
  };

  node.onmouseup = () => {
    start = false;
    end = false;
    build = false;
  };

  node.onmouseenter = () => {
    if (start) {
      reset(['visited', 'path']);
      node.className = node.className + ' start';
      node.className = node.className.replace(' blocked', '');
    }
    if (end) {
      reset(['visited', 'path']);
      node.className = node.className + ' end';
      node.className = node.className.replace(' blocked', '');
    }
    if (build && !node.className.includes('start') && !node.className.includes('end')) {
      node.className = node.className.includes('blocked')
        ? node.className.replace(' blocked', '')
        : node.className + ' blocked';
    }
  };

  node.onmouseleave = () => {
    if (start) {
      node.className = node.className.replace(' start', '');
    }
    if (end) {
      node.className = node.className.replace(' end', '');
    }
  };
});

visualizeButton.onclick = () => {
  reset(['visited', 'path']);
  visualize(25);
};

clearButton.onclick = () => {
  reset(['blocked', 'visited', 'path']);
};

generateMazeButton.onclick = () => {
  reset(['blocked', 'visited', 'path']);
  mazeGenerator();
};

const visualize = (delay) => {
  const algo = algosButton[algosButton.selectedIndex].text;

  if (algo === 'A* algorithm') {
    visualizer(aStar(), delay);
  } else if (algo === 'Dijkstra algorithm') {
    visualizer(dijkstra(), delay);
  } else if (algo === 'Breadth first search') {
    visualizer(breadthFirstSearch(), delay);
  } else {
    visualizer(depthFirstSearch(), delay);
  }
};

const reset = (options) => {
  Array.prototype.forEach.call(nodes, (node) => {
    if (options.includes('blocked')) {
      node.className = node.className.replace(' blocked', '');
    }
    if (options.includes('visited')) {
      node.className = node.className.replace(' visited', '');
    }
    if (options.includes('path')) {
      node.className = node.className.replace(' path', '');
    }
  });
};
