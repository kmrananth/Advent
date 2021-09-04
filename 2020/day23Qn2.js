const fs = require("fs");
const day23Data = "872495136".split("");
let inputVal = day23Data.map((val) => +val);
let currentPos = inputVal[0];
let firstPos;
let middlePos;
let lastPos;
let nextPos;
let destination;
let maxPos = 1000000;

const findDestination = function (val, maxPos, move) {
  if (!move.includes(val)) return val;
  else return findDestination(val === 1 ? maxPos : val - 1, maxPos, move);
};

let data = new Map();
inputVal.forEach((val, i, arr) => {
  data.set(val, i + 1 === arr.length ? 10 : arr[i + 1]);
});

for (let i = 10; i < maxPos; i++) data.set(i, i + 1);
data.set(maxPos, currentPos);

let j = 0;
while (j < 10000000) {
  firstPos = data.get(currentPos);
  middlePos = data.get(firstPos);
  lastPos = data.get(middlePos);
  nextPos = data.get(lastPos);
  data.set(currentPos, nextPos);

  destination = findDestination(
    currentPos === 1 ? maxPos : currentPos - 1,
    maxPos,
    [firstPos, middlePos, lastPos]
  );

  data.set(lastPos, data.get(destination));
  data.set(destination, firstPos);
  currentPos = nextPos;
  j++;
}

console.log(data.get(1) * data.get(data.get(1)));
