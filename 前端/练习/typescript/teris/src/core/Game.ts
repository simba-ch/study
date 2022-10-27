import { levels, panelSize } from "./game.config";
import Square from "./Square";
import Teris from "./Teris";
import { gameStatus, IPoint, Shape } from "./types";
import { getRandom } from "./utils";
import Shapes from "./Shapes";
export default class Game {
  private _squares!: Square[][];
  private _gameStatus: gameStatus = gameStatus.init;
  private _timer: any;
  private _duration!: number;
  private _score!: number;
  currentTeris!: Teris;
  nextTeris!: Teris;
  handlerSwitch?: Function;
  handlerChangeDuration?: Function;
  handlerChangeScore?: Function;
  handlerOver?: Function;
  handlerStart?: Function;
  constructor() {
    // 初始化pannel
    this.init();
  }

  init = () => {
    if (
      this._gameStatus !== gameStatus.init &&
      this._gameStatus !== gameStatus.over
    )
      return;
    if (this._gameStatus === gameStatus.over) {
      for (let i = 0; i < this._squares.length; i++) {
        this._clear(i);
      }
    }
    // 还原数据
    clearInterval(this._timer);
    this.initPannel();
    this._gameStatus = gameStatus.playing;
    this._timer = undefined;
    this._duration = levels[0].duration;
    this._score = 0;
    this.nextTeris = this.getSquareGroup();
    if (this.handlerStart) this.handlerStart();
    this.switch();
    this.autoDrop();
  };

  private autoDrop() {
    clearInterval(this._timer);
    if (this._gameStatus === gameStatus.over) return;
    this._timer = setInterval(() => {
      const point = {
        x: this.currentTeris.centerPoint.x,
        y: this.currentTeris.centerPoint.y + 1,
      };

      if (!this._canIMove(this.currentTeris.shape, point)) {
        clearInterval(this._timer);
        this.hitBottom();
        return;
      }

      this.currentTeris.downMove();
    }, this._duration);
  }

  private getSquareGroup() {
    const Teris = Shapes[getRandom(Shapes.length)];
    const panelCenter = Math.floor(panelSize.width / 2);
    const shape = Teris.shape;
    let maxX = shape[0].x,
      minX = shape[0].x,
      minY = shape[0].y;
    for (let i = 1; i < shape.length; i++) {
      const p = shape[i];
      if (maxX < p.x) maxX = p.x;
      if (minX > p.x) minX = p.x;
      if (minY > p.y) minY = p.y;
    }

    const terisCenter = Math.floor((maxX + minX) / 2);
    return new Teris({
      x: panelCenter - terisCenter,
      y: -minY,
    });
  }

  private _canIMove(shape: Shape, targetPoint: IPoint) {
    const nextTeris = shape.map((point) => {
      return {
        x: point.x + targetPoint.x,
        y: point.y + targetPoint.y,
      };
    });
    return !nextTeris.some((point) => {
      return (
        point.x < 0 ||
        point.y < 0 ||
        point.x >= panelSize.width ||
        point.y >= panelSize.height ||
        this._squares[point.y][point.x] !== undefined
      );
    });
  }

  switch = () => {
    //判断游戏是否结束
    if (!this._canIMove(this.nextTeris.shape, this.nextTeris.centerPoint)) {
      this._gameStatus = gameStatus.over;
      if (this.handlerOver) this.handlerOver();
      return;
    }
    this.currentTeris = this.nextTeris;
    this.nextTeris = this.getSquareGroup();
    if (this.handlerSwitch) this.handlerSwitch();
  };

  downMove = () => {
    const targetPoint = {
      x: this.currentTeris.centerPoint.x,
      y: this.currentTeris.centerPoint.y + 1,
    };
    if (this._canIMove(this.currentTeris.shape, targetPoint))
      this.currentTeris.downMove();
  };

