const fs = require("fs");
const LEFT = { x: 0, y: -1 };
const RIGHT = { x: 0, y: 1 };
const UP = { x: -1, y: 0 };
const DOWN = { x: 1, y: 0 };
const UP_LEFT = { x: -1, y: -1 };
const UP_RIGHT = { x: -1, y: 1 };
const DOWN_RIGHT = { x: 1, y: 1 };
const DOWN_LEFT = { x: 1, y: -1 };
const ALL_MOVES = [
  LEFT,
  RIGHT,
  UP,
  DOWN,
  UP_LEFT,
  UP_RIGHT,
  DOWN_RIGHT,
  DOWN_LEFT,
];

const inputData = fs.readFileSync("day_11_input.txt", "utf8").split("\n");
let matrix = inputData.map((line) => [...line]);
const rowCount = inputData.length;
const colCount = matrix[0].length;

traverse = (matrix, current, direction, step = 1) => {
  const moveX = current.x + direction.x * step;
  const moveY = current.y + direction.y * step;
  if (moveX < 0 || moveX > rowCount - 1 || moveY < 0 || moveY > colCount - 1)
    return "*";
  return matrix[moveX][moveY];
};

multiTraverse = (matrix, current, direction, step = 1) => {
  let val = traverse(matrix, current, direction, step);
  if (val !== ".") return val;
  else return multiTraverse(matrix, current, direction, ++step);
};

isOccupied = (seat) => seat === "#";

findAdjacentOccupiedSeats = (matrix, current, fn) => {
  return ALL_MOVES.map((move) => fn(matrix, current, move)).filter(isOccupied);
};

let hasChanges = true;
while (hasChanges) {
  hasChanges = false;
  let newMatrix = [];
  matrix.forEach((row, i) => {
    newMatrix.push([]);
    row.forEach((col, j) => {
      let current = { x: i, y: j };
      occupiedSeats = findAdjacentOccupiedSeats(matrix, current, multiTraverse);
      if (col === "L" && occupiedSeats.length === 0) {
        newMatrix[i][j] = "#";
        hasChanges = true;
      } else if (col === "#" && occupiedSeats.length > 4) {
        newMatrix[i][j] = "L";
        hasChanges = true;
      } else {
        newMatrix[i][j] = col;
      }
    });
  });
  matrix = [...[...newMatrix]];
}
console.log(
  "Total Occupied Seats: " + matrix.flatMap((x) => x).filter(isOccupied).length
);
