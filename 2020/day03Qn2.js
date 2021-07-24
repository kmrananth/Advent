const fs = require("fs");
const day3Data = fs.readFileSync("day3Input.txt", "utf8").split("\n");
const charCount = day3Data[0].length;
const rows = day3Data.length;
let col1 = 0,
  col2 = 0,
  col3 = 0,
  col4 = 0,
  col5 = 0;
let treeCount1 = 0,
  treeCount2 = 0,
  treeCount3 = 0,
  treeCount4 = 0,
  treeCount5 = 0;
for (let i = 1; i < rows; i++) {
  col1 = (col1 + 1) % charCount;
  if (day3Data[i].charAt(col1) === "#") {
    treeCount1++;
  }
  col2 = (col2 + 3) % charCount;
  if (day3Data[i].charAt(col2) === "#") {
    treeCount2++;
  }
  col3 = (col3 + 5) % charCount;
  if (day3Data[i].charAt(col3) === "#") {
    treeCount3++;
  }
  col4 = (col4 + 7) % charCount;
  if (day3Data[i].charAt(col4) === "#") {
    treeCount4++;
  }
  if (i % 2 === 0) {
    col5 = (col5 + 1) % charCount;
    if (day3Data[i].charAt(col5) === "#") {
      treeCount5++;
    }
  }
}
console.log(
  treeCount1,
  treeCount2,
  treeCount3,
  treeCount4,
  treeCount5,
  treeCount1 * treeCount2 * treeCount3 * treeCount4 * treeCount5
);
