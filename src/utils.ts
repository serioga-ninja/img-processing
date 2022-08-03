export const roundLow = (n: number): number => {
  return Math.abs(Math.round(n - 0.5));
}

// [x, y]
const coords = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0], [1, 0],
  [-1, 1], [0, 1], [1, 1],
];

export const isBlackBorderPixel = (pixel: IPixel, matrix: IPixel[][]): boolean => {
  if (!isBlackPixel(pixel)) return false;

  for (const c of coords) {
    const [coordX, coordY] = c;
    const x = pixel.x + coordX;
    const y = pixel.y + coordY;

    if (y < 0 || y >= matrix.length) continue;

    const _pixel = matrix[y][x];
    if (_pixel && isWhitePixel(_pixel)) {
      return true;
    }
  }

  return false;
}

export const isBlackPixel = (pixel: IPixel): boolean => {
  const { red, green, blue } = pixel;

  return red === 0 && green === 0 && blue === 0;
}

export const isWhitePixel = (pixel: IPixel): boolean => {
  const { red, green, blue } = pixel;

  return red === 255 && green === 255 && blue === 255;
}

export const isLinePixel = (pixel: IPixel): boolean => {
  const { red, green, blue } = pixel;

  return red === 255 && green === 0 && blue === 0;
}

export const toLinePixel = (pixel: IPixel): IPixel => {
  pixel.red = 255;
  pixel.green = 0;
  pixel.blue = 0;

  return pixel;
}

export const toWhitePixel = (pixel: IPixel): IPixel => {
  pixel.red = 255;
  pixel.green = 255;
  pixel.blue = 255;

  return pixel;
}

export const imageDataToPixelMatrix = (data: Uint8ClampedArray, w: number, h: number): IPixel[][] => {
  const imageMatrix: IPixel[][] = [];

  for (let i = 0; i < data.length; i += 4) {
    const mxI = roundLow(i / 4 / w);
    const mxJ = i / 4 % w;
    const pixel: IPixel = {
      red: data[i],
      green: data[i + 1],
      blue: data[i + 2],
      alpha: data[i + 3],
      x: mxJ,
      y: mxI
    }

    if (imageMatrix[mxI] === undefined) {
      imageMatrix.push(Array(h));
    }

    imageMatrix[mxI][mxJ] = pixel;
  }

  return imageMatrix;
}

export const pixelMatrixToData = (matrix: IPixel[][], data: Uint8ClampedArray): Uint8ClampedArray => {
  let i = 0;
  for (const row of matrix) {
    for (const item of row) {
      data[i] = item.red;
      data[i + 1] = item.green;
      data[i + 2] = item.blue;
      data[i + 3] = item.alpha;
      i += 4;
    }
  }

  return data;
}
