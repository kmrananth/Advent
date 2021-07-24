const fs = require("fs");
const day14Data = fs.readFileSync("day14Input.txt", "utf8").split("\n");
console.log(day14Data);
let mask = "";
let resultMap = new Map();
let finalVal = 0;
const maskValue = function (maskIn, valueIn) {
  return (temp = valueIn
    .split("")
    .map((val, i) => {
      return maskIn.charAt(i) === "0" ? val : maskIn.charAt(i);
    })
    .join(""));
};
const calcMemPos = function (memValue) {
  // console.log(memValue);
  if (memValue.every((val) => !val.includes("X"))) {
    return memValue;
  } else {
    let temp = memValue.shift();
    let temp1 = temp;
    let resultMap = new Map();
    let finalVal = 0;
    memValue.push(temp.replace("X", "0"));
    memValue.push(temp1.replace("X", "1"));
    calcMemPos(memValue);
  }
  return memValue.map((val) => parseInt(val, 2));
};
const inputObj = day14Data
  .map((val) => {
    let temp = val.split(" = ");
    if (temp[0] === "mask") {
      mask = temp[1];
    } else {
      let temp1 = parseInt(temp[0].replaceAll("mem[", "").replaceAll("]", ""))
        .toString(2)
        .padStart(36, "0");
      return {
        memPos: temp1,
        maskedMemPos: maskValue(mask, temp1),
        value: parseInt(temp[1]),
        mask: mask,
      };
    }
  })
  .filter((val) => val);
inputObj.forEach((val) => {
  val.newMemPos = calcMemPos([val.maskedMemPos]);
});
console.log(inputObj);
inputObj.forEach((val) => {
  val.newMemPos.forEach((val1) => resultMap.set(val1, val.value));
});
resultMap.forEach((val) => {
  finalVal += val;
});
console.log(finalVal);
