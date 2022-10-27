// 平衡二叉树：
//  1、根节点的左子树与右子树的高度差不能超过1；
//   2、每一个子树都符合第一条；


class Node {
   constructor(value,left,right) {
     this.value = value;
     this.left = left;
     this.right =right;
   }
}


const h = new Node('H');
const i = new Node('I');
const f = new Node('F');
const g = new Node('G');
const d = new Node('D',undefined,h);
const e = new Node('E',undefined,i);
const b = new Node('D',d,e);
const c = new Node('C',f,g);
const a = new Node('A',b,c);


function getDeep(node) {
  if(node == null) return 0;
  const left = getDeep(node.left);
  const right = getDeep(node.right);
  return Math.max(left,right) + 1;
}

// 判断平衡二叉树
function isBalance(node) {
  if(node == null) return true;
  const left = getDeep(node.left);
  const right = getDeep(node.right);
  if(Math.abs(left - right) > 1) return false;
  return isBalance(node.left) && isBalance(node.right);

}


// <=================================
const zuoDan12 = new Node(12);
const zuoDan7 = new Node(7);
const zuoDan10 = new Node(10,zuoDan7,zuoDan12);
const zuoDan5 = new Node(5,undefined,zuoDan10);
// 二叉树的左单旋
function zuoDanXuan(node) {
  const root = node.right;
  const left = root.left;
  root.left = node;
  node.right = left;
  return root;
}


// <======================================
const youDan5 = new Node(5);
const youDan10 = new Node(10);
const youDan7 = new Node(7,youDan5,youDan10);
const youDan12 = new Node(12,youDan7);
// 二叉树的右单旋
function youDanXuan(node) {
  const root = node.left;
  const right = root.right;
  root.right = node;
  node.left = right;
  return root;
}

// console.log(isBalance(a));
// console.log(zuoDanXuan(zuoDan5));
console.log(youDanXuan(youDan12));
