const fs = require("fs");

const fileData = fs
  .readFileSync("day1Input.txt", "utf8")
  .split("\n")
  .map(Number);

fileData.forEach((val) => {
  fileData.forEach((val1) => {
    const val2 = 2020 - val - val1;
    if (fileData.includes(val2)) {
      console.log(val * val1 * val2);
    }
  });
});
