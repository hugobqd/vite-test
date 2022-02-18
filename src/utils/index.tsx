import { RgbColor } from "react-colorful";
import { LABColor } from "../types";

console.log("🔥 utils");

export const getRandomColor = (): RgbColor => {
  const colors = [
    { r: 209, g: 97, b: 28 }, // orange
    { r: 34, g: 91, b: 161 }, // blue
    { r: 225, g: 17, b: 135 }, // purple
    { r: 21, g: 139, b: 59 }, // green
    { r: 189, g: 60, b: 60 }, // salmon
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// See http://www.w3.org/TR/AERT#color-contrast
export const getBrightness = ({ r, g, b }: RgbColor): number =>
  (r * 299 + g * 587 + b * 114) / 1000;

export const getStringRgbColor = ({ r, g, b }: RgbColor): string =>
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
