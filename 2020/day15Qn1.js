let day15Input = "0,3,6".split(",");
for (let i = 2; i < 2019; i++) {
  let lastNumber = day15Input[i];
  let lastOccur = day15Input.lastIndexOf(lastNumber, -2);

  let newValue = lastOccur === -1 ? "0" : (i - lastOccur).toString();
  day15Input.push(newValue);
}
console.log(day15Input[2019]);
