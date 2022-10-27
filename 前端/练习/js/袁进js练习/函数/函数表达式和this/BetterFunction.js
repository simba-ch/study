var objFunction = {
    /**
 * 该函数用于判断某个数是不是奇数
 * @param {number} num 
 */
    fnIsOdd: function (num) {
        return num % 2 !== 0;
    },

    /**
     * 该函数用于判断某个数是不是素数
     * @param {*} num 
     */
    fnIsPrime: function (num) {
        if (typeof (num) !== "number" || num < 2) return false;

        for (var i = 2; i < num; i++) {
            if ((num % i) === 0) return false;
        }
        return true;
    },


    /**
     * 该函数用于对数组求和
     * @returns{number} sum
     */


    fnSumOfArray: function (arr) {
        var len = arr.length,
            sum = 0;
        if (len === 0) return;
        else {
            for (var i = 0; i < len; i++) {
                sum += arr[i];
            }
            return sum;
        }
    },
    /**
     * 该函数用于得到数组中的最大值
     */
    fnMaxOfArray: function (arr) {
        var len = arr.length;
        var max = arr[0];
        if (len === 0) return;
        for (var i = 1; i < len; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    },


    /**
     * 该函数用于得到数组中的最小值
     */

    fnMinOfArray: function (arr) {
        var len = arr.length;
        var min = arr[0];
        if (len === 0) return;
        for (var i = 1; i < len; i++) {
            if (arr[i] == undefined) arr[i] = Infinity;
            if (arr[i] < min) min = arr[i];
        }
        return min;
    },


    /**
     * 该函数用于判断数组是否是稀松数组
     */
    fnHasEmptyInArray: function (arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (!(i in arr)) return true;
        }
        return false;
    },

    /**
     * 判断该某年是否是闰年
     */
    fnIsLeap: function (year) {
        return (year % 4 === 0 && year % 100 != 0) || year % 400 === 0
    },

    /**
     * 得到某年某月的天数
     */
    fnGetDays: function (year, month) {
        if (month === 2) {
            return ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) ? 29 : 28;
        }
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            default:
                return 30;
        }

    },

    /**
     * 得到某个数字数组中出现次数最多的数字和频率
     */
    fnGetMoreFreqInArray: function (arr) {
        var len = arr.length,
            objResult,
            objRoom = {};
        for (var i in arr) {
            if (objRoom[arr[i]]) {
                objRoom[arr[i]]++;
            }
            else {
                objRoom[arr[i]] = 1;
            }
        }
        for (var prop in objRoom) {
            if (!objResult || objResult.freq < objRoom[prop]) {
                objResult = {
                    num: +prop,
                    freq: objRoom[prop]
                }
            }
        }
        return objResult;
    },

    // 为数组排序
    fnSort: function (arr, fnCondition) {
        var len = arr.length,
        for (var i = 1; i < len; i++) {
            if(fnCondition(arr[i - 1],arr[i])) {
                arr[i] = arr [i] + arr[i - 1];
                arr[i - 1] = arr[i] - arr[i - 1];
                arr[i] = arr[i] - arr[i - 1];
            }
        }
    },
    /**
     * 按照指定的条件对某个数组进行筛选
     * @param {*} arr 
     * @param {*} fnCondition 
     */
    fnFilter: function (arr, fnCondition) {
        var len = arr.length,
            arrNew = [];
        for (var i = 0; i < len; i++) {
            if (fnCondition(arr[i])) {
                arrNew.push(arr[i]);
            }
        }
        return arrNew;
    },
    /**
     * 按照指定的条件，得到某个数组中第一个满足条件的元素
     */
    fnFind: function (arr, fnCondition) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (fnCondition(arr[i])) return arr[i];
        }
    },

    /**
     * 按照指定的条件，得到某个数组中满足条件的元素数量
     */
    fnCount: function (arr, fnCondition) {
        var len = arr.length,
            count = 0;
        for (var i = 0; i < len; i++) {
            if (fnCondition(arr[i])) count++;
        }
        return count;
    }




}