const fs = require("fs");
const day2Data = fs.readFileSync("day2Input.txt", "utf8").split("\n");
let count = 0,
  count1 = 0;
day2Data.forEach((val) => {
  const text = val.split(" ");
  const countVal = text[0].split("-");
  const start = parseInt(countVal[0]);
  const end = parseInt(countVal[1]);
  const matchOut = text[2].split("").filter((txt) => txt === text[1].charAt(0));
  if (matchOut.length >= start && matchOut.length <= end) {
    count++;
  }
  count1++;
});
console.log(count, count1);
