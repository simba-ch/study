import Square from "../core/square";
import { IPoint } from "../core/types";
import { squareSize } from "./dom.config";
import { createDom, setStyle } from "../core/utils";

export default class SquareDom {
  private _point: IPoint;
  private _width: number = squareSize.width;
  private _height: number = squareSize.height;
  private _dom: HTMLElement;
  nextDom: HTMLElement;
  constructor(
    square: Square,
    private _color: string,
    private _container: HTMLElement,
    private _nextContainer: HTMLElement
  ) {
    this._point = {
      x: square.point.x,
      y: square.point.y,
    };
    square.handlerMove = (targetPoint: IPoint) => {
      if (targetPoint.x === this._point.x) {
        this.downMove(targetPoint);
      } else {
        this.horizontalMove(targetPoint);
      }
    };
    square.handlerRemove = this.remove;
    square.handlerSetPoint = this.setPoint;
    /**
     * 创建一个dom元素，在游戏面板
     */
    this._dom = createDom({
      width: `${this._width}px`,
      height: `${this._height}px`,
      background: this._color,
      position: "absolute",
      border: "1px solid #ccc",
      boxSizing: "border-box",
      left: `${this._point.x * this._width}px`,
      top: `${this._point.y * this._height}px`,
      display: "none",
      // transition:`top ${this._duration}ms `
    });
    this._container.append(this._dom);

    // $("<div>")
    //   .css({
    //     width: this._width,
    //     height: this._height,
    //     background: this._color,
    //     position: "absolute",
    //     border: "1px solid #ccc",
    //     boxSizing: "border-box",
    //     left: this._point.x * this._width,
    //     top: this._point.y * this._height,
    //     display: "none",
    //   })
    // .appendTo(this._container);

    /**
     * 创建一个dom元素在显示面板
     */

    this.nextDom = createDom({
      width: `${this._width}px`,
      height: `${this._height}px`,
      background: this._color,
      position: "absolute",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    });
    this._nextContainer.append(this.nextDom);
    // $("<div>")
    //   .css({
    //     width: this._width,
    //     height: this._height,
    //     background: this._color,
    //     position: "absolute",
    //     border: "1px solid #ccc",
    //     boxSizing: "border-box",
    //   })
    // .appendTo(this._nextContainer);
  }

  show = () => {
    this._dom.style.display = "block";
  };

  horizontalMove = (targetPoint: IPoint) => {
    this._point = targetPoint;
    setStyle(this._dom, {
      left: `${this._point.x * squareSize.width}px`,
    });
  };

  downMove = (targetPoint: IPoint) => {
    this._point = targetPoint;
    setStyle(this._dom, {
      top: `${this._point.y * squareSize.height}px`,
    });
  };

  remove = () => {
    this._dom.remove();
  };

  setPoint = (p: IPoint) => {
    this._point = p;
    // setStyle(this._dom,{
    //   transition:''
    // })
    setStyle(this._dom, {
      left: `${this._point.x * this._width}px`,
      top: `${this._point.y * this._height}px`,
    });
  };
}
