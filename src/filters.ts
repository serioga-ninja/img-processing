import { blackAndWhite, drawBorders, toText } from './image-data-manipulations';
import { prepareCanvas } from './utils';
import { CHAR_SIZE, getClosestValue, prepareCharWeight, sum } from './utils';

export const borderFilter = (img: HTMLImageElement, options: IProcessFilterOptions): void => {
  processFilter(img, drawBorders, options);
}

export const blackAndWhiteFilter = (img: HTMLImageElement, options: IProcessFilterOptions): void => {
  processFilter(img, blackAndWhite, options);
}

export function transformToText(img: HTMLImageElement, options: IProcessFilterOptions) {
  processFilter(img, toText, options);
}

const processFilter = (img: HTMLImageElement, filter: TFilter, options: IProcessFilterOptions): void => {
  const { width = img.width, height = img.height, removeCanvas = false } = options;
  const canvas = prepareCanvas(options.canvas);
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);

  const filterOptions: IFilterOptions = {
    height, width
  };

  const imageData = filter(ctx, filterOptions);

  ctx.putImageData(imageData, 0, 0);

  if (removeCanvas) canvas.remove();
}
