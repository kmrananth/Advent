const fs = require("fs");
const day8Data = fs.readFileSync("day8Input.txt", "utf8").split("\n");
let acc = 0;
const codes = day8Data.map((val) => {
  let temp = val.split(" ");
  return { inst: temp[0], value: parseInt(temp[1]), executed: false };
});
let jmp = [];
let nop = [];
codes.forEach((val, i) => {
  if (val.inst === "jmp") jmp.push(i);
  if (val.inst === "nop") nop.push(i);
});

jmp.forEach((val) => {
  acc = 0;
  const codes1 = day8Data.map((val) => {
    let temp = val.split(" ");
    return { inst: temp[0], value: parseInt(temp[1]), executed: false };
  });
  codes1[val].inst = "nop";
  for (let i = 0; ; ) {
    if (i === codes1.length) {
      console.log(acc);
      break;
    }
    if (codes1[i].executed) break;
    if (codes1[i].inst === "acc") {
      codes1[i].executed = true;
      acc += codes1[i].value;
      i++;
    } else if (codes1[i].inst === "jmp") {
      codes1[i].executed = true;
      i += codes1[i].value;
    } else {
      codes1[i].executed = true;
      i++;
    }
  }
});
