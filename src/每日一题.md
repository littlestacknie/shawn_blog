# 每日一题

### **_(01 背包问题：背包只有容量一个维度，每个物品只能取一次)_**

**题目**：有 n 件物品和一个最多能背重量为 w 的背包。第 i 件物品的重量是 weight[i]，得到的价值是 value[i] 。**每件物品只能用一次**，求解将哪些物品装入背包里物品价值总和最大。

|        | 重量 | 价值 |
| ------ | ---- | ---- |
| 物品 0 | 1    | 15   |
| 物品 1 | 3    | 20   |
| 物品 2 | 4    | 30   |

![动态规划-背包问题4](https://img-blog.csdnimg.cn/20210118163425129.jpg)

**常规写法：**

```javascript
function testWeightBagProblem(weight, value, size) {
  // 定义 dp 数组
  const len = weight.length,
    dp = Array(len)
      .fill()
      .map(() => Array(size + 1).fill(0));

  // 初始化
  for (let j = weight[0]; j <= size; j++) {
    dp[0][j] = value[0];
  }

  // weight 数组的长度len 就是物品个数
  for (let i = 1; i < len; i++) {
    // 遍历物品
    for (let j = 0; j <= size; j++) {
      // 遍历背包容量
      if (j < weight[i]) dp[i][j] = dp[i - 1][j];
      else
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
    }
  }
  return dp[len - 1][size];
}

function test() {
  console.log(testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6));
}
test();
```

**滚动数组写法：**

```javascript
function testWeightBagProblem(wight, value, size) {
  const len = wight.length,
    dp = Array(size + 1).fill(0);
  for (let i = 1; i <= len; i++) {
    //遍历物品
    for (let j = size; j >= wight[i - 1]; j--) {
      //从最大背包容量开始逆向填充dp数组，防止重复填充
      dp[j] = Math.max(dp[j], value[i - 1] + dp[j - wight[i - 1]]);
    }
  }
  return dp[size];
}

function test() {
  console.log(testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6));
}

test();
```

### [474. 一和零](https://leetcode.cn/problems/ones-and-zeroes/) **_(01 背包问题：抽象化的背包有两个维度，此题为 m，n)_**

**题目**：给你一个二进制字符串数组 strs 和两个整数 m 和 n 。请你找出并返回 strs 的最大子集的大小，该子集中 最多 有 m 个 0 和 n 个 1 。如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。

示例 1：输入：strs = ["10", "0001", "111001", "1", "0"], m = 5, n = 3 输出：4

解释：最多有 5 个 0 和 3 个 1 的最大子集是 {"10","0001","1","0"} ，因此答案是 4 。 其他满足题意但较小的子集包括 {"0001","1"} 和 {"10","1","0"} 。{"111001"} 不满足题意，因为它含 4 个 1 ，大于 n 的值 3 。

示例 2： 输入：strs = ["10", "0", "1"], m = 1, n = 1 输出：2

解释：最大的子集是 {"0", "1"} ，所以答案是 2 。

```javascript
const findMaxForm = (strs, m, n) => {
  const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
  let numOfZeros, numOfOnes;

  for (let str of strs) {
    //遍历物品
    numOfZeros = 0;
    numOfOnes = 0;

    for (let c of str) {
      if (c === '0') {
        numOfZeros++;
      } else {
        numOfOnes++;
      }
    }

    for (let i = m; i >= numOfZeros; i--) {
      //使用滚动数组的方式分别遍历m，n两个维度，都是从大到小填充
      for (let j = n; j >= numOfOnes; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - numOfZeros][j - numOfOnes] + 1);
      }
    }
  }

  return dp[m][n];
};
```

### [494. 目标和](https://leetcode.cn/problems/target-sum/) **_(01 背包问题)_**

**题目**：给你一个整数数组 nums 和一个整数 target 。向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目

示例 1：

输入：nums = [1,1,1,1,1], target = 3
输出：5
解释：一共有 5 种方法让最终目标和为 3 。
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3

```javascript
var findTargetSumWays = function(nums, target) {
  const sum = nums.reduce((p, c) => p + c);
  if (Math.abs(target) > sum || (target + sum) % 2 != 0) return 0;
  let leftSum = (target + sum) / 2;
  const dp = new Array(leftSum + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < nums.length; i++) {
    for (let j = leftSum; j >= nums[i]; j--) {
      dp[j] += dp[j - nums[i]]; //最多组合的递推公式
    }
  }
  return dp[leftSum];
};
```

### [518. 零钱兑换 II](https://leetcode.cn/problems/coin-change-ii/) **_(完全背包问题：每个物品可以取无数次)_**

给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。假设每一种面额的硬币有无限个。 题目数据保证结果符合 32 位带符号整数。

示例 1：

输入：amount = 5, coins = [1, 2, 5]
输出：4
解释：有四种方式可以凑成总金额：
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

```javascript
var change = function(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      //和01背包问题的最大区别：正向遍历
      dp[j] += dp[j - coins[i]];
    }
  }
  return dp[amount];
};
```

### [1819. 序列中不同最大公约数的数目](https://leetcode.cn/problems/number-of-different-subsequences-gcds/) **_（数论）_**

**题目**：给你一个由正整数组成的数组 nums 。数字序列的 最大公约数 定义为序列中所有整数的共有约数中的最大整数。例如，序列 [4,6,16] 的最大公约数是 2 。数组的一个 子序列 本质是一个序列，可以通过删除数组中的某些元素（或者不删除）得到。例如，[2,5,10] 是 [1,2,1,2,4,1,5,10] 的一个子序列。计算并返回 nums 的所有 **非空** 子序列中 **不同** 最大公约数的 **数目** 。

示例 1：

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/04/03/image-1.png)

