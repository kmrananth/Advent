const fs = require("fs")
day20Data = fs.readFileSync("day20Input.txt", "utf8")
tileData = day20Data.split("\n\n").map((val) => val.split("\n"))
let tileMap = new Map()
let orntMap = new Map()
orntMap.set(0, 2)
orntMap.set(1, 3)
orntMap.set(2, 0)
orntMap.set(3, 1)
tileData.forEach((val) => {
  const tile = /Tile ([\d]+):/.exec(val[0])[1]
  const side1 = val[1]
  const side3 = val[val.length - 1]
  let side2 = ""
  let side4 = ""
  const side2Pos = val[1].length - 1
  val.slice(1).forEach((val1) => {
    side2 += val1[side2Pos]
    side4 += val1[0]
  })
  const valObj = {
    link: new Map(),
    ornt: "",
    sides: [side1.trim(), side2.trim(), side3.trim(), side4.trim()],
  }
  tileMap.set(tile, valObj)
})

const findMatch = function (val, sides, i, itr, maxItr) {
  if (itr === maxItr - 1 || val === sides[i]) {
    return { match: val === sides[i], sides: sides }
  } else {
    itr++
    sides.push(sides.shift())
    if (itr === maxItr / 2) {
      sides = sides.map((val) => val.split("").reverse().join(""))
    }
    return findMatch(val, sides, i, itr, maxItr)
  }
}

tileMap.forEach((val, key) => {
  let tileMapTemp = new Map(tileMap)
  tileMapTemp.delete(key)
  for (let i = 0; i < 4; i++) {
    tileMapTemp.forEach((val1, key1) => {
      let temp1Sides = val1.sides.map((val2) => val2)
      let temp = findMatch(val.sides[i], temp1Sides, orntMap.get(i), 0, 8)
      if (temp.match) {
        val1.sides = temp.sides.map((val4) => val4)
      }
      if (val.sides[i] === val1.sides[orntMap.get(i)]) {
        val.link.set(key1, val.sides[i])
        val1.link.set(key, val.sides[i])
      }
    })
  }
})

const corners = [...tileMap]
  .filter((val) => [...val[1].link].length === 2)
  .map((val) => val[0])

console.log(corners.reduce((aggr, val) => aggr * val, 1))
