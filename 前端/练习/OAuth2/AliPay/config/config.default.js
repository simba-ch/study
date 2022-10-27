/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1639724597768_7221';
  config.cluster = {
    listen: {
      port: 7001,
    },

  };
  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    pubicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhnVfvhmolCbePMgFxrbRjLCO0yCcb1ETRUDuNlXyOUyqIspdjuNCPiGbFiV1HHt2ACt2LKzqrl38S2+VNINeZj60JrgJy5xi1n87DU/oeCoS1CEaYJB5J6WI9jguRJ/zsvHW6YjOK6r/SbpV5A2Xtdc4ZapZODpuBO0caTRnGLrndE7GMEcB+fXYZIOQ32EGk9qpt8D1Gy7h+5wZYKoOXpPHG2xaQlAjmHx4cM/ZfKZMA4e5FAc934HPIsVG+Q9Ssf4zlUFuitogQ81WYPtcI8lOOg6rgxSzObr/azHcjh0nb27m4arXVeU7IJCVOli0WZz9IUP8clWAi9C3NTRUEQIDAQAB',
    privateKey: 'MIIEpQIBAAKCAQEAhnVfvhmolCbePMgFxrbRjLCO0yCcb1ETRUDuNlXyOUyqIspdjuNCPiGbFiV1HHt2ACt2LKzqrl38S2+VNINeZj60JrgJy5xi1n87DU/oeCoS1CEaYJB5J6WI9jguRJ/zsvHW6YjOK6r/SbpV5A2Xtdc4ZapZODpuBO0caTRnGLrndE7GMEcB+fXYZIOQ32EGk9qpt8D1Gy7h+5wZYKoOXpPHG2xaQlAjmHx4cM/ZfKZMA4e5FAc934HPIsVG+Q9Ssf4zlUFuitogQ81WYPtcI8lOOg6rgxSzObr/azHcjh0nb27m4arXVeU7IJCVOli0WZz9IUP8clWAi9C3NTRUEQIDAQABAoIBAHH6n42jbI8iH7QAjzzzDtGnfXslotaOMLq9HvG6i5ndDkBtsT+GEEpg7HmqiQr68X2VWhjnAA2NqGg+D4ozbltX/hjwW4VZbUONGP7g5Ryv9cQSx6xh7AIaxe6Kk1YjDU98yISxLqw/ySazqUmn6BoCdlFgRT9v8IGGilX4UQjZZI5YVHXNVcRZsGew3OcWjOdtk6F2v42uwu8mRf4lX8cSifLB1ZKOQdCWDcnjI4wieNtCH1IjI7+8UxkbjYgOVk2QrhbHUm5u2Vo2303nG35JA+0Q9UWF14i8Dtwgw1Uy+YvLLK0nD8ZLdNY/fDJjXTRHtIiadHePsBlhuuNaeB0CgYEA//dKNJNv4arjjHfHTA+l2qe1qPz3rDvV4nBfcdE29ixrPALJLoX313siAZtc6n/ZtdLbg0U9awRuTlY5sFD90SEJzaWeYnKLxLcJRt5TJZqxGt3u31Qh/W4E39fTYIeWuZvWD/oYQA6BKSr1bvBODjcVvyF+n1Uu0Lde0aFP7tsCgYEAhnnzDMahs9duQFMVYF9VjhLsc+AT0wdmOsyWWEpyb5g9LGijgEhIaDXskK9o7W7uYKVYCqNt3IT4SxqjseH1uidK0a8UtVX13/nBG+qRDkcfl0jzXq9N//gD2o40h9vvpnqblD9oZThTfWNdFhs50ssH+APp5DGt43Lpa0ZxboMCgYEAlEZgCgzOZt9jaV+JZ5o47WzxYq8HmhIfWEjYQUp8mCYrCFxkxjp806pUjLG/JWhiaV14I5bceT3b2C1Cxcxk+9wznZkvIsBQDugoy5DGgaYWqgWd9mj6N6Cf2jtgCy8ANQz898xcd97vGzXzbwxtaval9k4k14+0ytsuZikX8LkCgYEAhnEE/JDYuON35fcqN98XuaJRosczCpcrLT28USicn9Sj0/IJBAc/3G+MwlmbnUR6LUUgcAJTo1OMqAlJ/lzZPfJqapePLHt0BSe8WBx6SLvyaV0VcmPwpyddMvNYsTrArL+HKv75b7iQP5tHRQKTHJq+rMW839aK8gnAMu+KF+ECgYEAklccCI6eetOaljelo3n4a1HZJpqK04z4ioK4bCKmpS1tdtSFg8liPAsJf5vWWfMeEF66XQtCT3xnbsfeZFx6PeRDBw1uDepaFH0WeHm4Yw9dXpcKK6rrIvjTfo8FHru8gQ7AAXs92jYk7mvNEB9W2lBHGOjAyIU0/QO4deHj3Kw=',
    alipayPubicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgWrYqpyOrCw4CKb5SINYEm3J37SaS9gUX6VDcW1RBfITB49RISEXPiHKW5lJiZyUiQk54LPZsu8/50OcUZvZ3qj10igIyvsHV3k3jYs6xBZjXdnEl9XrHfqo7z7Th9fUewXraT47syVR09hCPVPUHBiNBOa7jlt6FfrpvlZhbzTqyVLucvfQ8HmKTdITMigehoAWVXhd/jQ3rTunFTpZZdI1OvGx5/CO/mjWZ7KR/lBz1vXeLS/CDj9pmYiOLOzWFzyiJKpNjTA3XSkgtzn23NzAf3/2qJXTezh0nYqlEdP40pyhTL2RyrPzI+iTlW1uCnAQjLqsNiPts6W317AOLQIDAQAB',
  };

  return {
    ...config,
    ...userConfig,
  };
};
