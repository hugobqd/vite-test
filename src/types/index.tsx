import type { RgbColor } from "react-colorful";

export type { RgbColor };

export type ColorLAB = {
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
  LAB: ColorLAB;
  brightness: number;
}

export interface Lib {
  name: string;
  slug: string;
  website: string;
  colors: Shade[];
}
