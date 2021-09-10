let day15Input = "0,3,6".split(",")
let day15Map = new Map()
day15Input.forEach((val, i) => {
  day15Map.set(val, [i + 1])
})
let itr = 2020
let lastNumber = day15Input[day15Input.length - 1]
for (let i = day15Input.length - 1; i < itr - 1; i++) {
  let lastOccur = day15Map.get(lastNumber)
  lastNumber =
    lastOccur.length === 1 ? "0" : (lastOccur[1] - lastOccur[0]).toString()
  let temp = day15Map.get(lastNumber)
  if (temp && temp.length === 1) temp.push(i + 2)
  else if (temp && temp.length === 2) {
    temp[0] = temp[1]
    temp[1] = i + 2
  } else temp = [i + 2]
  day15Map.set(lastNumber, temp)
}

console.log(lastNumber)
