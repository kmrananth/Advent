const fs = require("fs");
const day7Data = fs.readFileSync("day7Input.txt", "utf8").split("\n");
let bags = [];
let bagMap = new Map();
let tgtBagMap = new Map();
addBag = function (bagVal) {
  if (!bags.includes(bagVal)) {
    bags.push(bagVal);
  }
};
day7Data.forEach((val) => {
  const src = val.split(" contain ");
  const srcBag = src[0].substring(0, src[0].indexOf(" bag"));
  let tgt = src[1].split(",");
  if (src[1].includes("no other bags")) tgt = [];
  let temp = tgt.map((val2) => {
    const temp1 = val2.substring(0, val2.indexOf(" bag")).trim();
    const temp2 = parseInt(temp1.substring(0, temp1.indexOf(" ")));
    const temp3 = temp1.substring(temp1.indexOf(" ") + 1);
    return { bag: temp3, bagCount: temp2 };
  });
  addBag(srcBag);
  bagMap.set(srcBag, temp);
  temp.forEach((val4) => {
    let sourceBag = tgtBagMap.get(val4.bag);
    if (!sourceBag) {
      tgtBagMap.set(val4.bag, [srcBag]);
    } else {
      sourceBag.push(srcBag);
      tgtBagMap.set(val4.bag, sourceBag);
    }
  });
});

checkBag = function (bagColor, tst, tst1) {
  const testColor = bagMap.get(bagColor);
  if (testColor.length === 0) {
    return bagColor;
  } else {
    testColor.forEach((val5) => tst.push(tst1 * val5.bagCount));
    testColor.forEach((val) => checkBag(val.bag, tst, tst1 * val.bagCount));
  }
};

let test = [];
const test1 = 1;
checkBag("shiny gold", test, test1);

console.log(test.reduce((acc, val7) => acc + val7, 0));
