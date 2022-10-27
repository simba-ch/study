/* function mySetInterval(fn, t) {
    function inter() {
        setTimeout(inter, t);
        try {
            fn();
        }
        catch (err) {
            throw err.toString();
        }
    }
    setTimeout(inter, t);
}


function setInterval(func, t) {
    var inter = function () {
        setTimeout(inter, t);
        try {
            func.call(null);
        }
        catch (e) {
            throw e.toString();
        }
    }
    setTimeout(inter, t);
};


function mySetInterval(fn, t) {
    function inter() {
        fn();
        setTimeout(inter, t);
    }
    setTimeout(inter(), t);
}


function interval(callback, duration) {
    callback();
    setTimeout(function () {
        interval(callback, duration)
    }, duration)
} */



function interval(callback, duration) {
    callback();
    setTimeout(function(){
        interval(callback, duration);
    }, duration)
}


// 定时未设置成功
function mySetInterval(fn, t) {
    try {
        fn();
    }
    catch (err) {
        throw err.toString();
    }
    setTimeout(mySetInterval(fn,t), t);
}



interval(function(){
    console.log("test")
},1000);