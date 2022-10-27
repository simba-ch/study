var gameConfig = {
    width: 500,
    height: 500,
    rows: 4,
    cols: 4,
    container: document.getElementById('demo'),
    containerInit: function () {
        this.container.style.border = '2px solid #ccc';
        this.container.style.width = gameConfig.width + 'px';
        this.container.style.height = gameConfig.height + 'px';
        this.container.style.position = 'relative';
    },
    piece: {
        backgroundURL: 'img/lol.png'
    },
    pieces: [],
    addPiece: function () {
        var w = this.piece.width;
        var h = this.piece.height;
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.pieces.push({
                    correctleft: j * w,
                    correctTop: i * h
                });
            }
        }
    }

}
gameConfig.piece.width = gameConfig.width / gameConfig.cols;
gameConfig.piece.height = gameConfig.height / gameConfig.rows;

gameConfig.containerInit();
gameConfig.addPiece();

gameConfig.pieces.forEach(function (a) {
    var div = document.createElement('div');

    div.style.left = a.correctleft + 'px';
    div.style.top = a.correctTop + 'px';
    div.style.position = 'absolute';
    div.style.width = gameConfig.piece.width + 'px';
    div.style.height = gameConfig.piece.height + 'px';
    div.style.background = `url(${gameConfig.piece.backgroundURL}) -${a.correctleft}px -${a.correctTop}px`;
    div.style.border = '1px solid #fff';
    div.style.boxSizing = 'border-box';
    gameConfig.container.appendChild(div);
});

// 设置最后一个元素不可见
var arrPieces = document.getElementsByTagName('div'),
    invisible = arrPieces[gameConfig.pieces.length];
invisible.setAttribute('visible', 'false');
invisible.style.display = 'none';

// 洗牌
function shuffle() {
    for (var i = 1, len = arrPieces.length - 2; i <= len; i++) {
        var random = Math.round(1 + Math.random() * (len - 1));
        var temp = arrPieces[random].style.left;
        arrPieces[random].style.left = arrPieces[i].style.left;
        arrPieces[i].style.left = temp;
        temp = arrPieces[random].style.top;
        arrPieces[random].style.top = arrPieces[i].style.top;
        arrPieces[i].style.top = temp;
    }
}
shuffle();

// 注册点击事件
function equal(a, b) {
    return Math.abs(parseInt(a) - parseInt(b)) <= 1;
}

for (var i = 1, len = arrPieces.length - 2; i <= len; i++) {
    arrPieces[i].onclick = function (e) {
        var blank = document.querySelector('[visible = false]'),
            b = blank.style,
            tag = e.target.style;
        if (equal(tag.left, b.left) && equal(Math.abs(parseInt(tag.top) - parseInt(b.top)), gameConfig.piece.height)
            ||
            equal(tag.top, b.top) && equal(Math.abs(parseInt(tag.left) - parseInt(b.left)), gameConfig.piece.width)
        ) {
        var temp = b.left;
        b.left = tag.left;
        tag.left = temp;
        temp = b.top;
        b.top = tag.top;
        tag.top = temp;
        }
        // 判断是否结束
        var correct = 0;
        for (var j = 1, length = gameConfig.rows*gameConfig.cols; j <= length; j++) {
            if (!((parseInt(arrPieces[j].style.left) === parseInt(gameConfig.pieces[j - 1].correctleft)) && (parseInt(arrPieces[j].style.top) === parseInt(gameConfig.pieces[j - 1].correctTop)))) {
                correct = 0;
                break;
            }
            correct++;
            if (correct === length) {
                blank.style.display = 'block';
                for (var i = 1, len = arrPieces.length - 1; i <= len; i++) {
                    arrPieces[i].style.border = '';
                    arrPieces[i].onclick = null;
                }
            }

        }
    }
}