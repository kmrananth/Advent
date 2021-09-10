const fs = require("fs")
day10Data = fs
  .readFileSync("day10Input.txt", "utf8")
  .split("\n")
  .filter((val) => val)
  .map((val) => parseInt(val))
const sortData = [0, ...day10Data]
sortData.sort((a, b) => a - b)
sortData.push(sortData[sortData.length - 1] + 3)
let diff1 = 0,
  diff2 = 0,
  diff3 = 0,
  temp = 0
sortData.forEach((val) => {
  const diff = val - temp
  if (diff === 3) diff3++
  if (diff === 2) diff2++
  if (diff === 1) diff1++
  temp = val
})
console.log(diff1 * diff3)
