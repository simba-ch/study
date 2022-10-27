class Node {
  nearby = [];
  constructor(value) {
    this.value = value;
  }
}

var distance = [
  [0, 4, 7, Infinity, Infinity],
  [4, 0, 8, 6, Infinity],
  [7, 8, 0, 5, Infinity],
  [Infinity, 6, 5, 0, 7],
  [Infinity, Infinity, Infinity, 7, 0],
];

const a = new Node("A");
const b = new Node("B");
const c = new Node("C");
const d = new Node("D");
const e = new Node("E");

const pointSet = [a, b, c, d, e];

// 普里姆算法
function prim(distance, pointSet, startPoint) {
  const concatPoint = [startPoint];

  while (pointSet.length != concatPoint.length) {
    let fromPoint = null;
    let toPoint = null;
    let minDistance = null;
    for (let i = 0; i < concatPoint.length; i++) {
      const rowNum = pointSet.indexOf(concatPoint[i]);
      for (let j = 0; j < distance[rowNum].length; j++) {
        if (
          (minDistance == null || distance[rowNum][j] < minDistance) &&
          !concatPoint.includes(pointSet[j])
        ) {
          fromPoint = concatPoint[i];
          toPoint = pointSet[j];
          minDistance = distance[rowNum][j];
        }
      }
    }
    if (minDistance != null) {
      concatPoint.push(toPoint);
      fromPoint.nearby.push(toPoint);
      toPoint.nearby.push(fromPoint);
    }
  }
}

// 克鲁斯卡尔算法
function kruskal(pointSet, distance) {
  if (pointSet == null || distance == null) return;
  let parts = [];
  while (!(parts.length === 1 && parts[0].length === pointSet.length)) {
    let point1 = null;
    let point2 = null;
    let point1Index = null;
    let point2Index = null;
    let minDistance = null;
    for (let row = 0; row < distance.length; row++) {
      for (let col = 0; col < distance[row].length; col++) {
        if (
          col !== row &&
          (minDistance == null || distance[row][col] < minDistance) &&
          !parts.some(
            (part) =>
              part.includes(pointSet[row]) && part.includes(pointSet[col])
          )
        ) {
          point1 = pointSet[row];
          point2 = pointSet[col];
          minDistance = distance[row][col];
        }
      }
    }
    point1.nearby.push(point2);
    point2.nearby.push(point1);

    parts.some((part, index) => {
      if (part.includes(point1)) point1Index = index;
      else if (part.includes(point2)) point2Index = index;
      if (point1Index !== null && point2Index !== null) return;
    });

    if (point1Index == null && point2Index == null)
      parts.push([point1, point2]);
    else if (point1Index == null && point2Index != null)
      parts[point2Index].push(point1);
    else if (point1Index != null && point2Index == null)
      parts[point1Index].push(point2);
    else {
      parts[point1Index].push(...parts[point2Index]);
      parts.splice(point2Index, 1);
    }
    
  }
}

// prim(distance,pointSet,a);
kruskal(distance, pointSet);

console.log("a", a);
console.log("b", b);
console.log("c", c);
console.log("d", d);
console.log("e", e);
