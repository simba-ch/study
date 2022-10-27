class Node{
  left = null;
  right = null;
  constructor(value){
    this.value = value;
  }
}

const a1 = new Node('A');      const a2 = new Node('A');        const a3 = new Node('A');
const b1 = new Node('B');      const b2 = new Node('B');        const b3 = new Node('B');
const c1 = new Node('C');      const c2 = new Node('C');        const c3 = new Node('C');
const d1 = new Node('D');      const d2 = new Node('D');        const d3 = new Node('D');
const e1 = new Node('E');      const e2 = new Node('E');        const e3 = new Node('E');
const f1 = new Node('F');      const f2 = new Node('F');        const f3 = new Node('F');
const g1 = new Node('G');      const g2 = new Node('G');        const g3 = new Node('G');
const h1 = new Node('H');      const h2 = new Node('H');        const h3 = new Node('H');
const i1 = new Node('I');      const i2 = new Node('I');        const i3 = new Node('I');
const j1 = new Node('J');      const j2 = new Node('J');        const j3 = new Node('J');
const k1 = new Node('K');      const k2 = new Node('K');        const k3 = new Node('K');
const l1 = new Node('L');      const l2 = new Node('L');        const l3 = new Node('L');
const m1 = new Node('M');      const m2 = new Node('M');        const m3 = new Node('M');
const n1 = new Node('N');      const n2 = new Node('N');        const n3 = new Node('N');


const root1 = new Node("root");
const root2 = new Node('root');
const root3 = new Node('root');

root1.left = a1;                     root2.left = a2;             root3.left = b3;
root1.right = b1;                    root2.right = b2;            root3.right = a3;
a1.left = c1;                        a2.left = c2;                b3.left = f3;
a1.right = d1;                       a2.right = d2;               b3.right = e3;
b1.left = e1;                        b2.left = e2;                a3.left = d3;
b1.right = f1;                       b2.right = f2;               a3.right = c3;
c1.left = g1;                        c2.left = g2;                f3.left = n3;
c1.right = h1;                       c2.right = h2;               f3.right = m3;
d1.left = i1;                        d2.left = i2;                e3.left = l3;
d1.right = j1;                       d2.right = j2;               e3.right = k3;
e1.left = k1;                        e2.left = k2;                d3.left = j3;
e1.right = l1;                       e2.right = l2;               d3.right = i3;
f1.left = m1;                        f2.left = m2;                c3.left = h3;
f1.right = n1;                       f2.right = n2;               c3.right = g3;


// 二叉树的比较
function putongCompare(root1,root2) {
  if(root1 === root2 ) return true;
  if((root1 == null && root2 != null) || (root1 != null && root2 == null) ) return false;
  if(root1.value != root2.value) return false;
  return putongCompare(root1.left,root2.left) && putongCompare(root1.right,root2.right);
}

// console.log(putongCompare(root1,root2));


// 二叉树左右子树互换后的比较
function exchangeCompare(root1,root2) {
  if(root1 == null && root2 == null) return true;
  if(root1 == null && root2 != null || root1 != null && root2 == null) return false;
  if(root1.value !== root2.value) return false;
  return exchangeCompare(root1.left,root2.right) && exchangeCompare(root1.right,root2.left);

}

console.log(exchangeCompare(root1,root2))