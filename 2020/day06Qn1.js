const fs = require("fs")
const day6Data = fs.readFileSync("day6Input.txt", "utf8").split("\n")
let groupData = []
let uniqueGroupData = []
let tempData = ""
let totalUnique
day6Data.forEach((val) => {
  if (val.trim().length === 0) {
    groupData.push(tempData.trimStart())
    tempData = ""
  } else {
    tempData += val
  }
})
groupData.push(tempData.trimStart())
groupData.forEach((val, i) => {
  let tst = val.split("")
  let tempGrpData = ""
  tst.forEach((val) => {
    if (!tempGrpData.includes(val)) tempGrpData += val
  })
  uniqueGroupData.push(tempGrpData)
})
totalUnique = uniqueGroupData.reduce((acc, val) => acc + val.length, 0)
console.log(totalUnique)
