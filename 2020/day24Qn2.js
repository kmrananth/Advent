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

const countBlackTiles = function (key, hexMap, coordinates1) {
  let pos = key.split("&");
  let x = +pos[0];
  let y = +pos[1];
  let count = 0;
  for (let value of coordinates1.values()) {
    let ver = `${x + value.x}&${y + value.y}`;
    if (hexMap.has(ver)) count++;
  }
  return count;
};

for (let i = 0; i < 100; i++) {
  let hexMapTemp = new Map(hexMap);

  let cache = new Map(hexMap);
  hexMap.forEach((val, key) => {
    let blackCount = countBlackTiles(key, hexMap, coordinates1);
    if (blackCount === 0 || blackCount > 2) hexMapTemp.delete(key);
    let pos = key.split("&");
    let x = +pos[0];
    let y = +pos[1];

    for (let value of coordinates1.values()) {
      let count = 0;
      let ver = `${x + value.x}&${y + value.y}`;
      if (!cache.has(ver)) count = countBlackTiles(ver, hexMap, coordinates1);
      if (count === 2) hexMapTemp.set(ver, "black");
      cache.set(ver);
    }
  });

  hexMap = new Map(hexMapTemp);
}
console.log([...hexMap.values()].length);
