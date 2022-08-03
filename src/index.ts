import './index.d';
import lenna from '../assets/Lenna.png';
import { transformToText } from './filters';
import { roundLow } from './utils';

const img = new Image();
img.crossOrigin = 'anonymous';
img.src = lenna;

img.onload = () => transformToText(img, {
  width: roundLow(img.width / 3),
  height: roundLow(img.height / 3),
});
