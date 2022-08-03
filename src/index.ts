import './index.d';
import lenna from '../assets/Lenna.png';
import { borderFilter } from './filters';
import { roundLow } from './utils/number';

const img = new Image();
img.crossOrigin = 'anonymous';
img.src = lenna;

img.onload = () => borderFilter(img, {
  width: roundLow(img.width / 3),
  height: roundLow(img.height / 3),
});

