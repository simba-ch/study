export interface IPoint {
  x: number;
  y: number;
}

export type Shape = IPoint[];

export interface INextDom {
  left: number;
  top: number;
}

export enum gameStatus {
  init,
  playing,
  pause,
  over,
}

export interface ISize{
  width:number,
  height:number
}