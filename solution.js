const directions = {
  u: [-1, 0],
  r: [0, 1],
  d: [1, 0],
  l: [0, -1],
};

const formatData = (data) => {
  const parsedData = data.split('\n').map(path => path.split(' '));
  const rows = parsedData.length;
  const cols = parsedData[0].length;

  // find all possible moves of each node
  return parsedData.map((item, r) => {
    return item.map((pos, c) => {
      const possibleMoves = {
        ...((r - 1 >= 0 && parsedData[r - 1][c]) && (!+pos[0] && !+parsedData[r - 1][c][2]) && { 'u': true }),
        ...((c + 1 < cols && parsedData[r][c + 1]) && (!+pos[1] && !+parsedData[r][c + 1][3]) && { 'r': true }),
        ...((r + 1 < rows && parsedData[r + 1][c]) && (!+pos[2] && !+parsedData[r + 1][c][0]) && { 'd': true }),
        ...((c - 1 >= 0 && parsedData[r][c - 1]) && (!+pos[4] && !+parsedData[r][c - 1][1]) && { 'l': true }),
      }

      return possibleMoves;
    });
  });
}


function findPath(matrix, start, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const visited = new Array(rows).fill(false).map(() => new Array(cols).fill(false));

  const queue = [];
  queue.push([{
    move: 'S',
    axis: start
  }]);
  visited[start[0]][start[1]] = 1;

  while (queue.length > 0) {
    const path = queue.shift();
    const [row, col] = path[path.length - 1].axis;

    // target found
    if (row === target[0] && col === target[1]) {
      return path;
    }

    const possibleMoves = matrix[row][col];

    for (const move in possibleMoves) {
      const curR = row + directions[move][0];
      const curC = col + directions[move][1];

      if (!visited[curR][curC]) {
        visited[curR][curC] = true;
        queue.push([...path, {
          move,
          axis: [curR, curC]
        }]);
      }
    }
  }

  return [];
}

const execute = (data) => {
  const start = [15, 0];
  const target = [7, 8];
  const matrix = formatData(data);
  const path = findPath(matrix, start, target);
  const moves = path.map(p => p.move).slice(0);
  return moves;
}

export default execute;
