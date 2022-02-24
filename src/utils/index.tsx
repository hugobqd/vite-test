import { LABColor, RgbColor } from "../types";

console.log("🔥 utils");

// See http://www.w3.org/TR/AERT#color-contrast
export const getBrightness = ({ r, g, b }: RgbColor): number =>
  (r * 299 + g * 587 + b * 114) / 1000;

export const getRgbString = ({ r, g, b }: RgbColor): string =>
  `rgb(${r}, ${g}, ${b})`;

// https://github.com/antimatter15/rgb-lab
export const rgbToLab = ({ r: R, g: G, b: B }: RgbColor): LABColor => {
  let r = R / 255;
  let g = G / 255;
  let b = B / 255;
  let x: number;
  let y: number;
  let z: number;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  return {
    L: 116 * y - 16,
    A: 500 * (x - y),
    B: 200 * (y - z),
  };
};
