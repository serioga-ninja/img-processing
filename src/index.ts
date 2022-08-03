import './index.d';
import lenna from '../assets/Lenna.png';
import { blackAndWhite } from './filters';
import {
  imageDataToPixelMatrix,
  isBlackBorderPixel, isBlackPixel,
  pixelMatrixToData,
  roundLow,
  toLinePixel,
  toWhitePixel
} from './utils';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.append(canvas);

const img = new Image();
img.crossOrigin = 'anonymous';
img.src = lenna;

img.onload = () => draw(img);

function draw(img: HTMLImageElement) {
  const w = roundLow(img.width / 3);
  const h = roundLow(img.height / 3);
  canvas.width = w;
  canvas.height = h;

  ctx.drawImage(img, 0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  blackAndWhite(data);

  const matrix = imageDataToPixelMatrix(data, w, h);

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

  ctx.putImageData(imageData, 0, 0);
}





