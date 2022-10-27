import Square from "./Square";
import { IPoint, Shape } from "./types";

export default abstract class SquareGroup {
  protected _clock?: boolean = true;
  /**
   * _teris 实际的坐标位置
   */
  private _teris: Square[];
  handlerDownMove?: Function;
  handlerLeftMove?: Function;
  handlerRightMove?: Function;
  handlerReMove?: Function;
  handlerRotate?: Function;
  // handlerImmediatelyMove?: Function;
  /**
   *
   * @param _shape 当中心点为0，各点的相对位置
   * @param _centerPoint 在面板显示的中心点位置
   */
  constructor(protected _shape: Shape, private _centerPoint: IPoint) {
    this._teris = _shape.map((p) => {
      const point = {
        x: _centerPoint.x + p.x,
        y: _centerPoint.y + p.y,
      };
      return new Square(point);
    });
  }

  rotate = () => {
    this._shape = this.changeShape();
    this._teris.forEach(
      (square, i) =>
        (square.point = {
          x: this._shape[i].x + this._centerPoint.x,
          y: this._shape[i].y + this._centerPoint.y,
        })
    );
    if (this.handlerRotate) this.handlerRotate();
  };

  downMove = () => {
    this._centerPoint = {
      x: this._centerPoint.x,
      y: this._centerPoint.y + 1,
    };
    this._teris.forEach((square) => {
      square.move({
        x: square.point.x,
        y: square.point.y + 1,
      });
    });
    if (this.handlerDownMove) this.handlerDownMove(this._centerPoint);
  };

  leftMove = () => {
    this._centerPoint = {
      x: this._centerPoint.x - 1,
      y: this._centerPoint.y,
    };
    this._teris.forEach((square) => {
      const targetPoint = { x: square.point.x - 1, y: square.point.y };
      square.move(targetPoint);
    });
    if (this.handlerLeftMove) this.handlerLeftMove(this._centerPoint);
  };

  rightMove = () => {
    this._centerPoint = {
      x: this._centerPoint.x + 1,
      y: this._centerPoint.y,
    };
    this._teris.forEach((square) => {
      const targetPoint = { x: square.point.x + 1, y: square.point.y };
      square.move(targetPoint);
    });
    if (this.handlerRightMove) this.handlerRightMove(this._centerPoint);
  };

  // setPosition(targetPoint:IPoint){
  //   const shape = this._shape.map(point => ({
  //     x:point.x + targetPoint.x,
  //     y:point.y + targetPoint.y
  //   }))
  //   this._teris.forEach((square,i) => {
  //     square.point = shape[i]
  //   })
  // }
  // immediatelyMove(point: IPoint) {}
  remove = () => {
    this._teris.forEach((square) => square.remove());
    if (this.handlerReMove) this.handlerReMove();
  };
  get centerPoint() {
    return this._centerPoint;
  }

  get shape() {
    return this._shape;
  }

  // get clock() {
  //   return this._clock;
  // }

  get teris() {
    return this._teris;
  }

  changeShape = () => {
    const shape = this._shape.map((p) => ({ x: p.x, y: p.y }));
    if (this._clock) {
      shape.forEach((point, i) => {
        shape[i] = {
          x: -point.y,
          y: point.x,
        };
      });
    } else {
      shape.forEach((point, i) => {
        shape[i] = {
          x: point.y,
          y: -point.x,
        };
      });
    }
    return shape;
  };
}
