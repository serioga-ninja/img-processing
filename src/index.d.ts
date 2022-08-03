declare module '*.png' {
  const value: string;
  export default value;
}

interface IPixel {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  x: number;
  y: number;
}

interface IProcessFilterOptions {
  canvas?: HTMLCanvasElement;
  removeCanvas?: boolean;
  width?: number;
  height?: number;
}

interface IFilterOptions {
  width?: number;
  height?: number;
}

type TFilter = (data: Uint8ClampedArray, options?: IFilterOptions) => void;
