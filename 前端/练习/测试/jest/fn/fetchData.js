exports.fetchData = function (cb) {
  setTimeout(() => {
    cb('peanut butter')
  }, 1000);
}

exports.asyncData = async () => {
  await delay(1000);
  return 'peanut butter'
}

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout);
  })
}