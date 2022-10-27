if (!this.myPlugin) {
  this.myPlugin = {};
}

this.myPlugin.clone = function (obj, isDeep) {
  if (Array.isArray(obj)) {
    var newArr = [];
    if (`${isDeep}` === "true") {
      for (var i = 0, len = obj.length; i < len; i++) {
        newArr.push(this.myClone(obj[i], true));
      }
      return newArr;
    } else {
      return obj.slice();
    }
  } else if (typeof obj === "object") {
    var newObj = {};
    for (var prop in obj) {
      if (`${isDeep}` === "true") {
        newObj[prop] = this.myClone(boj[prop], true);
      } else {
        newObj[prop] = obj[prop];
      }
    }
    return newObj;
  } else {
    return obj;
  }
};

this.myPlugin.mixin = function () {
  var obj;
  for (var i = 0, len = arguments.length; i < len; i++) {
    obj = Object({}, arguments[i]);
  }
  return obj;
};

// 用setTimeout仿写setInterval
this.myPlugin.setInterval = function (fn, t) {
  function interval() {
    setTimeout(interval, t);
    try {
      fn();
    } catch (err) {
      throw err.toString();
    }
  }
  setTimeout(interval, t);
};

// 继续完善
/* function myAssign() {
    var len = arguments.length,
        init = len > 1 ? arguments[0] : {};
    function iterate(obj1, obj2) {
        for (var prop in obj2) {
            if (typeof (obj2[prop]) === "object") {
                iterate(obj1[prop], obj2[prop]);
            }
            else {
                obj1[prop] = obj2[prop];
            }
        }
    }

    for (var i = 1; i < len; i++) {
        iterate(init, arguments[i]);
    }
    return init;

}

var a = {
    a: { a: [1, 2, 3], c: [true, null, false] },
    b: [{ a: "abc" },
    { d: "def" }],
    c: 125652
},
    b = {
        a: { b: ["ba", "bb", "bc"], },
        b: [{ b: "bcd" },
        { d: "def" }],
        c: 125652,
        d: {
            arr: [1, 2, 3, 4],
            obj: { a: "a", b: "b", c: "c" }
        }
    };
*/

//函数防抖
this.myPlugin.debounce = function (handler, delay = 1000) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handler.apply(this, arguments);
    }, delay);
  };
};

//函数节流
this.myPlugin.throttle = function (handler, delay = 1000, immediately = false) {
  let timer;
  if (immediately) {
    return function () {
      if (!timer || Date.now() - timer >= delay) {
        handler.apply(null, arguments);
        timer = Date.now();
      }
    };
  } else {
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          handler.apply(null, arguments);
          timer = null;
        }, delay);
      }
    };
  }
};
