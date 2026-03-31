var twoSum = function(nums, target) {
    for(let i = 0; i <= nums.length; i++){
        if(nums[i] + nums[i+1] == target){
            return [nums.indexOf(nums[i]), nums.indexOf(nums[i+1])]
        }else {
            return nums[i]
        }
    }
};


console.log(twoSum([2,7,11,15], 9))