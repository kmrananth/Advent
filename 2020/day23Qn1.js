const fs = require("fs");
const day23Data = "872495136".split("");
let inputVal = day23Data.map((val) => +val);
let currentPos = 0;
let destination;
let move = [];

const findDestination = function (val, input) {
  if (input.includes(val)) return input.indexOf(val);
  else return findDestination(val === 1 ? 9 : val - 1, input);
};

for (let i = 0; i < 100; i++) {
  move = inputVal.splice(currentPos + 1, 3);
  const currentVal = inputVal.shift();
  inputVal.push(currentVal);
  destination = findDestination(
    currentVal === 1 ? 9 : currentVal - 1,
    inputVal
  );
  inputVal.splice(destination + 1, 0, ...move);
}

let test = inputVal.splice(0, inputVal.indexOf(1));
inputVal.shift();
inputVal.splice(inputVal.length, 0, ...test);
console.log(inputVal.join(""));
