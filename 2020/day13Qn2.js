const fs = require("fs");
const day13Data = fs.readFileSync("day13Input1.txt", "utf8").split("\n");
const timeStart = parseInt(day13Data[0]);
const shuttle = day13Data[1].split(",").map((val) => parseInt(val));
const shuttle1 = shuttle.filter((val) => val);
let factor = 1;
let startPos = (Math.trunc(timeStart / shuttle1[0]) + 1) * shuttle1[0];
const shuttleObj = shuttle1.map((val) => {
  factor *= val;
  return {
    time: val,
    interval: shuttle.indexOf(val),
    factorVal: factor,
  };
});
shuttleObj.forEach((val, i) => {
  let temp = startPos;
  if (i > 0) {
    let factorValue = shuttleObj[i - 1].factorVal;
    while ((temp + val.interval) % val.time) {
      temp += factorValue;
    }
  }
  startPos = temp;
});
console.log(startPos);
