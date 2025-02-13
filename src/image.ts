import gokuHair from "/stickers/hair/goku.png";
import gokuHairS from "/stickers/hair/goku-s1.png";
import gokuHairS4 from "/stickers/hair/goku-s4.png";
import gokuHairS5 from "/stickers/hair/goku-s5.png";
import auraYello from "/stickers/aura/yellow.png";

const hairStickers = [
  { name: "off", url: "" },
  { name: "gokuHair", url: gokuHair },
  { name: "gokuHairS", url: gokuHairS },
  { name: "gokuHairS4", url: gokuHairS4 },
  { name: "gokuHairS5", url: gokuHairS5 },
] as const;

const auraStickers = [
  { name: "off", url: "" },
  { name: "auraYello", url: auraYello },
] as const;

export const loadHairStickers = () => {
  const loadedImages = hairStickers.map(({ name, url }) => {
    if (!url) return { name, imageElement: null };
    const imageElement = new Image();
    imageElement.src = url;
    return { name, imageElement };
  });

  return loadedImages;
};

export const loadAuraStickers = () => {
  const loadedImages = auraStickers.map(({ name, url }) => {
    if (!url) return { name, imageElement: null };
    const imageElement = new Image();
    imageElement.src = url;
    return { name, imageElement };
  });

  return loadedImages;
};
