import { CHAR_SIZE, getClosestValue, prepareCharWeight, sum } from './utils/index';
import {
  imageDataToPixelMatrix,
  isBlackBorderPixel,
  isBlackPixel,
  pixelMatrixToData,
  toLinePixel,
  toWhitePixel
} from './utils/pixel';

export const blackAndWhite = (ctx: CanvasRenderingContext2D, options: IFilterOptions) => {
  const { width: w, height: h } = options;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  const BLACK_LIMIT = 128;
  for (let i = 0; i < data.length; i += 4) {
    const av = (data[i] + data[i + 1] + data[i + 2]) / 3;
    let res = Math.min(av + BLACK_LIMIT, 255);

    res = res === 255 ? 255 : 0;

    data[i] = res;
    data[i + 1] = res;
    data[i + 2] = res;
  }

  return imageData;
}

export const drawBorders = (ctx: CanvasRenderingContext2D, options: IFilterOptions): ImageData => {
  const { width: w, height: h } = options;
  const imageData = ctx.getImageData(0, 0, w, h);

  blackAndWhite(ctx, options);

  const matrix = imageDataToPixelMatrix(imageData.data, w, h);

  for (const row of matrix) {
    for (const pixel of row) {
      if (isBlackBorderPixel(pixel, matrix)) {
        toLinePixel(pixel);
      }
    }
  }

  for (const row of matrix) {
    for (const pixel of row) {
      if (isBlackPixel(pixel)) {
        toWhitePixel(pixel);
      }
    }
  }

  pixelMatrixToData(matrix, imageData.data);

  return imageData;
}


export function toText(ctx: CanvasRenderingContext2D, options: IFilterOptions): ImageData {
  const { width, height } = options;
  const res = prepareCharWeight();

  const imageChunksWeight: string[][] = Array(Math.ceil(height / CHAR_SIZE));
  let x = 0, y = 0;
  while (y < height) {
    const chunkI = y / CHAR_SIZE;
    imageChunksWeight[chunkI] = Array(Math.ceil(width / CHAR_SIZE));

    while (x < width) {
      const imageData = ctx.getImageData(x, y, CHAR_SIZE, CHAR_SIZE);
      const avg = 255 - sum(...imageData.data) / imageData.data.length;
      const percent = avg / (255 / 100);

      imageChunksWeight[chunkI][x / CHAR_SIZE] = getClosestValue(percent, res);

      x += CHAR_SIZE;
    }

    x = 0;
    y += CHAR_SIZE;
  }

  console.log(
    imageChunksWeight.reduce((str: string, arr: string[]) => {

      return str + arr.join('') + '\n\r'
    }, '')
  );

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = 'black';

  for (const [y, row] of imageChunksWeight.entries()) {
    for (const [x, ch] of row.entries()) {
      ctx.strokeText(ch, x * CHAR_SIZE, y * CHAR_SIZE);
    }
  }

  return ctx.getImageData(0, 0, width, height);
}
