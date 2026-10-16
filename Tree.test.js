const { Tree } = require('./Tree.js');

describe('Tree Data Structure', () => {

    describe('Constructor and buildTree', () => {
        test('sorts, removes duplicates, and builds a balanced BST', () => {
            let tree = new Tree([5, 4, 3, 2, 1, 3, 4]);

            // Root should be 3
            expect(tree.root.data).toBe(3);

            // Left subtree checks
            expect(tree.root.left.data).toBe(1);
            expect(tree.root.left.left).toBeNull();
            expect(tree.root.left.right.data).toBe(2);

            // Right subtree checks
            expect(tree.root.right.data).toBe(4);
            expect(tree.root.right.left).toBeNull();
            expect(tree.root.right.right.data).toBe(5);
        });
    });

    describe('includes(value)', () => {
        test('returns true if value is in the tree and false otherwise', () => {
            let tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

            expect(tree.includes(4)).toBe(true); // Root
            expect(tree.includes(1)).toBe(true); // Deep left
            expect(tree.includes(7)).toBe(true); // Deep right
            expect(tree.includes(99)).toBe(false); // Non-existent value
        });
    });

    describe('insert(value)', () => {
        test('adds new values correctly and ignores duplicates', () => {
            let tree = new Tree([10, 5, 15]);

            // Insert a value into the left subtree
            tree.insert(3);
            expect(tree.root.left.left.data).toBe(3);

            // Insert a value into the right subtree
            tree.insert(20);
            expect(tree.root.right.right.data).toBe(20);

            // Try inserting a duplicate value
            tree.insert(10); // Already exists as root
            expect(tree.root.data).toBe(10);

            // Check using includes to verify insertion success
            expect(tree.includes(3)).toBe(true);
            expect(tree.includes(20)).toBe(true);
            expect(tree.includes(99)).toBe(false);
        });

        test('handles building a tree from an empty state', () => {
            let tree = new Tree([]);
            tree.insert(50);

            expect(tree.root).not.toBeNull();
            expect(tree.root.data).toBe(50);

            tree.insert(30);
            tree.insert(70);

            expect(tree.root.left.data).toBe(30);
            expect(tree.root.right.data).toBe(70);
        });
    });

    describe('deleteItem(value)', () => {
        test('deletes a leaf node (0 children)', () => {
            let tree = new Tree([1, 2, 3]); // root: 2, left: 1, right: 3
            tree.deleteItem(1);

            expect(tree.includes(1)).toBe(false);
            expect(tree.root.left).toBeNull();
        });

        test('deletes a node with 1 child', () => {
            let tree = new Tree([2, 1, 3, 4]); // 3 has one child (4)
            tree.deleteItem(3);

            expect(tree.includes(3)).toBe(false);
            expect(tree.root.right.data).toBe(4);
        });

        test('deletes a node with 2 children using the in-order successor', () => {
            let tree = new Tree([1, 2, 3, 4, 5, 6, 7]); // root is 4
            tree.deleteItem(4); // Deleting root which has two children

            expect(tree.includes(4)).toBe(false);
            // Verify structural integrity of remaining nodes
            expect(tree.includes(1)).toBe(true);
            expect(tree.includes(2)).toBe(true);
            expect(tree.includes(3)).toBe(true);
            expect(tree.includes(5)).toBe(true);
            expect(tree.includes(6)).toBe(true);
            expect(tree.includes(7)).toBe(true);
        });

        test('does nothing when attempting to delete a non-existent value', () => {
            let tree = new Tree([1, 2, 3]);
            tree.deleteItem(99);

            expect(tree.includes(1)).toBe(true);
            expect(tree.includes(2)).toBe(true);
            expect(tree.includes(3)).toBe(true);
        });
    });

    describe('Traversals (levelOrderForEach, inOrderForEach, preOrderForEach, postOrderForEach)', () => {
        // Tree structure for [1, 2, 3, 4, 5, 6, 7]:
        //        4
        //      /   \
        //     2     6
        //    / \   / \
        //   1   3 5   7
        let tree;

        beforeEach(() => {
            tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
        });

        test('levelOrderForEach visits nodes in breadth-first order', () => {
            let result = [];
            tree.levelOrderForEach(val => result.push(val));
            expect(result).toEqual([4, 2, 6, 1, 3, 5, 7]);
        });

        test('inOrderForEach visits nodes in ascending order', () => {
            let result = [];
            tree.inOrderForEach(val => result.push(val));
            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
        });

        test('preOrderForEach visits root before subtrees', () => {
            let result = [];
            tree.preOrderForEach(val => result.push(val));
            expect(result).toEqual([4, 2, 1, 3, 6, 5, 7]);
        });

        test('postOrderForEach visits subtrees before root', () => {
            let result = [];
            tree.postOrderForEach(val => result.push(val));
            expect(result).toEqual([1, 3, 2, 5, 7, 6, 4]);
        });

        test('throws an error if callback is missing in traversals', () => {
            expect(() => tree.levelOrderForEach()).toThrow('Callback is required');
            expect(() => tree.inOrderForEach()).toThrow('Callback is required');
        });
    });

    describe('height(value) and depth(value)', () => {
        let tree;

        beforeEach(() => {
            tree = new Tree([1, 2, 3, 4, 5, 6, 7]); // Root is 4 (depth 0, height 2)
        });

        test('calculates correct height for nodes', () => {
            expect(tree.height(4)).toBe(2); // Root to deepest leaf
            expect(tree.height(2)).toBe(1); // Node 2 has children 1 and 3
            expect(tree.height(1)).toBe(0); // Leaf node height is 0
            expect(tree.height(99)).toBeUndefined(); // Non-existent value
        });

        test('calculates correct depth for nodes', () => {
            expect(tree.depth(4)).toBe(0); // Root depth is 0
            expect(tree.depth(2)).toBe(1); // Child of root
            expect(tree.depth(1)).toBe(2); // Grandchild of root
            expect(tree.depth(99)).toBeUndefined(); // Non-existent value
        });
    });

    describe('isBalanced() and rebalance()', () => {
        test('correctly identifies balanced and unbalanced trees', () => {
            let tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
            expect(tree.isBalanced()).toBe(true);

            // Unbalance the tree by inserting sequential elements
            tree.insert(8);
            tree.insert(9);
            tree.insert(10);
            expect(tree.isBalanced()).toBe(false);
        });

        test('rebalances an unbalanced tree', () => {
            let tree = new Tree([1, 2, 3, 4]);
            tree.insert(5);
            tree.insert(6);
            tree.insert(7);
            
            // Tree should be lopsided/unbalanced now
            expect(tree.isBalanced()).toBe(false);

            // Rebalance the tree
            tree.rebalance();
            expect(tree.isBalanced()).toBe(true);
        });
    });

});