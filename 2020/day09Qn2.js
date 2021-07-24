const fs = require("fs");
const day9Data = fs
  .readFileSync("day9Input.txt", "utf8")
  .split("\n")
  .map((val) => parseInt(val));
const preamble = 25;
let invalidNumber;
const valdnData = day9Data.filter((val, i) => i >= preamble);
valdnData.forEach((val, i) => {
  const tempData = day9Data.filter((valTemp, j) => j >= i && j < preamble + i);
  let flg = false;
  tempData.forEach((val2) => {
    if (tempData.includes(val - val2)) flg = true;
  });
  if (!flg) invalidNumber = val;
});
console.log(invalidNumber);

let sumSeq = [];
let sumSeq1 = [];
day9Data.forEach((val, i) => {
  sumSeq.push(val);
  let temp = 0;
  let temp1 = sumSeq.reduce((acc1, val1) => {
    acc1 += val1;
    return acc1;
  }, 0);
  if (temp1 === invalidNumber && sumSeq.length !== 1) {
    sumSeq1 = [...sumSeq];
  }
  if (temp1 > invalidNumber)
    while (temp1 > invalidNumber) temp1 -= sumSeq.shift();

  if (temp1 === invalidNumber && sumSeq.length !== 1) {
    sumSeq1 = [...sumSeq];
  }
});
sumSeq1.sort();
console.log(sumSeq1[0] + sumSeq1[sumSeq1.length - 1]);
