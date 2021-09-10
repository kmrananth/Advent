const fs = require("fs")
const day4Count = fs.readFileSync("day4Input.txt", "utf8").split("\n")
let passport = []
let tempPassport = ""
let validPassport = 0
stringOccur = function (value) {
  return value.split("").filter((val) => val === ":").length
}
day4Count.forEach((val) => {
  if (val.trim().length === 0) {
    passport.push(tempPassport)
    tempPassport = ""
  } else {
    tempPassport = tempPassport + " " + val
  }
})
passport.push(tempPassport)
passport.forEach((val) => {
  if (
    stringOccur(val) === 8 ||
    (stringOccur(val) === 7 && !val.includes("cid"))
  ) {
    validPassport++
  }
})
console.log(validPassport)
