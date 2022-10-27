var config = {
    imgsSrc: ["img/0.jpg", "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg",
        "img/10.jpg", "img/11.jpg", "img/12.jpg", "img/13.jpg", "img/14.jpg", "img/15.jpg", "img/16.jpg", "img/17.jpg", "img/18.jpg", "img/19.jpg",
        "img/20.jpg", "img/21.jpg", "img/22.jpg", "img/23.jpg", "img/24.jpg", "img/25.jpg", "img/26.jpg", "img/27.jpg", "img/28.jpg", "img/29.jpg",
        "img/30.jpg", "img/31.jpg", "img/32.jpg", "img/33.jpg", "img/34.jpg", "img/35.jpg", "img/36.jpg", "img/37.jpg", "img/38.jpg", "img/39.jpg", "img/40.jpg"],
    imgWidth: 220,
    minGap: 10,
    container: document.querySelector('.container')
}

function waterfall(config) {
    var sources = [];
    function hybrid() {
        var initial = {
            imgsSrc: [],
            imgWidth: 220,
            minGap: 10,
            container: document.querySelector('body')
        }
        return Object.assign({}, initial, config);
    }
    var config = hybrid(),
        container = config.container,
        width = config.imgWidth,
        min = config.minGap,
        imgs = config.imgsSrc;
    function init() {
        if (container.tagName !== "BODY" && getComputedStyle(container).position === "static") container.style.position = "relative";
        imgs.forEach(function (value) {
            var img = document.createElement('img');
            img.src = value;
            img.style.position = 'absolute';
            img.style.transition = ".5s";
            img.onload = setImgsPosition;
            container.appendChild(img);
            sources.push(img)
        })
    }
    init();
    function setImgsPosition() {
        function calcCol() {
            var containerWidth = container.clientWidth,
                num = Math.floor((containerWidth - min) / (width + min)),
                gap = (containerWidth - num * width) / (num + 1);
            return {
                num,
                gap
            }
        }
        var obj = calcCol(),
            arr = new Array(obj.num);
        arr.fill(min);
        sources.forEach(function (item) {
            var top = Math.min.apply(null, arr),
                index = arr.indexOf(top);
            item.style.left = index * (width + obj.gap) + obj.gap + "px";
            item.style.top = arr[index] + 'px';
            var height = item.clientHeight;
            arr[index] += obj.gap + height;
            container.style.height = Math.max.apply(null,arr) - obj.gap + min + "px"
        })
    }
    setImgsPosition();
    window.onresize = setImgsPosition;
}
waterfall(config);