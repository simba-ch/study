var dom = {
    defaultV: {
        tr: 30,
        tc: 30,
        w: 20,
        h: 20
    },
    snake: [],//储存蛇的dom元素
    snakePos: [],//储存蛇的当前坐标点
    food: null,//储存当前食物的dom元素
    foodPos: [],//储存当前食物的坐标点
    repository: [],//实物可以出现的剩余位置
    score: 0,//分数
    duration: 150,//每毫秒移动一次
    snakeAspect: "right",//默认向右移动
    timer: null,
    pause: false,
    game: "over"
},
    content = {
        startBtn: document.querySelector('.startBtn'),
        pauseBtn: document.querySelector('.pauseBtn'),
        mask: document.querySelector('.mask'),
        snakeWrap: document.querySelector("#snakeWrap")
    };

/**
 * 添加一个div
 * @param {number}x left值
 * @param {number}y top值
 * @param {string}className class名称
 */
function addDiv(x, y, className, rotate) {
    var div = document.createElement("DIV");
    var deg;
    div.style.width = dom.defaultV.w + "px";
    div.style.height = dom.defaultV.h + "px";
    div.style.position = "absolute";
    div.style.left = x * dom.defaultV.w + "px";
    div.style.top = y * dom.defaultV.h + "px";
    div.className = className;
    switch (rotate) {
        case "left":
            deg = 180;
            break;
        case "right":
            deg = 0;
            break;
        case "up":
            deg = 270;
            break;
        case "down":
            deg = 90;
            break;
    }
    div.style.transform = `rotate(${deg}deg)`;
    content.snakeWrap.appendChild(div);
    return div;
}

// 更新仓库的值
function repository() {
    // 初始化仓库值
    for (var i = 0; i < dom.defaultV.tr; i++) {
        for (var j = 0; j < dom.defaultV.tc; j++) {
            dom.repository.push([i, j]);
        }
    }

    for (var i = 0, len1 = dom.snakePos.length; i < len1; i++) {
        for (var j = 0, len2 = dom.repository.length; j < len2; j++) {
            if (dom.snakePos[i][0] === dom.repository[j][0] && dom.snakePos[i][1] === dom.repository[j][1]) {
                dom.repository.splice(j, 1);
                i--;
                j--;
                break;
            }
        }
    }
}

// 随机函数,返回一个随机数
function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// 初始化游戏
function init() {
    // 添加一条蛇
    var head = addDiv(2, 0, "snakeHead");
    dom.snake.push(head);
    dom.snakePos.push([2, 0]);
    for (var i = 1; i >= 0; i--) {
        var body = addDiv(i, 0, "snakeBody");
        dom.snake.push(body);
        dom.snakePos.push([i, 0]);
    }
    // 添加食物
    function createFood() {
        repository();
        var rand = random(0, dom.repository.length);
        var x = dom.repository[rand][0], y = dom.repository[rand][1];
        dom.food = addDiv(x, y, "food");
        dom.foodPos = [x, y];
    }
    createFood();
}

// 开始游戏
content.startBtn.onclick = function () {
    content.mask.style.backgroundColor = "transparent";
    this.style.display = "none";
    init();

    dom.game = "start";
    dom.timer = setInterval(function () {
        snakemove(dom.snakeAspect);
    }, dom.duration);
}

/**
 * 蛇的移动
 * @param {string} aspect 可以填四个预设值："left","right","up","down"
 */
function snakemove(aspect) {
    var x = dom.snakePos[0][0],
        y = dom.snakePos[0][1];
    aspect === "left" ? x -= 1 : aspect === "right" ? x += 1 : aspect === "up" ? y -= 1 : y += 1;
    var over = game(x, y);
    if (over) {
        return;
    }
    //改变蛇头位置
    dom.snake[0].remove();
    dom.snake.shift();
    var head = addDiv(x, y, "snakeHead", aspect);
    var body = addDiv(dom.snakePos[0][0], dom.snakePos[0][1], "snakeBody");
    dom.snake.unshift(body);
    dom.snake.unshift(head);
    dom.snakePos.unshift([x, y]);

    // 判断目标点是不是食物
    if (x === dom.foodPos[0] && y === dom.foodPos[1]) {
        dom.score++;
        repository();
        var rand = random(0, dom.repository.length);
        var x = dom.repository[rand][0], y = dom.repository[rand][1];
        dom.food.style.left = x * dom.defaultV.w + "px";
        dom.food.style.top = y * dom.defaultV.h + "px";
        dom.foodPos = [x, y];
    }
    // 不是就移动
    else {
        var len = dom.snake.length - 1;
        dom.snake[len].remove();
        dom.snake.pop();
        dom.snakePos.pop();
    }


}

