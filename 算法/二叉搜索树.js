class Node {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}

const arr = [];
for (let i = 0; i < 1000; i++) {
  arr.push(Math.floor(Math.random()*10000))
}
// 构建二叉搜索树
function build(arr) {
  if(arr == null || arr.length === 0) return;
  const root = new Node(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    let node = new Node(arr[i]);
    addNode(root,node);
  }
  return root;
}

function addNode(root,node) {
  if(root.value === node.value || root == null || node == null) return;
  if(root.value > node.value) {
    if(root.left == null) root.left = node;
    else addNode(root.left,node);
  }else{
    if(root.right == null) root.right = node;
    else addNode(root.right,node);
  }
}

const root = build(arr);


// 利用二叉搜索树进行搜索
function search(root,target) {
    if(root == null || target == null) return false;
    if(root.value === target) return true;
    else{
      if(root.value < target) return search(root.right,target);
      else return search(root.left,target);
    }
}

console.log(search(root,100))