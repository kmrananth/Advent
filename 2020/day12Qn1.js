const fs = require("fs");
const day12Data = fs.readFileSync("day12Input.txt", "utf8").split("\n");
let x = 0,
  y = 0;
let angle = new Map();
angle.set("E", 0);
angle.set("N", 90);
angle.set("W", 180);
angle.set("S", 270);
const changeDirection = function (currentDirection, degree) {
  const newAngle = (angle.get(currentDirection) + degree) % 360;
  return Array.from(angle).filter((val) => val[1] === newAngle)[0][0];
};
let currentDirection = "E";
day12Data.forEach((val) => {
  let direction = val.substring(0, 1);
  let value = parseInt(val.substring(1));
  if (direction === "F") direction = currentDirection;
  switch (direction) {
    case "E":
      x += value;
      break;
    case "N":
      y += value;
      break;
    case "W":
      x -= value;
      break;
    case "S":
      y -= value;
      break;
    case "L":
      currentDirection = changeDirection(currentDirection, value);
      break;
    case "R":
      currentDirection = changeDirection(currentDirection, 360 - value);
      break;
  }
});
console.log(Math.abs(x) + Math.abs(y));