输入：nums = [6,10,3]
输出：5
解释：上图显示了所有的非空子序列与各自的最大公约数。
不同的最大公约数为 6 、10 、3 、2 和 1 。

```javascript
var countDifferentSubsequenceGCDs = function(nums) {
  const maxVal = Math.max(...nums);
  const occured = new Array(maxVal + 1).fill(false);
  for (const num of nums) {
    occured[num] = true;
  }
  let ans = 0;
  for (let i = 1; i <= maxVal; i++) {
    //遍历所有数字，查找哪个数可以作为公约数
    let subGcd = 0;
    for (let j = i; j <= maxVal; j += i) {
      if (occured[j]) {
        if (subGcd == 0) {
          subGcd = j;
        } else {
          subGcd = gcd(subGcd, j);
        }
        if (subGcd === i) {
          ans++;
          break;
        }
      }
    }
  }
  return ans;
};
function gcd(num1, num2) {
  //求两个数的最大公约数
  while (num2 != 0) {
    let tmp = num1;
    num1 = num2;
    num2 = tmp % num2;
  }
  return num1;
}
```

### 手写 Promise.all

```js
const p1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('1');
  }, 1000);
});
const p2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('2');
  }, 2000);
});
const p3 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    reject('3');
  }, 3000);
});

const promiseAll = promiseArr => {
  return new Promise(function(resolve, reject) {
    const resArr = [];
    promiseArr.forEach(p => {
      Promise.resolve(p)
        .then(res => {
          resArr.push(res);
          if (resArr.length == promiseArr.length) {
            resolve(resArr);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};

const p = promiseAll([p1, p2, p3])
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });

// const p = Promise.all([p1,p2,p3]).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })
```

### Json2DOM (react 渲染函数)

```javascript
function JSON2DOM(obj) {
  const { tag, attrs = {}, children } = obj;
  const ele = document.createElement(tag.toLowerCase());
  for (let key in attrs) {
    ele.setAttribute(key, attrs[key]);
  }
  if (typeof children === 'string') {
    const textNode = document.createTextNode(children);
    ele.appendChild(textNode);
  }
  if (Array.isArray(children) && children.length > 0) {
    children.forEach(child => ele.appendChild(JSON2DOM(child)));
  }
  return ele;
}
const obj = {
  tag: 'DIV',
  attrs: {
    id: 'app',
  },
  children: [
    {
      tag: 'SPAN',
      children: [{ tag: 'A', children: '11111' }],
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] },
      ],
    },
  ],
};
console.log(JSON2DOM(obj));
```

### Tree2list (树转列表)

```javascript
const data = [
  {
    id: '1',
    name: '父节点1',
    children: [
      {
        id: '1-1',
        name: '子节点1-1',
        children: [
          {
            id: '1-1-1',
            name: '子节点1-1-1',
          },
          {
            id: '1-1-2',
            name: '子节点1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: '父节点2',
    children: [
      {
        id: '2-1',
        name: '子节点2-1',
      },
    ],
  },
];

function tree2list(treeList) {
  let list = [];
  treeList.forEach(item => {
    list.push({
      id: item.id,
      name: item.name,
    });
    if (item?.children?.length) {
      list = [...list, ...tree2list(item.children)];
    }
  });
  return list;
}
const list = tree2list(data);
console.log('list', list);
```
