const fs = require("fs");
const day5Data = fs.readFileSync("day5Input.txt", "utf8").split("\n");
const seatID = [];
getSeatID = function (seatPattern) {
  const row = parseInt(
    seatPattern.substring(0, 7).replaceAll("F", "0").replaceAll("B", "1"),
    2
  );
  const col = parseInt(
    seatPattern.substring(7).replaceAll("L", "0").replaceAll("R", "1"),
    2
  );
  return row * 8 + col;
};
day5Data.forEach((val, i) => {
  seatID[i] = getSeatID(val);
});

console.log(
  seatID
    .sort((a, b) => a - b)
    .reduce((a, b) => {
      return a + 1 !== b ? a : b;
    }) + 1
);
