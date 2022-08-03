import { blackAndWhite, drawBorders } from './image-data-manipulations';
import { prepareCanvas } from './utils';
import { CHAR_SIZE, getClosestValue, prepareCharWeight, sum } from './utils';

export const borderFilter = (img: HTMLImageElement, options: IProcessFilterOptions): void => {
  processFilter(img, drawBorders, options);
}

export const blackAndWhiteFilter = (img: HTMLImageElement, options: IProcessFilterOptions): void => {
  processFilter(img, blackAndWhite, options);
}

const processFilter = (img: HTMLImageElement, filter: TFilter, options: IProcessFilterOptions): void => {
  const { width = img.width, height = img.height, removeCanvas = false } = options;
  const canvas = prepareCanvas(options.canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const filterOptions: IFilterOptions = {
    height, width
  };

  filter(data, filterOptions);

  ctx.putImageData(imageData, 0, 0);

  if (removeCanvas) canvas.remove();
}

export function transformToText(img: HTMLImageElement, options: IProcessFilterOptions) {
  const { width = img.width, height = img.height } = options;
  const canvas = prepareCanvas(options.canvas);
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);

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

  const str = imageChunksWeight.reduce((str: string, arr: string[]) => {

    return str + arr.join('') + '\n\r'
  }, '');

  const div = document.createElement('div');
  div.className = 'image-text';
  div.innerText = str;
  document.body.append(div);
}
