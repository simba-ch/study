class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const d = new Node("D");
const e = new Node("E");
const f = new Node("F");
const g = new Node("G");
const b = new Node("B", d, e);
const c = new Node("C", f, g);
const a = new Node("A", b, c);

// 深度优先
function shendu(node, target) {
  if (node == null) return false;
  if (node.value === target) return true;
  return shendu(node.left, target) || shendu(node.right, target);
}

// console.log(shendu(a, "t"));

// 广度优先
function guangdu(nodes, target) {
  if (nodes == null || nodes.length == 0) return false;
  const children = [];

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] == null) break;
    if (nodes[i].value == target) return true;
    else {
      children.push(nodes[i].left, nodes[i].right);
    }
  }
  return guangdu(children, target);
}

console.log(guangdu([a], "W"));
