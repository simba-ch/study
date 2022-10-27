const arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 100));
}
console.log(arr);

// 冒泡排序
function maopao(arr) {
  if (arr == null || arr.length < 2) return;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}
// console.log(maopao(arr))

// 选择排序
function xuanze(arr) {
  if (arr == null || arr.length < 2) return;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}
// console.log(xuanze(arr));

// 快速排序
function kuaisu(arr) {
  if (arr == null || arr.length < 2) return arr;
  const left = [],
    right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[0]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return kuaisu(left).concat(arr[0], kuaisu(right));
}

// console.log(kuaisu(arr))

// 标准快速排序
function biaokuai(arr, begin, end) {
  if (arr == null || arr.length <= 1) return;
  if (end - begin <= 1) return;
  let left = begin;
  let right = end;
  do {
    do left++;
    while (left < right && arr[left] < arr[begin]);
    do right--;
    while (left < right && arr[right] > arr[begin]);
    if (left < right) [arr[left], arr[right]] = [arr[right], arr[left]];
  } while (left < right);
  const exchangePoint = right == left ? right - 1 : right;
  [arr[begin], arr[exchangePoint]] = [arr[exchangePoint], arr[begin]];
  biaokuai(arr, begin, exchangePoint);
  biaokuai(arr, exchangePoint + 1, end);
}
biaokuai(arr, 0, arr.length);
console.log(arr);
