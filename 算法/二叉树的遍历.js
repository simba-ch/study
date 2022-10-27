class node {
  constructor(value, ...args) {
    this.value = value;
    this.children = args;
  }
  printChildren() {
    console.log(this.children);
  }
}

const d = new node("D");
const e = new node("E");
const f = new node("F");
const g = new node("G");
const b = new node("B", d, e);
const c = new node("C", f, g);
const a = new node("A", b, c);

// 前序遍历
function qianxu(node) {
  if (node == null) return;
  console.log(node.value);
  qianxu(node.children[0]);
  qianxu(node.children[1]);
}

// qianxu(a);

// 中序遍历
function zhongxu(node) {
  if (node == null) return;
  zhongxu(node.children[0]);
  console.log(node.value);
  zhongxu(node.children[1]);
}

// zhongxu(a);

// 后序遍历
function houxu(node) {
  if (node == null) return;
  houxu(node.children[0]);
  houxu(node.children[1]);
  console.log(node.value);
}

houxu(a);
