const fs = require("fs");
const day2Data = fs.readFileSync("day2Input.txt", "utf8").split("\n");
let count = 0;
day2Data.forEach((val) => {
  const text = val.split(" ");
  const countVal = text[0].split("-");
  const start = parseInt(countVal[0]) - 1;
  const end = parseInt(countVal[1]) - 1;
  if (
    (text[2].charAt(start) === text[1].charAt(0) ||
      text[2].charAt(end) === text[1].charAt(0)) &&
    !(
      text[2].charAt(start) === text[1].charAt(0) &&
      text[2].charAt(end) === text[1].charAt(0)
    )
  ) {
    count++;
  }
});
console.log(count);
