const fs = require("fs");
const day21Data = fs.readFileSync("day21Input.txt", "utf8").split("\n");

let ingredients = [];
let alerganMap = new Map();
const createData = function (input, mapVal, ingr) {
  const ing = input[1].split(" ");
  const alr = input[2].split(", ");
  ingr.push(...ing);
  console.log(ing, alr);
  alr.forEach((val) => {
    let exist = mapVal.get(val);
    let newVal = [];
    if (exist) {
      ing.forEach((val1) => {
        if (exist.includes(val1)) newVal.push(val1);
      });
    } else {
      newVal = ing.map((val2) => val2);
    }
    mapVal.set(val, newVal);
  });
};
day21Data.forEach((val) => {
  createData(/(.*) \(contains (.*)\)/.exec(val), alerganMap, ingredients);
});

const removeKey = function (key, val, alerganMap) {
  alerganMap.forEach((val1, key1) => {
    if ((key1 !== key) & val1.includes(val)) {
      val1.splice(val1.indexOf(val), 1);
      alerganMap.set(key1, val1);
      if (val1.length === 1) removeKey(key1, ...val1, alerganMap);
    }
  });
  return;
};

alerganMap.forEach((val, key) => {
  if (val.length === 1) removeKey(key, ...val, alerganMap);
});

console.log(
  ingredients.filter(
    (val1) => ![...alerganMap.values()].flatMap((val) => val).includes(val1)
  ).length
);
