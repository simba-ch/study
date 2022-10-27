var config = {
    banner: document.getElementsByClassName('banner')[0],
    imgsContainer: document.getElementsByClassName('imgs')[0],
    imgs: document.querySelectorAll('.imgs a img'),
    imgWidth: 520,
    currentIndex: 0,
    dotsContainer: document.querySelector('.dots'),
    dotWidth: 12,
    timer: null,
    outerTimer: null,
    total: 20,
    duration: 16,
    leftBtn: document.getElementsByClassName('item left')[0],
    rightBtn: document.getElementsByClassName('item right')[0],
    range: 0,
    time: 2000
    //config.dots:document.querySelectorAll('.dots span');
}

//设置对应圆点为选中状态
function map() {
    if (document.querySelector('.dots span.active')) document.querySelector('.dots span.active').className = '';
    config.dots[config.currentIndex].className = 'active';
}

//初始化轮播图
function init() {
    var first = config.imgsContainer.children[0].cloneNode(true);
    var last = config.imgsContainer.children[config.imgsContainer.children.length - 1].cloneNode(true);
    config.imgsContainer.insertBefore(last, config.imgsContainer.children[0]);
    config.imgsContainer.appendChild(first);
    config.imgsContainer.style.width = (config.imgs.length + 2) * config.imgWidth + 'px';
    initDots();

    //初始化小圆点
    function initDots() {
        var len = config.imgs.length;
        config.dotsContainer.style.width = len * config.dotWidth + 'px';
        for (var i = 0; i < len; i++) {
            var span = document.createElement('span');
            config.dotsContainer.appendChild(span);
        }
        config.dots = document.querySelectorAll('.dots span');
        map();
    }

    //初始化图片位置
    config.imgsContainer.style.marginLeft = -(config.currentIndex + 1) * config.imgWidth + 'px';
}
init();

/**
 * 移动事件函数
 * @param {number} range 一共需要移动的距离 正值为向右移动，负值为向左移动
 * @param {number} step 每次移动的距离
 */
function move(range, step) {
    clearInterval(config.timer);
    range > 0 ? step = Math.abs(step) : step = -Math.abs(step);
    config.timer = setInterval(function () {
        if (Math.abs(range) < Math.abs(step)) step = range;
        range -= step;
        if (parseFloat(getComputedStyle(config.imgsContainer).marginLeft) - step > 0)
            range -= parseFloat(getComputedStyle(config.imgsContainer).marginLeft) - step;
        if (parseFloat(getComputedStyle(config.imgsContainer).marginLeft) - step < -(config.imgs.length + 1) * config.imgWidth) {
            range += -(config.imgs.length + 1) * config.imgWidth - (parseFloat(getComputedStyle(config.imgsContainer).marginLeft) - step);
        }
        
        config.imgsContainer.style.marginLeft = parseFloat(getComputedStyle(config.imgsContainer).marginLeft) - step + 'px';
        config.range = range;
        judge();
        if (range === 0) {
            clearInterval(config.timer);
            config.timer = null;
        }
    }, config.duration)
    function judge(range, currentLeft, step) {
        if (parseFloat(getComputedStyle(config.imgsContainer).marginLeft) >= 0) config.imgsContainer.style.marginLeft = -config.imgs.length * config.imgWidth + 'px';
        if (parseFloat(getComputedStyle(config.imgsContainer).marginLeft) <= -(config.imgs.length + 1) * config.imgWidth) config.imgsContainer.style.marginLeft = -config.imgWidth + 'px';
    }
}

config.dots.forEach(function (val, index) {
    val.onclick = function (e) {
        config.currentIndex = index;
        map();
        var range = (index + 1) * config.imgWidth + parseFloat(getComputedStyle(config.imgsContainer).marginLeft);
        var step = range / config.total;
        move(range, step);
    }
})

//为向左按钮添加点击事件
config.leftBtn.onclick = function () {
    config.range -= config.imgWidth;
    config.currentIndex--;
    if (config.currentIndex < 0) config.currentIndex = config.dots.length - 1;
    var step = config.range / config.total;
    map();
    move(config.range, step);
}

//为向右按钮添加点击事件
config.rightBtn.onclick = function () {
    config.range += config.imgWidth;
    config.currentIndex++;
    if (config.currentIndex > config.dots.length - 1) config.currentIndex = 0;
    var step = config.range / config.total;
    map();
    move(config.range, step);
}

//移入移除定时器
config.banner.onmouseenter = function () {
    clearInterval(config.outerTimer);
}

//离开开启定时器
config.banner.onmouseleave = function () {
    startInterval();
}

//外层移动定时器
function startInterval() {
    config.outerTimer = setInterval(function() {
        config.currentIndex++;
        if (config.currentIndex > config.dots.length - 1) config.currentIndex = 0;
        move(config.imgWidth, config.imgWidth / config.total);;
        map()
    },config.time)
}

startInterval();