import { RgbColor } from "react-colorful";

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

export const getStringRGBColor = ({ r, g, b }: RgbColor): string =>
  `rgb(${r}, ${g}, ${b})`;