  leftMove = () => {
    const targetPoint = {
      x: this.currentTeris.centerPoint.x - 1,
      y: this.currentTeris.centerPoint.y,
    };
    if (this._canIMove(this.currentTeris.shape, targetPoint))
      this.currentTeris.leftMove();
  };

  rightMove = () => {
    const targetPoint = {
      x: this.currentTeris.centerPoint.x + 1,
      y: this.currentTeris.centerPoint.y,
    };
    if (this._canIMove(this.currentTeris.shape, targetPoint))
      this.currentTeris.rightMove();
  };

  immediatelyDown = () => {
    const squareGroup = this.currentTeris;
    while (
      this._canIMove(squareGroup.shape, {
        x: squareGroup.centerPoint.x,
        y: squareGroup.centerPoint.y + 1,
      })
    ) {
      squareGroup.downMove();
    }
    this.hitBottom();
  };

  rotate = () => {
    const shape = this.currentTeris.changeShape();
    if (this._canIMove(shape, this.currentTeris.centerPoint))
      this.currentTeris.rotate();
  };

  hitBottom() {
    this.addSquare();
    this.switch();
    this.autoDrop();
  }

  private addSquare() {
    let cols: number[] = [];
    this.currentTeris.teris.forEach((square) => {
      this._squares[square.point.y][square.point.x] = square;
      cols.push(square.point.y);
    });
    this._remove(cols);
  }

  private _remove(cols: number[]) {
    let count: number = 0;
    cols = [...new Set(cols)];
    // cols = this._unique(cols);
    cols.sort((a, b) => a - b);
    for (let i = 0; i < cols.length; i++) {
      const col = cols[i];
      if (this._canIRemove(col)) {
        count++;
        this._clear(col);
        this._drop(col);
        this._squares.splice(col, 1);
        this._squares.unshift(this._createCol());
      }
    }
    if (count === 0) return;
    this._countScore(count);
  }

  private _createCol() {
    return new Array(panelSize.width).fill(undefined);
  }

  private _unique(arr: number[]) {
    let obj: any = {};
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      obj[element] = i;
    }
    let uniqueStr: string[] = Object.keys(obj);
    return uniqueStr.map((str) => Number(str));
  }

  private _drop(col: number) {
    for (let i = col - 1; i >= 0; i--) {
      const element = this._squares[i];
      for (let j = 0; j < element.length; j++) {
        const square = element[j];
        if (square) {
          square.move({
            x: square.point.x,
            y: square.point.y + 1,
          });
        }
      }
    }
  }

  private _clear(col: number) {
    for (let i = 0; i < this._squares[col].length; i++) {
      const square = this._squares[col][i];
      if (square) square.remove();
    }
  }

  private _canIRemove(col: number) {
    return !this._squares[col].some((square) => square === undefined);
  }

  pause() {
    if (this._gameStatus === gameStatus.playing)
      this._gameStatus = gameStatus.pause;
    clearInterval(this._timer);
  }

  playing() {
    if (this._gameStatus === gameStatus.pause)
      this._gameStatus = gameStatus.playing;
    this.autoDrop();
  }

  private _countScore(count: number) {
    const score = (3 * count - 1) * 5;
    this._changeScore(score);
  }

  private _changeScore(score: number) {
    this._score += score;
    if (this.handlerChangeScore) this.handlerChangeScore(this._score);
    this._changeDuration(this.score);
  }

  get score() {
    return this._score;
  }
  get duration() {
    return this._duration;
  }

  get gameStatus() {
    return this._gameStatus;
  }

  private _changeDuration(socre: number) {
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      if (level.score > socre) {
        this._duration = levels[i - 1].duration;
        if (this.handlerChangeDuration)
          this.handlerChangeDuration(this._duration);
        return;
      }
    }
  }

  private initPannel() {
    this._squares = new Array(panelSize.height);
    for (let i = 0; i < panelSize.height; i++) {
      this._squares[i] = this._createCol();
    }
  }
}
