import Game from "../core/Game";
import { nextSize, panelSize } from "../core/game.config";
import { gameStatus, ISize } from "../core/types";
import { squareColors, squareSize } from "./dom.config";
import { getRandom, setStyle } from "../core/utils";
import $ from "jquery";
import TerisDom from "./TerisDom";
// 初始化页面
const container = document.getElementById("panel");
const nextContainer = document.getElementById("next");
initPage();
function initPage() {
  const panelDomSize: ISize = {
    width: panelSize.width * squareSize.width,
    height: panelSize.height * squareSize.height,
  };
  const nextDomSize: ISize = {
    width: nextSize.width * squareSize.width,
    height: nextSize.height * squareSize.height,
  };
  setSize(container!, panelDomSize);
  setSize(nextContainer!, nextDomSize);
}
function setSize(el: HTMLElement, size: ISize) {
  setStyle(el, {
    width: `${size.width}px`,
    height: `${size.height}px`,
  });
}

// 测试代码
const game = new Game();
(window as any).game = game;
//=======分割线========
let curDom = new TerisDom(
  game.currentTeris,
  squareColors[getRandom(squareColors.length)],
  container!,
  nextContainer!
);
let nextDom = new TerisDom(
  game.nextTeris,
  squareColors[getRandom(squareColors.length)],
  container!,
  nextContainer!
);
(window as any).curDom = curDom;
(window as any).nextDom = nextDom;
const msg = $("#msg");
const text = $('#msg p');
// 初始化游戏
init();
function init() {
  curDom.showDom();
  const score = $("#score").text(game.score);
  game.handlerSwitch = () => {
    curDom = nextDom;
    curDom.showDom();
    nextDom = new TerisDom(
      game.nextTeris,
      squareColors[getRandom(squareColors.length)],
      container!,
      nextContainer!
    );
  };
  game.handlerChangeScore = (newScore: number) => {
    score.text(newScore);
  };
  game.handlerOver = () => {
    msg.css({
      display:'flex'
    })
    text.text('游戏结束')
  }
  game.handlerStart = () => {
    nextDom.removeNextDom();
    nextDom = new TerisDom(
      game.nextTeris,
      squareColors[getRandom(squareColors.length)],
      container!,
      nextContainer!
    )
  }
}

// 注册键盘事件
document.onkeydown = function (e) {
  if (e.keyCode === 32) {
    if (game.gameStatus === gameStatus.playing) {
      game.pause();
      msg.css({
        display: "flex",
      });
      text.text("游戏暂停");
    } else if (game.gameStatus === gameStatus.pause) {
      game.playing();
      msg.css({
        display: "none",
      });
    } else if (game.gameStatus === gameStatus.over) {
      game.init();
      msg.css({
        display: "none",
      });
    }
  }
  if (game.gameStatus !== gameStatus.playing) return;
  if (e.keyCode === 38) {
    game.rotate();
  } else if (e.keyCode === 40) {
    game.immediatelyDown();
  } else if (e.keyCode === 37) {
    game.leftMove();
  } else if (e.keyCode === 39) {
    game.rightMove();
  }
};
