class node {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}
const qian = ["A","B","D","H","I","E","J","K","C","F","L","M","G","N","O"];
const zhong = ["H","D","I","B","J","E","K","A","L","F","M","C","N","G","O"];
const hou = ["H","I","D","J","K","E","B","L","M","F","N","O","G","C","A"];

// 根据前序中序还原二叉树
// 前序：ABDECFG
// 中序：DBEAFCG
function qian2(qian, zhong) {
  if (qian == null || zhong == null || qian.length == 0 || zhong.length == 0 || qian.length != zhong.length) return;
  const root = new node(qian[0]);
  const index = zhong.indexOf(root.value);
  root.left = qian2(qian.slice(1, index + 1), zhong.slice(0, index));
  root.right = qian2(qian.slice(index + 1, qian.length),zhong.slice(index + 1, zhong.length));
  return root;
}

// console.log(qian2(qian, zhong));

// 根据中序后序还原二叉树
// 中序：DBEAFCG
// 后序：DEBFGCA
function hou2(hou, zhong) {
  if(hou == null || zhong == null || hou.length == 0 || zhong.length == 0 || hou.length !== zhong.length) return;
  const root = new node(hou[hou.length - 1]);
  const index = zhong.indexOf(root.value)
  root.left = hou2(hou.slice(0,index),zhong.slice(0,index));
  root.right = hou2(hou.slice(index,hou.length - 1),zhong.slice(index + 1,zhong.length));
  return root;
}
console.log(hou2(hou,zhong));