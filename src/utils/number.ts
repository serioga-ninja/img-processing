export const roundLow = (n: number): number => {
  return Math.abs(Math.round(n - 0.5));
}

export const sum = (...arr: number[]): number => {
  return arr.reduce((a, b) => a + b, 0);
}
