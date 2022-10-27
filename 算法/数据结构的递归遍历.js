// 数组的递归遍历
const arr = [];
for(let i =0 ; i < 10; i++){
  arr.push(i)
}

function  arrBian(arr,i) {
    if(arr == null || arr.length <= i) return
    console.log(arr[i])
    arrBian(arr,i+1)
}

// arrBian(arr,0)


// 链表的遍历
class Node {
  constructor(value,next){
    this.value = value;
    this.next = next;
  }
}

const a = new Node("A",null)
const b = new Node("B",a)
const c = new Node("C",b)
const d = new Node("D",c)
const e = new Node("E",d)
const f = new Node("F",e)
const g = new Node("G",f)
const h = new Node("H",g)


function bianLian(lian) {
  if(lian === null) return
  console.log(lian.value)
  bianLian(lian.next)
}

bianLian(h)