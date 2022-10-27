export function handleUploadUrl(url: string) {
  if (url[0] === '/') return 'http://47.108.151.76' + url;
  return url;
}

export function orderHelper(num: number) {
  const arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
}
