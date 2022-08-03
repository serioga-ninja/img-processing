export const blackAndWhite = (data: Uint8ClampedArray) => {
  const BLACK_LIMIT = 128;
  for (let i = 0; i < data.length; i += 4) {
    const av = (data[i] + data[i + 1] + data[i + 2]) / 3;
    let res = Math.min(av + BLACK_LIMIT, 255);

    res = res === 255 ? 255 : 0;

    data[i] = res;
    data[i + 1] = res;
    data[i + 2] = res;
  }
}
