const fs = require("fs");
const day24Data = fs.readFileSync("day24Input.txt", "utf8").split("\n");
const hexPath = day24Data.map((val) =>
  val
    .replaceAll("ne", "a")
    .replaceAll("se", "c")
    .replaceAll("sw", "d")
    .replaceAll("nw", "f")
    .replaceAll("e", "b")
    .replaceAll("w", "e")
);
let hexMap = new Map();
const coordinates1 = new Map();
coordinates1.set("a", { x: 1, y: 0 });
coordinates1.set("b", { x: 0, y: 1 });
coordinates1.set("c", { x: -1, y: 1 });
coordinates1.set("d", { x: -1, y: 0 });
coordinates1.set("e", { x: 0, y: -1 });
coordinates1.set("f", { x: 1, y: -1 });

hexPath.forEach((val) => {
  let pos = {
    x: 0,
    y: 0,
    updatePos: function (posUpd) {
      this.x += posUpd.x;
      this.y += posUpd.y;
    },
  };
  val.split("").forEach((val1) => pos.updatePos(coordinates1.get(val1)));
  let posVal = `${pos.x}&${pos.y}`;
  let newVal = hexMap.get(posVal) || "white";
  hexMap.set(posVal, newVal === "white" ? "black" : "white");
});

hexMap = new Map(Array.from(hexMap).filter((val) => val[1] === "black"));
console.log(Array.from(hexMap).length);
