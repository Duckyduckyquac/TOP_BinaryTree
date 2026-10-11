// Defines helper functions for sorting and removing duplicates

class Helper{
    mergeSort(arr){
        function merge(arr1, arr2){
            let mergedArr = [];
            let i = 0;
            let j = 0;

            while((i<arr1.length)&&(j<arr2.length)){
                if(arr1[i]<arr2[j]){
                    mergedArr.push(arr1[i]);
                    i+=1;
                }
                else {
                    mergedArr.push(arr2[j]);
                    j+=1;
                }
            }
            while(i<arr1.length){
                mergedArr.push(arr1[i]);
                i+=1;
            }
            while(j<arr2.length){
                mergedArr.push(arr2[j]);
                j+=1;
            }
            return mergedArr;
        }
        
        if(arr.length<=1){
            return arr;
        }
        let mid = Math.floor(arr.length/2);
        let leftHalf = arr.slice(0,mid);
        let rightHalf = arr.slice(mid);

        let mergedArr = merge(this.mergeSort(leftHalf), this.mergeSort(rightHalf));
        return mergedArr;
    }
    removeDuplicates(arr){
        let uniqueArr = [];
        for(let item of arr){
            if(item==uniqueArr[uniqueArr.length-1]){
                
            }
            else{
                uniqueArr.push(item);
            }
        }
        return uniqueArr;
    }
}

module.exports = {Helper};