let {TreeNode}= require('./TreeNode.js');
let {Helper} = require('./Helper.js');
const utility = new Helper;
class Tree{
    constructor(treeArr, root=null){
        let processedArr = utility.mergeSort(treeArr);
        processedArr = utility.removeDuplicates(processedArr);
        this.root = this.buildTree(processedArr, 0, (processedArr.length-1));
    }
    buildTree (treeArr, start, end){
        if(start>end){
            return null;
        }
        let midIndex = Math.floor((start+end)/2);
        let newTreeNode = new TreeNode(treeArr[midIndex]);
        newTreeNode.left = this.buildTree(treeArr, start, midIndex-1);
        newTreeNode.right = this.buildTree(treeArr, midIndex+1, end);
        return newTreeNode;
    }
}

module.exports = {Tree};