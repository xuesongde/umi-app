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
export default debounce;
