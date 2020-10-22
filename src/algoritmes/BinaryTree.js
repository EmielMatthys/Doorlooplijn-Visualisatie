const BLACK = 0;
const RED = 1;

class Node {
  constructor(key, value, col) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = col;
    this.isRed = this.isRed.bind(this);
  }

  free() {
    this.left = null;
    this.right = null;
  }

  isRed() {
    return this.color === RED;
  }
}

function isRed(node) {
  return node !== null && node.isRed();
}

export class RedBlackBST {
  constructor() {
    this.root = null;
    this.size = 0;
    this.free = this.free.bind(this);
  }

  free() {
    this.size = 0;
    this.root = null;
  }

  insert(key, value) {
    this.root = this.put(this.root, key, value);
    this.root.color = BLACK;
    this.size++;
  }

  put(h, key, val) {
    if (h == null) return new Node(key, val, RED);

    if (key < h.key) h.left = this.put(h.left, key, val);
    else if (key > h.key) h.right = this.put(h.right, key, val);

    if (isRed(h.right) && !isRed(h.left)) h = this.rotateLeft(h);
    if (isRed(h.left) && isRed(h.left.left)) h = this.rotateRight(h);
    if (isRed(h.left) && isRed(h.right)) this.flipColors(h);

    return h;
  }

  rotateLeft(h) {
    const x = h.right;
    h.right = x.left;
    x.left = h;
    x.color = h.color;
    h.color = RED;
    return x;
  }

  rotateRight(h) {
    const x = h.left;
    h.left = x.right;
    x.right = h;
    x.color = h.color;
    h.color = RED;
    return x;
  }

  flipColors(h) {
    h.color = RED;
    h.left.color = BLACK;
    h.right.color = BLACK; 
  }

  // nearest(key) {
  //   if (key === this.root.key) return [null, null];
  //   return this.nearestRec(this.root, key, null, null);
  // }

  // nearestRec(h, key, prev, prev_prev) {
  //   if (key === h.key) return [prev, prev_prev];
  //   else if (key < h.key) return this.nearestRec(h.left, key, h, prev);
  //   else return this.nearestRec(h.right, key, h, prev);
  // }

  nnearest(key) {
    // if (this.root !== null && this.root.right !== null) return [this.root.value, this.root.right.value];
    if (this.root === null) return [null,null];
    return [this.up(key), this.down(key)];
  }

  up(key) {
    return this.upUtil(key, this.root, null);
  }

  upUtil(key, curnode, lastLeft) {
    var res = null;
    if (key === curnode.key) {
      res = this.leftmost(curnode.right);
      return res === null ? lastLeft : res;
    }
    else if (key < curnode.key) return this.upUtil(key, curnode.left, curnode);
    else return this.upUtil(key, curnode.right, lastLeft);
  }

  down(key) {
    return this.downUtil(key, this.root, null);
  }

  downUtil(key, curnode, lastRight) {
    var res = null;
    if (key === curnode.key) {
      res = this.rightmost(curnode.left);
      return res === null ? lastRight : res;
    }
    else if (key > curnode.key) return this.downUtil(key, curnode.right, curnode);
    else return this.downUtil(key, curnode.left, lastRight)
  }

  leftmost(node) {
    if (node === null) return null;

    var current = node;
    while( current.left !== null ){
      current = current.left;
    }
    return current;
  }

  rightmost(node) {
    if (node === null) return null;

    var current = node;
    while( current.right !== null ){
      current = current.right;
    }
    return current;
  }
}