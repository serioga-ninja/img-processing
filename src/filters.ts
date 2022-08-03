import { blackAndWhite, drawBorders } from './image-data-manipulations';

export const borderFilter = (img: HTMLImageElement, options: IProcessFilterOptions): void => {
  processFilter(img, drawBorders, options);
}

export const blackAndWhiteFilter = (img: HTMLImageElement, options: IProcessFilterOptions): void => {
  processFilter(img, blackAndWhite, options);
}

const prepareCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  if (canvas) return canvas;

  canvas = document.createElement('canvas');

  document.body.append(canvas);

  return canvas;
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