// 判断游戏是否结束
function game(x, y) {
    if (x > 29 || x < 0 || y > 29 || y < 0) {
        clearInterval(dom.timer);
        alert("你的得分为：" + dom.score);
        content.snakeWrap.innerHTML = "";
        content.startBtn.style.display = "block";
        dom = {
            defaultV: {
                tr: 30,
                tc: 30,
                w: 20,
                h: 20
            },
            snake: [],//储存蛇的dom元素
            snakePos: [],//储存蛇的当前坐标点
            food: null,//储存当前食物的dom元素
            foodPos: [],//储存当前食物的坐标点
            repository: [],//实物可以出现的剩余位置
            score: 0,//分数
            duration: 150,//每毫秒移动一次
            snakeAspect: "right",//默认向右移动
            timer: null,
            pause: false,
            game: "over"
        };
        return true;
    }
    for (var i = 0, len = dom.snakePos.length; i < len; i++) {
        if (x === dom.snakePos[i][0] && y === dom.snakePos[i][1]) {
            clearInterval(dom.timer);
            alert("你的得分为：" + dom.score);
            content.snakeWrap.innerHTML = "";
            content.startBtn.style.display = "block";
            dom = {
                defaultV: {
                    tr: 30,
                    tc: 30,
                    w: 20,
                    h: 20
                },
                snake: [],//储存蛇的dom元素
                snakePos: [],//储存蛇的当前坐标点
                food: null,//储存当前食物的dom元素
                foodPos: [],//储存当前食物的坐标点
                repository: [],//实物可以出现的剩余位置
                score: 0,//分数
                duration: 150,//每毫秒移动一次
                snakeAspect: "right",//默认向右移动
                timer: null,
                pause: false,
                game: "over"
            };
            return true;
        }
    }
    return false;
}

window.onkeydown = function (e) {
    if (!dom.pause) {
        if (e.code == "ArrowUp" && this.dom.snakeAspect != "up" || e.code == "ArrowDown" && this.dom.snakeAspect != "down" || e.code == "ArrowLeft" && this.dom.snakeAspect != "left" || e.code == "ArrowRight" && this.dom.snakeAspect != "right") {
            clearInterval(dom.timer);
            switch (e.code) {
                case "ArrowUp":
                    if (dom.snakeAspect !== "down") {
                        dom.snakeAspect = "up";
                    }
                    break;
                case "ArrowDown":
                    if (dom.snakeAspect !== "up") {
                        dom.snakeAspect = "down";
                    }
                    break;
                case "ArrowLeft":
                    if (dom.snakeAspect !== "right") {
                        dom.snakeAspect = "left";
                    }
                    break;
                case "ArrowRight":
                    if (dom.snakeAspect !== "left") {
                        dom.snakeAspect = "right";
                    }
                    break;
            }
            dom.timer = setInterval(function () {
                snakemove(dom.snakeAspect);
            }, dom.duration);
        }
    }

}

content.mask.onclick = function (e) {
    if (dom.game == "start" && e.target.tagName != "BUTTON") {
        dom.pause = true;
        if (dom.pause) {
            clearInterval(dom.timer);
            content.mask.style.backgroundColor = "rgba(0,0,0,.3)";
            content.pauseBtn.style.display = "block";
        }
        /* 
        else {
            if (dom.timer != null) {
                dom.timer = setInterval(function () {
                    snakemove(dom.snakeAspect);
                }, dom.duration);
            }

    }*/
    }
}

content.pauseBtn.onclick = function () {
    content.mask.style.backgroundColor = "transparent";
    content.pauseBtn.style.display = "none";
    dom.timer = setInterval(function () {
        snakemove(dom.snakeAspect);
    }, dom.duration);
    dom.pause = false;
}