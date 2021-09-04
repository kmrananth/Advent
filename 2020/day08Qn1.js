const fs = require("fs");
const day8Data = fs.readFileSync("day8Input.txt", "utf8").split("\n");
let acc = 0;
const codes = day8Data.map((val) => {
  let temp = val.split(" ");
  return { inst: temp[0], value: parseInt(temp[1]), executed: false };
});
for (let i = 0; ; ) {
  if (codes[i].executed) break;
  if (codes[i].inst === "acc") {
    codes[i].executed = true;
    acc += codes[i].value;
    i++;
  } else if (codes[i].inst === "jmp") {
    codes[i].executed = true;
    i += codes[i].value;
  } else {
    codes[i].executed = true;
    i++;
  }
}
console.log(acc);
