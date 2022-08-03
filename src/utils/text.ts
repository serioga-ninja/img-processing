import 'url:../../assets/FontsFree-Net-SLC_.ttf';
import '../../assets/index.scss';
import { prepareCanvas } from './canvas';
import { imageDataToPixelMatrix, isWhitePixel } from './pixel';

export const CHAR_SIZE = 10;
const CHAR_CODE_START = 32;
const CHAR_CODE_END = 126;

export function getClosestValue(v: number, res: Record<string, number>): string {
  return Object
    .entries(res)
    .reduce((obj, [resCh, resValue]) => {
      const closest = Math.abs(v - resValue);

      if (closest < obj.closest) {
        obj.closest = closest;
        obj.ch = resCh;
        obj.value = resValue;
      }

      return obj;
    }, {
      ch: '',
      value: Number.MAX_SAFE_INTEGER,
      closest: Number.MAX_SAFE_INTEGER,
    })
    .ch;
}

export const prepareCharWeight = () => {
  const canvas = prepareCanvas();
  const ctx = canvas.getContext('2d');

  canvas.width = CHAR_SIZE;
  canvas.height = CHAR_SIZE;

  ctx.font = `${CHAR_SIZE + 4}px Courier`;

  const res: Record<string, number> = {};

  for (let i = CHAR_CODE_START; i < CHAR_CODE_END + 1; i++) {
    const ch = String.fromCharCode(i);

    res[ch] = calculateCharWeight(ch, canvas);
  }

  canvas.remove();

  return res;
}

export function calculateCharWeight(ch: string, canvas: HTMLCanvasElement = prepareCanvas()): number {
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CHAR_SIZE, CHAR_SIZE);

  ctx.fillStyle = 'black';
  ctx.strokeText(ch, 5, CHAR_SIZE);

  const imageData = ctx.getImageData(0, 0, CHAR_SIZE, CHAR_SIZE);
  const matrix = imageDataToPixelMatrix(imageData.data, CHAR_SIZE, CHAR_SIZE);

  return matrix
    .reduce((result, arr) => {
      result.push(...arr);

      return result;
    }, [])
    .filter(pixel => !isWhitePixel(pixel))
    .length;
}
