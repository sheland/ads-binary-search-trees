class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {
    const newNode = new BSTNode ({key: key, value: value, undefined, undefined, undefined});

    // replace root with new node if root is undefined 
    // return early
    if (this._root === undefined) {
      this._root = newNode
      this._count++ 
      return
    }

    let node = this._root

    while(node) {
      // replace current node with new node if same key
      // replacement -> do not increment count 
      if(newNode.key === node.key) {
        node.value = newNode.value
        return 

        // if new node is less than current node, move left 
      } else if (newNode.key < node.key) {
        if (node.left) {
          // move left
          this.parent = node
          node = node.left
        } else {
          // if left node does not exist, append new node as leaf
          node.left = newNode
          this._count++
          node.left.parent = this.parent
          return 
        }
        // move right 
      } else if (newNode.key > node.key) {
        if (node.right) {
          // move right 
          this.parent = node
          node = node.right
        } else {
          // append new node as leaf
          node.right = newNode
          this._count++
          node.right.parent = this.parent
          return
        }
      }

    }

  }

  lookup(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node.value;
      }
    }
  }

  delete(key) {
    // TODO (tests first!)
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;