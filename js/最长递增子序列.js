// 最长递增子序列.js

/**
 * 求解指定数组的最长递增子序列 回溯法
 * @param {number[]} nums 输入数组
 * @return {number[]} 最长递增子序列
 */
function longestIncreasingSubsequence(nums) {
  // 初始化结果为一个空数组
  let result = [];
  // 回溯函数，current记录当前可能的递增子序列，index表示遍历到的起始下标
  const backtrack = (current, index) => {
    if (current.length > result.length) {
      // 如果当前递增子序列长度已经超过之前的记录，则更新结果
      result = current.slice();
    }
    for (let i = index; i < nums.length; i++) {
      if (
        current.length === 0 || // 如果current为空，则只要该数字比nums[0]大则可以加入
        nums[i] > current[current.length - 1]
      ) {
        // 将符合条件的数字加入current中
        current.push(nums[i]);
        // 继续搜索
        backtrack(current, i + 1);
        // 回溯，移除新增的数字
        current.pop();
      }
    }
  };
  // 开始回溯
  backtrack([], 0);
  return result;
}

const nums = [10, 9, 2, 5, 3, 7, 101, 18];
const subsequence = longestIncreasingSubsequence(nums);
console.log(subsequence); // 输出: [2, 5, 7, 101]

// 第二种  动态规划法
const lengthOfLIS = (nums) => {
  let dp = Array(nums.length).fill(1);
  let result = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    result = Math.max(result, dp[i]);
  }
  return result;
};
const arrays = [10, 9, 2, 5, 3, 7, 101, 18];
const result = lengthOfLIS(arrays);
console.log(result);
