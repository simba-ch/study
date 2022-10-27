class Node{
  constructor(value,...children){
    this.value = value;
    this.children = children;
  }
}

const e = new Node('E');
const f = new Node('F');
const i = new Node('I');
const h = new Node('H');
const g = new Node('G',i);
const b = new Node('B',e);
const c = new Node('C',f,g);
const d = new Node('D',h);
const a = new Node('A',b,c,d);
const w = new Node('W');

//深度优先
function  shen(node,target) {
    if(node == null) return false;
    if(node === target) return true;
    for(let i = 0; i < node.children.length; i++){
      if(shen(node.children[i],target)) return true;
    }
    return false;
}



// 深度优先
function guang(nodes,target) {
    if(nodes == null || nodes.length === 0) return false;
    let children = [];
    for (let i = 0; i < nodes.length; i++) {
      if(nodes[i] === target) return true;
      else{
      children = children.concat(nodes[i].children);
      }
    }
    return guang(children,target);
}


console.log(shen(a,f));
console.log(guang([a],h))
