const fs = require("fs");
const day3Data = fs.readFileSync("day3Input.txt", "utf8").split("\n");
const charCount = day3Data[0].length;
const rows = day3Data.length;
let col = 0;
let treeCount = 0;

for (let i = 1; i < rows; i++) {
  col = (col + 3) % charCount;
  if (day3Data[i].charAt(col) === "#") {
    treeCount++;
  }
}
console.log(treeCount);
