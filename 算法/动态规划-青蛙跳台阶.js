// 一个青蛙，一次只能跳一级台阶，或者跳两级台阶。
// 问：这个青蛙跳上n级台阶有多少种跳法。

function jump(num) {
  if(num== null || num < 0)return;
  if(num === 1) return 1;
  if(num === 2) return 2;
  return jump(num-1) + jump(num - 2);
}




// 变态青蛙跳台阶
// 这只青蛙，一次可以跳1级台阶、2级台阶、或n级台阶。
// 问：这只青蛙，跳上n级台阶有多少种方法?

function superJump(num) {
    if(num == null || num < 0) return;
    if(num === 1) return 1;
    let total = 1;
    for (let i = 1; i < num; i++) {
      total += superJump(i)
    }
    return total;
}

console.log(superJump(4))