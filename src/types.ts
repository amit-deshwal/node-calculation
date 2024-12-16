export interface FunctionNode {
  id: number;
  equation: string;
  nextFunction: number | null;
  position: {
    x: number;
    y: number;
  };
}

export interface Connection {
  from: number;
  to: number;
}

export interface Point {
  x: number;
  y: number;
}
