var inp = document.querySelector('input');
var paper = {
    zIndex: 1,
    dom: document.querySelector('.container'),
    width: 170,
    height: 170,
    left: function () {
        return random(0, this.maxWidth);
    },
    top: function () {
        return random(0, this.maxHeight);
    },
    color: function () {
        return `rgb(${random(100, 250)},${random(100, 250)},${random(100, 250)})`
    },
    /**
     * 创建一个paper贴纸
     */
    createPaper: function (text) {
        var paper = document.createElement('div');
        paper.innerHTML = `<p>${text}</p><span>X</span>`;
        paper.style.width = this.width + 'px';
        paper.style.height = this.height + 'px';
        paper.style.left = this.left() + 'px';
        paper.style.top = this.top() + 'px';
        paper.style.backgroundColor = this.color();
        paper.style.zIndex = 0;
        paper.classList.add('paper');
        this.dom.appendChild(paper);
    }
}
paper.maxWidth = document.documentElement.clientWidth - paper.width;
paper.maxHeight = parseFloat(getComputedStyle(inp).top) - paper.height;

// 随机函数
function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 为input注册事件
inp.onkeypress = function (e) {
    if (e.key === 'Enter' && this.value) {
        paper.createPaper(this.value);
        this.value = '';
    }
}

// 为paper注册移动事件
window.onmousedown = function (e) {
    var div;
    if (getEle(e.target) === 'P') {
        div = e.target.parentElement;
    }
    else if (getEle(e.target) === 'DIV') div = e.target;
    if (div) {
        div.style.zIndex = paper.zIndex;
        this.paper.zIndex++;
        var pageX = e.pageX,
            pageY = e.pageY;
        var eLeft = getComputedStyle(div).left,
            eTop = getComputedStyle(div).top;
        window.onmousemove = function (event) {
            event.preventDefault();
            var disX = event.pageX - pageX,
                disY = event.pageY - pageY;
            newLeft = parseFloat(eLeft) + disX;
            newTop = parseFloat(eTop) + disY;
            if (newLeft < 0) newLeft = 0;
            else if (newLeft > paper.maxWidth) newLeft = paper.maxWidth;
            if (newTop < 0) newTop = 0;
            else if (newTop > paper.maxHeight) newTop = paper.maxHeight;
            div.style.left = newLeft + 'px';
            div.style.top = newTop + 'px';

        }
        window.onmouseup = window.onmouseleave = function () {
            window.onmousemove = null;
        }
    }

    // 为span注册删除事件
    else if (getEle(e.target) === 'SPAN') {
        e.target.parentElement.remove();
    }
}

// 重置paper位置
window.onresize = function () {
    
    for (var i = 0, len = paper.dom.children.length; i < len; i++) {
        var rate = parseFloat(paper.dom.children[i].style.left)/paper.maxWidth;
        var disLeft = (document.documentElement.clientWidth - paper.width - paper.maxWidth) * rate;
        paper.dom.children[i].style.left = parseFloat(paper.dom.children[i].style.left) + disLeft + 'px';
        var rate = parseFloat(paper.dom.children[i].style.top)/paper.maxHeight;
        var disTop = (parseFloat(getComputedStyle(inp).top) - paper.height - paper.maxHeight) * rate;
        paper.dom.children[i].style.top = parseFloat(paper.dom.children[i].style.top) + disTop + 'px';
        console.log(paper.maxWidth,parseFloat(paper.dom.children[i].style.left));
        console.log(i,rate);
    }
    paper.maxWidth = document.documentElement.clientWidth - paper.width;
    paper.maxHeight = parseFloat(getComputedStyle(inp).top) - paper.height;
}


// 判断元素类型
function getEle(ele) {
    if (ele.parentElement) {
        if (ele.parentElement.className === 'paper') {
            if (ele.tagName === 'P') return 'P';
            else if (ele.tagName === 'SPAN') return 'SPAN';
        }
        else if (ele.tagName === 'DIV' && ele.className === 'paper') return "DIV";
    }
}

