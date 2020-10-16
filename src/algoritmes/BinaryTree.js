const BLACK = 0;
const RED = 1;

class Node {
  constructor(key, value, col) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = col;
  }

  free() {
    this.left = null;
    this.right = null;
  }

  isRed() {
    return this.color === RED;
  }
}

export class RedBlackBST {
  constructor() {
    this.root = null;
  }

  insert(key, value) {
    this.root = this.put(this.root, key, value);
    this.root.color = BLACK;
  }

  put(h, key, val) {
    if (h == null) return new Node(key, val, RED);

    if (key < h.key) h.left = this.put(h.left, key, val);
    else if (key > h.key) h.right = this.put(h.right, key, val);

    if (h.right.isRed() && !h.left.isRed()) h = this.rotateLeft(h);
    if (h.left.isRed() && !h.left.left.isRed()) h = this.rotateRight(h);
    if (h.left.isRed() && h.right.isRed()) this.flipColors(h);

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

  nearest(key) {
    if (key === this.root.key) return [null, null];
    return this.nearestRec(this.root, key, null, null);
  }

  nearestRec(h, key, prev, prev_prev) {
    if (key === h.key) return [prev, prev_prev];
    else if (key < h.key) return this.nearestRec(h.left, key, h, prev);
    else return this.nearestRec(h.right, key, h, prev);
  }
}