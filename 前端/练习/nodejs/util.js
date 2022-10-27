const util = require('util')
// const fs = require('fs')

/* async function delay(duration = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
}

myCallbackify = function (promiseFn) {
  return function (...args) {
    const len = args.length;
    cb = args[len - 1];
    promiseFnAgrs = args.slice(0, len - 1)
    promiseFn(...promiseFnAgrs).then((value) => {
      cb(null, value)
    }, (err) => {
      if (err === null)
        err.reason = null;
      cb(err)
    })
  }
}

// const callbackFn = util.callbackify(delay)
const callbackFn = myCallbackify(delay);
callbackFn(500, (err, ret) => {
  console.log(err)
  console.log(ret);
}) */



function delayCallBack(duration, callback) {
  setTimeout(() => {
    console.log('balabala')
    callback(null,duration);
    // throw new Error('balabala')
  }, duration);
}


function myPromisify(cb) {
  return function (...args) {

    return new Promise((resolve, reject) => {
      try {
        cb(...args, (err, ret) => {
          resolve(ret)
        })
      } catch (err) {
        reject(err)
      }
    })


  }
}


const promiseDelay = util.promisify(delayCallBack);
// const promiseDelay = myPromisify(delayCallBack);
(async () => {
  const r = await promiseDelay(500);
  console.log(r);
})();