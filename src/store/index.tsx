import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import DeltaE from "delta-e";
import { LABColor, RgbColor, Shade, ShadeDistance } from "../types";
import { rgbToLab } from "../utils";

console.log("🔥 store");

export const mainColorAtom = atomWithStorage<RgbColor>("maincolor", {
  r: 0,
  g: 255,
  b: 124,
});

export const settingsAtom = atomWithStorage("settings", { results: 4 });

export const listAtom = atomWithStorage<string[]>("list", ["css"]);

export const shadesAtom = atom<Shade[]>([]);

export const shadesSortedAtom = atom<ShadeDistance[]>((get) => {
  console.log("🌌 shadesSortedAtom");
  const mainColorLAB: LABColor = rgbToLab(get(mainColorAtom));
  const shadesWithDistance = get(shadesAtom).map((shade) => {
    return { ...shade, distance: DeltaE.getDeltaE00(shade.LAB, mainColorLAB) };
  });

  return shadesWithDistance.sort(function (a, b) {
    return a.distance - b.distance;
  });
});
