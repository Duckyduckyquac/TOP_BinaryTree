const { Tree } = require('./Tree.js');

test('Tree constructor sorts, removes duplicates, and builds a balanced BST', () => {
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