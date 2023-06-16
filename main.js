const layout =
`1001 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 1100
0101 1001 1010 1010 1010 1010 1010 1010 1010 1010 1000 1010 1010 1010 1010 0100
0101 0101 1001 1010 1010 1010 1000 1010 1110 1011 0010 1000 1010 1010 1100 0101 
0101 0101 0101 1101 1001 1100 0011 1010 1100 1101 1001 0110 1001 1010 0110 0101
0101 0101 0101 0001 0110 0101 1001 1100 0011 0100 0101 1011 0010 1010 1100 0101
0101 0101 0101 0011 1100 0101 0101 0011 1100 0011 0110 1001 1010 1010 0110 0101
0101 0101 0011 1010 0110 0101 0101 1011 0010 1010 1100 0011 1010 1100 1101 0101
0101 0101 1001 1100 1011 0100 0101 1001 1000 1100 0011 1010 1010 0110 0101 0101
0101 0101 0101 0011 1100 0101 0101 0011 0110 0011 1000 1110 1001 1000 0100 0101
0101 0101 0101 1001 0110 0001 0110 1011 1000 1100 0011 1100 0101 0111 0101 0101
0101 0101 0101 0011 1010 0110 1001 1100 0101 0011 1100 0011 0000 1010 0101 0101
0101 0101 0011 1010 1010 1100 0101 0101 0011 1100 0011 1100 0011 1100 0101 0101
0101 0101 1001 1010 1010 0110 0101 0101 1011 0010 1100 0011 1100 0011 0100 0101
0001 0100 0101 1011 1010 1010 0100 0101 1011 1010 0010 1100 0011 1100 0101 0101
0101 0101 0011 1010 1010 1010 0110 0011 1010 1010 1010 0110 1011 0010 0110 0101
0111 0011 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 1010 0110`;

const moves = ['u', 'u', 'r', 'd', 'd'];

let map = makeMap();

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background('white');
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      drawBlock(j, i, map[i][j]);
    }
  }

  drawMoves();
}

function drawBlock(x, y, value) {
  let topWall = value[0];
  let rightWall = value[1];
  let bottomWall = value[2];
  let leftWall = value[3];
  x = x * 50;
  y = y * 50;

  noStroke();

  rectMode(CORNER);
  fill('black');
  square(x, y, 50);

  rectMode(CORNER);
  fill('white');
  square(x + 5, y + 5, 40);

  if (topWall === '0') { // clear top wall
    rect(x + 5, y, 40, 5);
  }

  if (rightWall === '0') { // clear right wall
    rect(x + 45, y + 5, 5, 40);
  }

  if (bottomWall === '0') { // clear bottom wall
    rect(x + 5, y + 45, 40, 5);
  }

  if (leftWall === '0') { // clear left wall
    rect(x, y + 5, 5, 40);
  }
}

function makeMap() {
  let map = layout.split('\n');
  for (let i = 0; i < map.length; i++) {
    map[i] = map[i].split(' ');
  }
  return map;
}

function drawMoves() {
  let position = [0, map.length - 1]; // bottom left corner
  
  for (let i = 0; i < moves.length; i++) {
    let direction = moves[i];
    drawMove(position[0], position[1], moves[i]);

    if (direction === 'u') {
      position[1]--;
    } else if (direction === 'r') {
      position[0]++;
    } else if (direction === 'd') {
      position[1]++;
    } else if (direction === 'l') {
      position[0]--;
    }
  }
}

function drawMove(x, y, direction) {
  if (direction === 'u') {
    drawTopMove(x, y);
  } else if (direction === 'r') {
    drawRightMove(x, y);
  } else if (direction === 'd') {
    drawBottomMove(x, y);
  } else if (direction === 'l') {
    drawLeftMove(x, y);
  }
}

function drawTopMove(x, y) {
  fill('red');
  x = x * 50;
  y = y * 50;
  triangle(x + 25, y + 10, x + 40, y + 40, x + 10, y + 40);
}

function drawRightMove(x, y) {
  fill('red');
  x = x * 50;
  y = y * 50;
  triangle(x + 40, y + 25, x + 10, y + 10, x + 10, y + 40);
}

function drawBottomMove(x, y) {
  fill('red');
  x = x * 50;
  y = y * 50;
  triangle(x + 25, y + 40, x + 40, y + 10, x + 10, y + 10);
}

function drawLeftMove(x, y) {
  fill('red');
  x = x * 50;
  y = y * 50;
  triangle(x + 10, y + 25, x + 40, y + 10, x + 40, y + 40);
}
