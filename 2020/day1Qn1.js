const fs = require("fs");

const fileData = fs
  .readFileSync("day1Input.txt", "utf8")
  .split("\n")
  .map(Number);
fileData.forEach((val) => {
  const val1 = 2020 - val;
  if (fileData.includes(val1)) {
    console.log(val, val1, val * val1);
  }
});
