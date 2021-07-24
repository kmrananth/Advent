const fs = require("fs");
day10Data = fs
  .readFileSync("day10Input.txt", "utf8")
  .split("\n")
  .map((val) => parseInt(val));
const sortData = [0, ...day10Data];
sortData.sort((a, b) => a - b);
sortData.push(sortData[sortData.length - 1] + 3);
let diff1 = 0,
  diff2 = 0,
  diff3 = 0,
  temp = 0;
sortData.forEach((val) => {
  const diff = val - temp;
  if (diff === 3) diff3++;
  if (diff === 2) diff2++;
  if (diff === 1) diff1++;
  temp = val;
});
diff3++;
console.log(sortData);
console.log(diff1, diff2, diff3, diff1 * diff3);

let perm = [];
for (let i = 0; i < sortData.length; i++) {
  if (
    sortData[i] - sortData[i - 1] === 1 &&
    sortData[i + 1] - sortData[i] === 1
  ) {
    perm.push(sortData[i]);
  }
}
console.log(perm);

let perm1 = [];
for (let i = 0; i < perm.length; i++) {
  if (perm[i] - perm[i - 1] === 1 && perm[i + 1] - perm[i] === 1) {
    perm1.push(perm[i]);
  }
}

console.log(perm1);
console.log(
  perm.length,
  perm1.length,
  Math.pow(2, perm.length - 3 * perm1.length) * Math.pow(7, perm1.length)
);
