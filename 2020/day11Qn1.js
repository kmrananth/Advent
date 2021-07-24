const fs = require("fs");
const day11Data = fs.readFileSync("day11Input.txt", "utf8").split("\n");
let matrix = day11Data.map((val) => val.split(""));
let flag = true;
let m = 0;
let firstLoop = [];
while (flag) {
  flag = false;
  firstLoop = [];
  matrix.forEach((val, i) => {
    firstLoop[i] = [];
    val.forEach((val1, j) => {
      if (val1 !== ".") {
        let occ = 0;
        for (let k = i - 1; k <= i + 1 && k < day11Data.length; k++) {
          for (let l = j - 1; l <= j + 1 && l < matrix[i].length; l++) {
            if (k > -1 && l > -1 && matrix[k][l] === "#") {
              if (!(k === i && j === l)) {
                occ++;
              }
            }
          }
        }
        if (occ > 3 && val1 === "#") {
          firstLoop[i][j] = "L";
          flag = true;
          // if ((m = 4)) console.log(occ);
        } else if (occ === 0 && val1 === "L") {
          firstLoop[i][j] = "#";
          flag = true;
          // if ((m = 4)) console.log(occ);
        } else firstLoop[i][j] = val1;
      } else firstLoop[i][j] = val1;
    });
  });
  matrix = [...[...firstLoop]];
  console.log(++m, flag);
}
// console.log(firstLoop);
console.log(
  firstLoop.flatMap((val) => val).filter((val) => val === "#").length
);
