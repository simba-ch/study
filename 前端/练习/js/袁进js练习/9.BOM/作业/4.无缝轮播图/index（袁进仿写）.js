var config = {
    imgsContainer: document.getElementsByClassName('imgs')[0],
    imgs: document.querySelectorAll('.imgs a img'),
    imgWidth: 520,
    currentIndex: 0,
    dotsContainer: document.querySelector('.dots'),
    dotWidth: 12,
    timer: null,
    total: 2000,
    duration: 16
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


















