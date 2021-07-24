const fs = require("fs");
const day17Data = fs.readFileSync("day17Input.txt", "utf8").split("\n");
let activeMap = new Map();
const inputRow = day17Data.length;
const calcRow = inputRow - 1;
const neigh = [-1, 0, 1];
day17Data.forEach((val, i) => {
  val.split("").forEach((val1, j) => {
    if (val1 === "#") activeMap.set(`${j}&${calcRow - i}&0`, true);
  });
});

const checkActiveNeigh = function (neigh, currPos, actMap) {
  let tempMap = new Map(actMap);
  tempMap.delete(currPos);
  let count = 0;
  let pos = currPos.split("&");
  let currX = +pos[0];
  let currY = +pos[1];
  let currZ = +pos[2];
  neigh.forEach((x) => {
    neigh.forEach((y) => {
      neigh.forEach((z) => {
        let temp = `${currX + x}&${currY + y}&${currZ + z}`;
        if (tempMap.has(temp)) count++;
      });
    });
  });
  return count;
};

let i = 0;
while (i < 6) {
  let newActiveMap = new Map(activeMap);

  activeMap.forEach((val, key) => {
    let temp = checkActiveNeigh(neigh, key, activeMap);
    if (temp < 2 || temp > 3) newActiveMap.delete(key);
  });

  let checkedPos = new Map(activeMap);

  activeMap.forEach((val, key) => {
    let pos = key.split("&");
    let currX = +pos[0];
    let currY = +pos[1];
    let currZ = +pos[2];
    neigh.forEach((x) => {
      neigh.forEach((y) => {
        neigh.forEach((z) => {
          let temp = `${currX + x}&${currY + y}&${currZ + z}`;
          if (!checkedPos.has(temp)) {
            checkedPos.set(temp, true);
            if (checkActiveNeigh(neigh, temp, activeMap) === 3) {
              newActiveMap.set(temp, true);
            }
          }
        });
      });
    });
  });
  activeMap = new Map(newActiveMap);
  i++;
}
console.log(activeMap.size);
