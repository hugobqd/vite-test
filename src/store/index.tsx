import { atomWithStorage } from "jotai/utils";
import type { RgbColor } from "../types";

export const mainColorAtom = atomWithStorage<RgbColor>("maincolor", {
  r: 0,
  g: 255,
  b: 124,
});

export const settingsAtom = atomWithStorage("settings", { results: 4 });
