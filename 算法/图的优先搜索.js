class Node {
  nearby = [];
  constructor(value) {
    this.value = value;
  }
}

const a = new Node("A");
const b = new Node("B");
const c = new Node("C");
const d = new Node("D");
const e = new Node("E");
const w = new Node("W");
a.nearby.push(b, c);
b.nearby.push(a, c, d);
c.nearby.push(a, b, d);
d.nearby.push(b, c, e);
e.nearby.push(d);

// 深度优先
function shen(node, target, nowNodes = []) {
  if (node == null || nowNodes.includes(node)) return false;
  if (node === target) return true;
  nowNodes.push(node);
  let result = false;
  for (let i = 0; i < node.nearby.length; i++) {
    result |= shen(node.nearby[i], target, nowNodes);
  }
  return result ? true : false;
}

// 广度优先
function guang(nodes,target,nowNodes = []) {
    if(nodes == null || nodes.length === 0 ) return false;
    let nextNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      if(nodes[i] === target) return true;
      else if(!nowNodes.includes(nodes[i])) {
        nowNodes.push(nodes[i]);
        nextNodes = nextNodes.concat(nodes[i].nearby);
      }
    }
    return guang(nextNodes,target,nowNodes)
}

// console.log(shen(a,w));
console.log(guang([a],w));

