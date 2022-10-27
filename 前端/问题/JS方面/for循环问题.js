class Node {
  nearby = [];
  constructor(value,){
     this.value = value;
  }
}

var distance = [
  [0, 4, 7, Infinity, Infinity],
  [4, 0, 8, 6, Infinity],
  [7, 8, 0, 5, Infinity],
  [Infinity, 6, 5, 0, 7],
  [Infinity, Infinity, Infinity, 7, 0]
];

const a = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');
const e = new Node('E');

const pointSet = [a,b,c,d,e]

function prim1(distance,pointSet) {
  let rowNum = null; 
  let colNum = null;
  let concatLine = [];
  let concatPoint = new Set;
  for (let index = 0; index < distance.length; index++) {
     let min = null;
     for (let row = 0; row <= index; row++) {
        const array = distance[row]
        for (let col = 0; col < array.length; col++) {
        if(row === col) continue;
        if(distance[row][col] < min || min == null){
           if( 
              concatLine.some(arr => {
                 return (arr[0] === row && arr[1] === col) || (arr[1] === row && arr[0] === col)
              })
           )continue;
           if(concatPoint.has(pointSet[row]) && concatPoint.has(pointSet[col])) continue;
           rowNum = row;
           colNum = col;
           min = distance[row][col]
        }
        }
     // if(min == null) return; //删除报错的原因？？？
     }
     pointSet[rowNum].nearby.push(pointSet[colNum]);
     pointSet[colNum].nearby.push(pointSet[rowNum]);
     concatPoint.add( pointSet[rowNum]);
     concatPoint.add( pointSet[colNum]);
     concatLine.push([rowNum,colNum],[colNum,rowNum]);
  }
}

prim1(distance,pointSet);
console.log("a",a);
console.log("b",b);
console.log("c",c);
console.log("d",d);
console.log("e",e);