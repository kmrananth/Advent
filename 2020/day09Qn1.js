const fs = require("fs")
const day9Data = fs
  .readFileSync("day9Input.txt", "utf8")
  .split("\n")
  .filter((val) => val)
  .map((val) => parseInt(val))
const preamble = 25
let invalidNumber
const valdnData = day9Data.filter((val, i) => i >= preamble)
valdnData.forEach((val, i) => {
  const tempData = day9Data.filter((valTemp, j) => j >= i && j < preamble + i)
  let flg = false
  tempData.forEach((val2) => {
    if (tempData.includes(val - val2)) flg = true
  })
  if (!flg) invalidNumber = val
})
console.log(invalidNumber)
