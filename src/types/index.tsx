import type { RgbColor } from "react-colorful";
// { RgbColor, RgbaColor, HslColor, HslaColor, HsvColor, HsvaColor }

console.log("🔥 types");

export type { RgbColor };

export interface Picker {
  candidate: RgbColor;
  inputValue: string;
  inputValid: boolean;
  format: string;
}

export type LABColor = {
  L: number;
  A: number;
  B: number;
};

export interface Shade {
  id: string;
  lib: string;
  name: string;
  hex: string;
  rgb: RgbColor;
  LAB: LABColor;
  brightness: number;
}

export interface ShadeDistance extends Shade {
  distance: number;
}

export interface Lib {
  name: string;
  slug: string;
  website: string;
  colors: Shade[];
}
