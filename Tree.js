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
        // Helper function to recursively go down until deletion
        this.root = _deleteRecursively(value, this.root);
        function _deleteRecursively(value, currentNode){
            // Base Case 1: The node is empty (we reach a point where
            // no deletion could be made
            if(currentNode===null){
                return null;
            }
            // Base Case 2: The node to be deleted is found
            else if (value === currentNode.data){
                // Base Case 2.1; The currentNode has no child
                if((currentNode.left===null)&&(currentNode.right===null)){
                    return null;
                }
                // Base Case 2.2: The currentNode has one child
                if((currentNode.left!==null)||(currentNode.right!==null)){
                    // if only the right child exists:
                    // you must link the right child of the deleted node to 
                    // the parent of the deleted node:
                    if(currentNode.left===null){
                        return currentNode.right;
                    }
                    // the opposite is true
                    else if(currentNode.right===null){
                        return currentNode.left;
                    }
                }
                // Base Case 2.3: The currentNode has two children
                if((currentNode.left!==null)&&(currentNode.right!==null)){
                    // Both children existing would mean having to find a replacement
                    //  value for the deleted node.

                    // Traverse down the right subtree until we find its minimum value
                    // Note: currentNode is the node we want to delete
                    let successor = currentNode.right;
                    while(successor.left!=null){
                        successor = successor.left;
                    }
                    // successorValue now contains the replacement for the parent
                    // replace the parent with the this found value;
                    currentNode.data = successor.data;
                    // Delete duplicate value;
                    currentNode.right = _deleteRecursively(successor.data, currentNode.right);
                    return currentNode;
                }
            }
            // if none of the cases match, traverse recursively downwards
            else if(value<currentNode.data){
                currentNode.left = _deleteRecursively(value, currentNode.left);
            }
            else if(value>currentNode.data){
                currentNode.right = _deleteRecursively(value, currentNode.right);
            }
            // return the currentNode so that it could be relinked with the rest of the tree
            return currentNode;
        }
    }
    levelOrderForEach(callback){
        
    }
}
module.exports = {Tree};