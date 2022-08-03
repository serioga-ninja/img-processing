import './index.d';
import lenna from '../assets/Lenna.png';
import { borderFilter } from './filters';
import {
  roundLow
} from './utils';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.append(canvas);

const img = new Image();
img.crossOrigin = 'anonymous';
img.src = lenna;

img.onload = () => borderFilter(img, {
  canvas,
  width: roundLow(img.width / 3),
  height: roundLow(img.height / 3),
});

