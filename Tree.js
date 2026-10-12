let {TreeNode}= require('./TreeNode.js');
let {Helper} = require('./Helper.js');
const utility = new Helper;
class Tree{
    constructor(treeArr){
        let processedArr = utility.mergeSort(treeArr);
            processedArr = utility.removeDuplicates(processedArr);
        this.root = this.buildTree(processedArr, 0, processedArr.length-1);
    }
    buildTree(treeArr, startIndex,endIndex){
        // base case 1: start index is greater than end index
        if(startIndex>endIndex){
            return null;
        }
        // get the midpoint
        let midIndex = Math.floor((startIndex+endIndex)/2);
        // create the new node
        let newNode = new TreeNode(treeArr[midIndex]);
            newNode.left = this.buildTree(treeArr, startIndex, midIndex-1);
            newNode.right = this.buildTree(treeArr, midIndex+1,endIndex);

        return newNode;
    }

    includes(value){
        return _searchRecursively(value, this.root);
        // helper function to return properly:
        function _searchRecursively(value, currentNode){
            // Base Case 1: The currentNode is null
            if(currentNode===null){
                return false;
            }
            // Base Case 2: Th currentNode has the value:
            if(currentNode.data===value){
                return true;
            }
            // If none of the cases match, traverse downward:
            if(value<currentNode.data){
                return _searchRecursively(value, currentNode.left);
            }
            else if(value>currentNode.data){
                return _searchRecursively(value, currentNode.right);
            }
        }
    }
    
    insert(value){
        this.root = _insertRecursively(this.root, value);

        // helper function to insert recursively
        function _insertRecursively(currentNode, value){
            // Base Case 1: The currentNode is null
            if(currentNode===null){
                let tempNode = new TreeNode(value);
                return tempNode;
            }
            // Base Case 2: The value already exists in the current node
            else if(currentNode.data===value){
                return currentNode;
            }
            // If none of those match, traverse the tree downwards 
            else if (value<currentNode.data){
                currentNode.left = _insertRecursively(currentNode.left, value);
            }
            else if (value>currentNode.data){
                currentNode.right = _insertRecursively(currentNode.right, value);
            }
            // return the currentNode for the root to be reinitialized
            return currentNode;
        }
    }
    
    deleteItem(value){
        
    }
}

module.exports = {Tree};