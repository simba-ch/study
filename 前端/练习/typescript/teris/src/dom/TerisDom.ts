import Square from "../core/Square";
import SquareDom from "./SquareDom";
import { squareSize } from "./dom.config";
import { IPoint, Shape } from "../core/types";
// import $ from "jquery";
import Teris from "../core/Teris";
import { createDom, setStyle } from "../core/utils";
export default class TerisDom {
  terisDom: SquareDom[];
  private _myContainer: HTMLElement = createDom();
  private _centerPoint: IPoint;
  private _shape: Shape;
  constructor(
    teris: Teris,
    private _color: string,
    container: HTMLElement,
    nextContainer: HTMLElement
  ) {
    this._centerPoint = teris.centerPoint;
    this._shape = teris.shape;
    let maxX: number = this._shape[0].x,
      minX: number = this._shape[0].x,
      maxY: number = this._shape[0].y,
      minY: number = this._shape[0].y;
    for (let i = 1; i < this._shape.length; i++) {
      if (maxX < this._shape[i].x) maxX = this._shape[i].x;
      if (minX > this._shape[i].x) minX = this._shape[i].x;
      if (maxY < this._shape[i].y) maxY = this._shape[i].y;
      if (minY > this._shape[i].y) minY = this._shape[i].y;
    }
    const width = maxX - minX + 1;
    const height = maxY - minY + 1;

    setStyle(this._myContainer, {
      width: `${width * squareSize.width}px`,
      height: `${height * squareSize.height}px`,
      position: "relative",
    });

    this.terisDom = teris.teris.map((square) => {
      const squareDom = new SquareDom(
        square,
        this._color,
        container,
        nextContainer
      );
      const position = this.getPoint(square);

      setStyle(squareDom.nextDom, {
        position: "absolute",
        left: `${(position.x - minX) * squareSize.width}px`,
        top: `${(position.y - minY) * squareSize.height}px`,
      });

      this._myContainer.append(squareDom.nextDom);

      return squareDom;
    });
    nextContainer.append(this._myContainer);
  }

  showDom = () => {
    this.terisDom.forEach((dom) => dom.show());
    this._myContainer.remove();
  };

  removeNextDom = () => {
    this._myContainer.remove();
  }

 

  private getPoint(square: Square) {
    return {
      x: square.point.x - this._centerPoint.x,
      y: square.point.y - this._centerPoint.y,
    };
  }
}
