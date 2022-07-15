const debounce = (fn, wait) => {
  let timeId = null;
  return (...args) => {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, [...args]);
    }, wait);
  };
};
const tree = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null,
        },
        right: {
            val: 5,
            left: {
                val: 8,
                left: null,
                right: null,
            },
            right: {
                val: 9,
                left: null,
                right: null,
            },
        },
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        },
    },
};
// traverse tree by recursion
const getThroughTree=(tree)=>{
    const res = [];
    const preOrder=(root)=>{
        if(!root) return;
        res.push(root.val);// root
        preOrder(root.left);// left
        preOrder(root.right);// right
    }
    preOrder(tree);
    return res;
}
// traverse tree by loop
const loopTravelTree=(tree)=>{
    const res = [];
    const stack = [tree];
    while(stack.length){
        const treeNode = stack.pop();
        res.push(treeNode.val);
        treeNode.left && stack.push(treeNode.left);
        treeNode.right && stack.push(treeNode.right);
    }
    return res;
}
// get the nodes number
const getNodesNum=(tree,prop)=>{
    const res = [];
    const traverseTreeNode =(treeNode)=>{
        res.push(treeNode.val);
        if(treeNode[prop]){
            treeNode.left&&traverseTreeNode(treeNode.left);
            treeNode.right&&traverseTreeNode(treeNode.right);
        }
    }
    traverseTreeNode(tree[prop]);
    return res.length;
}
// which has more nodes
const whichMore=(tree)=>{
    const leftDeepth = getNodesNum(tree, 'left');
    const rightDeepth = getNodesNum(tree, 'right');
    return leftDeepth > rightDeepth ? 'left' : 'right';
}
// get the most deepth of binary tree
const getMaxDeepth=(tree)=>{
    let res = 0;
    const traverseTree =(treeNode, times = 1)=>{
        if(!treeNode) return;
        if(!treeNode.left && !treeNode.right){
            res = Math.max(res, times);
        }
        treeNode.left && traverseTree(treeNode.left, times+1);
        treeNode.right && traverseTree(treeNode.right, times+1);
    }
    traverseTree(tree, 1);
    return res;
}

export default debounce;
