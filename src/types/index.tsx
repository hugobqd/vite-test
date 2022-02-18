import type { RgbColor } from "react-colorful";

console.log("🔥 types");

export type { RgbColor };

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
