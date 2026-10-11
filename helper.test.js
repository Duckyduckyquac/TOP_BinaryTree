
let {Helper} = require('./Helper.js');


test('mergeSort correctly sorted an unsorted array',function(){
    let utility = new Helper;
    let unsortedArr = [5,4,3,2,1];

    let result = utility.mergeSort(unsortedArr);
    expect(result).toEqual([1,2,3,4,5]);
})

test('mergeSort safely ignores empty arrays', function(){
    let utility = new Helper;
    result = utility.mergeSort([]);
    expect(result).toEqual([]);
})

test('mergeSort works on single values', function(){
    let utility = new Helper;
    result = utility.mergeSort([1]);
    expect(result).toEqual([1]);
})

test('removeDuplicates works as intended for arrays with more than two elements', function(){
    let utility = new Helper;
    result = utility.removeDuplicates([1,2,2]);
    expect(result).toEqual([1,2]);
})

test('removeDuplicates works as intended for 2 elements', function(){
    let utility = new Helper;
    result = utility.removeDuplicates([2,2]);
    expect(result).toEqual([2]);
})

test('removeDuplicates works as intended for no elements', function(){
    let utility = new Helper;
    result = utility.removeDuplicates([]);
    expect(result).toEqual([]);
})