const fs = require("fs");
const day13Data = fs.readFileSync("day13Input.txt", "utf8").split("\n");
const timeStart = day13Data[0];
const shuttle = day13Data[1]
  .split(",")
  .filter((val) => val !== "x")
  .map((val) => parseInt(val));
const shuttleStart = shuttle.map((val) => {
  return (Math.trunc(timeStart / val) + 1) * val;
});
const latest = shuttleStart.reduce((acc, val) => {
  return acc > val ? val : acc;
}, shuttleStart[0]);
console.log(
  shuttle,
  shuttleStart,
  latest,
  shuttle[shuttleStart.indexOf(latest)] * (latest - timeStart)
);
