import 'babel-polyfill'

// non-sign-preserving
function bitLength(num) {
    let length = 0
    while (num !== 0) {
        num >>>= 1
        length += 1
    }
    return length
}

//divideWithoutDivisionBitwise(10, 5)

class Node {
    constructor() {
        this._left = null
        this._right = null
        this._parent = null
    }

    get left() {
        return this._left
    }
    set left(node) {
        if ( !(node instanceof Node) ) throw new Error('Can only set left to a Node instance.')
        this._left = node
        node._parent = this
    }

    get right() {
        return this._right
    }
    set right(node) {
        if ( !(node instanceof Node) ) throw new Error('Can only set right to a Node instance.')
        this._right = node
        node._parent = this
    }

    /**
     * @readonly
     */
    get parent() {
        return this._parent
    }
}

/**
 * A comlpete tree has all levels complete except for possibly the last level,
 * in which case all leaf nodes at the last level are always on the left.
 */
function isCompleteBinaryTree(rootNode) {
    let result = true

    // detect number of levels.
    let deepestLevel = 0
    preOrderTraverse(rootNode, function(node, level) {
        if (level > deepestLevel) deepestLevel = level
    })

    // Now, we can traverse the tree, and if we detect any of the following,
    // then we don't have a complete tree:
    // 1. If we reach a level deepestLevel leaf on the right without a sibling node on the left.
    // 2. If we reach a level less than or equal to deepestLevel-2 and the node
    //    is without both left and right children.
    // 3. If we've encountered a level deepestLevel-1 node without a right
    //    child, or without any children, then we must expect all following nodes to
    //    the right at the same level not to have any children since all leaf children
    //    must be as far to the left as possible.

    let expectNoChildren = false

    preOrderTraverse(rootNode, function(node, level) {
        // 1.
        if (level === deepestLevel-1 && !node.left && node.right) {
            result = false
        }

        // 2.
        if (level <= deepestLevel-2 && (!node.left || !node.right)) {
            result = false
        }

        // 3.
        if (level === deepestLevel-1 && expectNoChildren) {
            if (node.left || node.right) {
                result = false
            }
        }
        if (level === deepestLevel-1 && !node.right) {
            if (!expectNoChildren) {
                expectNoChildren = true
            }
        }
    })

    return result
}

// recursive, but we could also make an iterative version.
function preOrderTraverse(node, task) {
    _preOrderTraverse(node, task, 1)
}

function _preOrderTraverse(node, task, level) {
    task(node, level)
    if (node.left) {
        _preOrderTraverse(node.left, task, level+1)
    }
    if (node.right) {
        _preOrderTraverse(node.right, task, level+1)
    }
}

// recursive, but we could also make an iterative version.
function inOrderTraverse(node, task) {
    _inOrderTraverse(node, task, 1)
}

function _inOrderTraverse(node, task, level) {
    if (node.left) {
        _inOrderTraverse(node.left, task, level+1)
    }
    task(node, level)
    if (node.right) {
        _inOrderTraverse(node.right, task, level+1)
    }
}

// recursive, but we could also make an iterative version.
function postOrderTraverse(node, task) {
    _postOrderTraverse(node, task, 1)
}

function _postOrderTraverse(node, task, level) {
    if (node.left) {
        _postOrderTraverse(node.left, task, level+1)
    }
    if (node.right) {
        _postOrderTraverse(node.right, task, level+1)
    }
    task(node, level)
}

// build the sample tree depicted at
// https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Complete_binary.pdf/page1-440px-Complete_binary.pdf.jpg
let root = new Node

root.left = new Node
root.right = new Node

root.left.left = new Node
root.left.right = new Node

root.left.left.left = new Node
    //root.left.left.left.left = new Node
    //root.left.left.left.left.left = new Node
root.left.left.right = new Node

root.left.right.left = new Node
root.left.right.right = new Node

root.right.left = new Node
root.right.right = new Node

root.right.left.left = new Node
//root.right.right.left = new Node
    //root.right.left.right = new Node

console.log(' ----------- is complete binary tree?', isCompleteBinaryTree(root))

