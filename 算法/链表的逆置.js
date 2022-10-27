class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

const a = new Node("A", null);
const b = new Node("B", a);
const c = new Node("C", b);
const d = new Node("D", c);
const e = new Node("E", d);
const f = new Node("F", e);
const g = new Node("G", f);
const h = new Node("H", g);

function nizhi(head, prev = null) {
  if (head == null) return;

  if (head.next === null) {
    head.next = prev;
    return head;
  }
  const result = nizhi(head.next, head);
  head.next = prev;
  return result;
}

const root = nizhi(h);
console.log(root);
