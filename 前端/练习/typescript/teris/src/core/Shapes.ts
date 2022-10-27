import Teris from "./Teris";
import { IPoint } from "./types";

const shapeConfig = {
  TShape: [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
  ],
  LShape: [
    { x: -2, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: -1 },
  ],
  LMirrorShape: [
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: -1 },
  ],
  SShape: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
  ],
  SMirrorShape: [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  SquareShape: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  LineShape: [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
};

class TShape extends Teris {
  constructor(centerPoint: IPoint) {
    super(shapeConfig.TShape, centerPoint);
  }
  static shape = shapeConfig.TShape;
}

class LShape extends Teris {
  constructor(centerPoint: IPoint) {
    super(shapeConfig.LShape, centerPoint);
  }
  static shape = shapeConfig.LShape;
}

class LMirrorShape extends Teris {
  constructor(centerPoint: IPoint) {
    super(shapeConfig.LMirrorShape, centerPoint);
  }
  static shape = shapeConfig.LMirrorShape;
}

class SShape extends Teris {
  constructor(centerPoint: IPoint) {
    super(shapeConfig.SShape, centerPoint);
  }
  rotate(): void {
    super.rotate();
    this._clock = !this._clock;
  }
  static shape = shapeConfig.SShape;
}

class SMirrorShape extends Teris {
  constructor(centerPoint: IPoint) {
    super(shapeConfig.SMirrorShape, centerPoint);
  }
  rotate(): void {
    super.rotate();
    this._clock = !this._clock;
  }
  static shape = shapeConfig.SMirrorShape;
}

class SquareShape extends Teris {
  constructor(centerPoint: IPoint) {
    super(shapeConfig.SquareShape, centerPoint);
  }
  rotate(): void {
    return;
  }
  static shape = shapeConfig.SquareShape;
}

class LineShape extends Teris {
  constructor(centerPoint: IPoint) {
    super(shapeConfig.LineShape, centerPoint);
  }
  rotate(): void {
    super.rotate();
    this._clock = !this._clock;
  }
  static shape = shapeConfig.LineShape;
}

export default [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape,
];
