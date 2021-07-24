const fs = require("fs");
const day4Count = fs.readFileSync("day4Input.txt", "utf8").split("\n");
let passport = [];
let tempPassport = "";
let validPassportCount = 0;
day4Count.forEach((val) => {
  if (val.trim().length === 0) {
    passport.push(tempPassport.trimStart());
    tempPassport = "";
  } else {
    tempPassport = tempPassport + " " + val;
  }
});

passport.forEach((val) => {
  let temp = val.split(" ");
  let tempObj = {};
  let count = 0;
  let eyeColor = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  temp.forEach((tempVal) => {
    let keyPair = tempVal.split(":");
    let a = {};
    a[keyPair[0]] = keyPair[1];
    Object.assign(tempObj, a);
  });
  let keys = Object.keys(tempObj);
  if (keys.length === 8 || (keys.length === 7 && !keys.includes("cid"))) {
    let hgtType = tempObj["hgt"].slice(-2);
    let hgtVal =
      tempObj["hgt"].endsWith("in") || tempObj["hgt"].endsWith("cm")
        ? parseInt(tempObj["hgt"].slice(0, -2))
        : 0;
    let hairColorVal = new RegExp("^#[0-9,a-f]{6}$");
    let pidValdn = new RegExp("^[0-9]{9}$");
    if (parseInt(tempObj["byr"]) >= 1920 && tempObj["byr"] <= 2002) count++;
    if (parseInt(tempObj["iyr"]) >= 2010 && tempObj["iyr"] <= 2020) count++;
    if (parseInt(tempObj["eyr"]) >= 2020 && tempObj["eyr"] <= 2030) count++;
    if (eyeColor.findIndex((a) => a === tempObj["ecl"]) > -1) count++;
    if (
      (hgtType === "cm" && hgtVal > 149 && hgtVal < 194) ||
      (hgtType === "in" && hgtVal > 58 && hgtVal < 77)
    )
      count++;
    if (hairColorVal.test(tempObj["hcl"])) count++;
    if (pidValdn.test(tempObj["pid"])) count++;
    if (7 === count) validPassportCount++;
  }
  count = 0;
});
console.log(validPassportCount);
