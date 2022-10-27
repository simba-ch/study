function returnPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(111)
    }, 3000)
  }).then(res => {
    if (res === 111);
    console.log(111);
    // return 222
  });


}

try {
  const promise = returnPromise();
  promise.then((res) => {
    console.log("🚀 ~ file: test.js ~ line 18 ~ promise.then ~ res", res)
  })
  console.log("🚀 ~ file: test.js ~ line 16 ~ promise", promise)
} catch (err) {
  console.log("🚀 ~ file: test.js ~ line 17 ~ err", err)

}