var inp = document.querySelector('input');
body = document.querySelector('body'),
    vWidth = document.documentElement.clientWidth,
    vheight = document.documentElement.clientHeight,
    paper = {
        width: 170,
        height: 170,
        color: function () {
            return `rgb(${fnRandom(0, 255)},${fnRandom(0, 255)},${fnRandom(0, 255)})`
        },
        left: function () {
            return fnRandom(0, vWidth - 170);
        },
        top: function () {
            return fnRandom(0, vheight - 170);
        }
    }


// input框注册添加div事件

    inp.onkeypress = function (e) {
        if (e.key === 'Enter'  && inp.value) {
            createPaper();
            inp.value = '';
        }
    }


// 随机函数
function fnRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// 创建一个paper元素
function createPaper() {
    var div = document.createElement('div');
    div.classList.add('paper')
    div.style.width = paper.width + 'px';
    div.style.height = paper.height + 'px';
    div.style.backgroundColor = paper.color();
    div.style.left = paper.left() + 'px';
    div.style.top = paper.top() + 'px';
    div.innerHTML = `<p>${inp.value}</p><span>X</span>`;
    body.appendChild(div);
}

// 注册移动事件
body.onmousedown = function (e) {
    if (e.target.tagName === 'DIV') {
        body.onmousemove = function (event) {
            var left = parseFloat(getComputedStyle(event.target).left) + event.movementX,
                top = parseFloat(getComputedStyle(event.target).top) + event.movementY;
            if (left < 0) left = 0;
            if (left > vWidth - 170) left = vWidth - 170;
            if (top < 0) top = 0;
            if (top > vheight - 170) top = vheight - 170;
            event.target.style.left = left + 'px';
            event.target.style.top = `${top}px`;
            e.target.onmouseleave = e.target.onmouseup = function () {
                body.onmousemove = null;
            }
        }
    }
}

// 注册删除事件

body.onclick = function (e) {
    if (e.target.tagName === 'SPAN') {
        e.target.parentNode.remove();
    }
}

