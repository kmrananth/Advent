let day15Input = "0,3,1,6,7,5".split(",");
let day15Map = new Map();
day15Input.forEach((val, i) => {
  day15Map.set(val, [i + 1]);
});
let lastNumber = "5";
for (let i = 5; i < 30000000 - 1; i++) {
  let lastOccur = day15Map.get(lastNumber);
  lastNumber =
    lastOccur.length === 1 ? "0" : (lastOccur[1] - lastOccur[0]).toString();
  let temp = day15Map.get(lastNumber);
  if (temp && temp.length === 1) temp.push(i + 2);
  else if (temp && temp.length === 2) {
    temp[0] = temp[1];
    temp[1] = i + 2;
  } else temp = [i + 2];
  day15Map.set(lastNumber, temp);
}

console.log(day15Map);
