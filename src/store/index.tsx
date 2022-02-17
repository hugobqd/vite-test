import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { RgbColor, Shade } from "../types";

export const mainColorAtom = atomWithStorage<RgbColor>("maincolor", {
  r: 0,
  g: 255,
  b: 124,
});

export const settingsAtom = atomWithStorage("settings", { results: 4 });

export const listAtom = atomWithStorage<string[]>("list", ["css"]);

export const shadesAtom = atom<Shade[]>([]);
