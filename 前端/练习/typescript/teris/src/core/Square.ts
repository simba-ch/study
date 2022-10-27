import { IPoint } from "./types";

export default class Square {
  handlerMove?: Function;
  handlerRemove?: Function;
  handlerSetPoint?: Function;
  move=(point: IPoint)=> {
    this._point = point;
    if (!this.handlerMove) return;
    this.handlerMove(this._point);
  }

  remove=()=> {
    if (this.handlerRemove) this.handlerRemove();
  }

  constructor(private _point: IPoint) {}

  set point(p: IPoint) {
    this._point = p;
    if (this.handlerSetPoint) this.handlerSetPoint(this._point);
  }

  get point() {
    return this._point;
  }
}
