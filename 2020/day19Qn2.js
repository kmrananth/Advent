const fs = require("fs");
day19Data = fs.readFileSync("day19Input.txt", "utf8").split("\n");
let patternMap = new Map();
let evalPatternMap = new Map();
let valdnData = [];
const replaceValue1 = function (replaceIn) {
  if (replaceIn.length < 2) {
    return replaceIn;
  } else {
    let temp1 = replaceIn.shift();
    let temp2 = replaceIn.shift();
    let temp3 = [];
    for (let i = 0; i < temp1.length; i++) {
      for (let j = 0; j < temp2.length; j++) {
        temp3.push(temp1[i].concat(temp2[j]));
      }
    }
    replaceIn.unshift(temp3);
    replaceValue1(replaceIn);
  }
  return replaceIn;
};
day19Data
  .filter((val) => val !== "")
  .forEach((val1) => {
    if (val1.includes(":")) {
      let temp = val1.split(": ");
      if (temp[1].includes('"'))
        evalPatternMap.set(temp[0], [temp[1].replaceAll('"', "")]);
      else patternMap.set(temp[0], temp[1]);
    } else valdnData.push(val1);
  });

while (Array.from(patternMap.keys()).length > 0) {
  patternMap.forEach((val, i) => {
    let temp2 = [];
    if (
      val
        .replaceAll(" | ", " ")
        .split(" ")
        .filter((val1, j, arr) => j === arr.indexOf(val1))
        .every((val2) => evalPatternMap.has(val2))
    ) {
      let temp1 = val.split(" | ");
      for (let k = 0; k < temp1.length; k++) {
        let temp3 = [];

        temp3 = replaceValue1(
          temp1[k].split(" ").map((val2) => evalPatternMap.get(val2))
        );
        temp2.push(temp3);
      }
      patternMap.delete(i);
      evalPatternMap.set(i, temp2.join().split(","));
    }
  });
}

const evalPatternMap42 = evalPatternMap.get("42");
const evalPatternMap31 = evalPatternMap.get("31");
const patternLength = evalPatternMap42[0].length;
const fltrdValdnData = valdnData
  .filter((val) => val.length >= 3 * patternLength)
  .filter((val1) => evalPatternMap42.some((val2) => val1.startsWith(val2)))
  .map((val3) => val3.substring(patternLength))
  .filter((val4) => evalPatternMap42.some((val5) => val4.startsWith(val5)))
  .map((val6) => val6.substring(patternLength))
  .filter((val7) => evalPatternMap31.some((val8) => val7.endsWith(val8)))
  .map((val9) => val9.substring(0, val9.length - patternLength));

const truncMatch = function (value, patternVal, patternLen) {
  if (!patternVal.some((val) => value["value"].startsWith(val))) return value;
  else {
    value.i = value.i + 1;
    value.value = value["value"].substring(patternLen);
    value = truncMatch(value, patternVal, patternLen);
  }
  return value;
};

const fltrdValdnData42 = fltrdValdnData.map((val) =>
  truncMatch({ value: val, i: 0 }, evalPatternMap42, patternLength)
);

const fltrdValdnData31 = fltrdValdnData42.map((val) => {
  const evalVal = truncMatch(
    { value: val.value, i: 0 },
    evalPatternMap31,
    patternLength
  );
  if (val.i >= evalVal.i && evalVal.value.length === 0) return "a";
  else return "b";
});

console.log(fltrdValdnData31.filter((val) => val === "a").length);
