const fs = require("fs");
const day14Data = fs.readFileSync("day14Input.txt", "utf8").split("\n");
console.log(day14Data);
let mask = "";
let resultMap = new Map();
const maskValue = function (maskIn, valueIn) {
  return (temp = valueIn
    .split("")
    .map((val, i) => {
      return maskIn.charAt(i) === "X" ? val : maskIn.charAt(i);
    })
    .join(""));
};
const inputObj = day14Data
  .map((val) => {
    let temp = val.split(" = ");
    if (temp[0] === "mask") {
      mask = temp[1];
    } else {
      return {
        memPos: temp[0].replaceAll("mem[", "").replaceAll("]", ""),
        value: parseInt(temp[1]).toString(2).padStart(36, "0"),
        mask: mask,
      };
    }
  })
  .filter((val) => val);
console.log(inputObj);
inputObj.forEach((val) => {
  resultMap.set(val.memPos, maskValue(val.mask, val.value));
});

let finalVal = 0;
resultMap.forEach((val) => {
  finalVal += parseInt(val, 2);
});
console.log(finalVal);
