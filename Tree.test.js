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

test('includes(value) returns true if value is in the tree and false otherwise', () => {
    let tree = new Tree([1, 2, 3, 4, 5, 6, 7]);

    expect(tree.includes(4)).toBe(true); // Root
    expect(tree.includes(1)).toBe(true); // Deep left
    expect(tree.includes(7)).toBe(true); // Deep right
    expect(tree.includes(99)).toBe(false); // Non-existent value
});

test('insert(value) adds new values correctly and ignores duplicates', () => {
    // Start with a small tree or even an empty one if your constructor allows it
    let tree = new Tree([10, 5, 15]);

    // Insert a value into the left subtree
    tree.insert(3);
    expect(tree.root.left.left.data).toBe(3);

    // Insert a value into the right subtree
    tree.insert(20);
    expect(tree.root.right.right.data).toBe(20);

    // Try inserting a duplicate value
    tree.insert(10); // Already exists as root
    // Verify tree structure hasn't changed or duplicated nodes incorrectly
    expect(tree.root.data).toBe(10);
    
    // Check using includes to verify insertion success
    expect(tree.includes(3)).toBe(true);
    expect(tree.includes(20)).toBe(true);
    expect(tree.includes(99)).toBe(false);
});

test('insert(value) handles building a tree from an empty state if applicable', () => {
    // If your constructor handles empty arrays or you want to test incremental building:
    let tree = new Tree([]);
    tree.insert(50);
    
    expect(tree.root).not.toBeNull();
    expect(tree.root.data).toBe(50);
    
    tree.insert(30);
    tree.insert(70);
    
    expect(tree.root.left.data).toBe(30);
    expect(tree.root.right.data).toBe(70);
});