const fs = require("fs")

const day6Data = fs.readFileSync("day6Input.txt", "utf8").split("\n")
let commonGroupData = []
let tmp = ""
day6Data.forEach((val, i) => {
  if (val.trim().length === 0) {
    if (tmp.trim().length !== 0) {
      commonGroupData.push(tmp.replaceAll(" ", ""))
    }
    tmp = ""
  } else {
    if (tmp.length === 0) {
      tmp = val
    } else {
      tmp1 = tmp.split("")
      tmp1.forEach((tmpVal) => {
        if (!val.includes(tmpVal)) {
          tmp = tmp.replaceAll(tmpVal, " ")
        }
      })
    }
  }
})
console.log(commonGroupData.reduce((acc, val) => acc + val.length, 0))
