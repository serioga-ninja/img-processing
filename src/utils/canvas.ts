export const prepareCanvas = (canvas?: HTMLCanvasElement): HTMLCanvasElement => {
  if (canvas) return canvas;

  canvas = document.createElement('canvas');

  document.body.append(canvas);

  return canvas;
}
