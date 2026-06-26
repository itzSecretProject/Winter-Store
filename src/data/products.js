import { images } from "./images.js";

export const photos = {
  hero: images.hero,
  heroAngles: [images.angleA, images.angleB],
  feature: images.feature,
  mountain: images.mountain,
};

export const heroProduct = {
  id: "artic-01",
  name: "Collection Artic 01",
  desc: "Armor Status №.1",
  price: 899.99,
  image: images.hero,
};

export const auroraProduct = {
  id: "aurora",
  name: "Aurora",
  desc: "Reflective Puffer Jacket",
  price: 1999,
  image: images.feature,
};

export const featured = [
  {
    id: "aurora-silver",
    name: "Aurora Silver",
    desc: "Reflective Puffer Jacket",
    price: 999.99,
    image: images.auroraSilver,
    colours: [
      { name: "White", dot: "oklch(95% 0.005 230)" },
      { name: "Blue", dot: "oklch(52% 0.062 238)" },
    ],
  },
  {
    id: "sweet-silver",
    name: "Sweet Silver",
    desc: "High-Gloss Puffer",
    price: 1299.99,
    image: images.sweetSilver,
    colours: [{ name: "Silver", dot: "oklch(74% 0.015 228)" }],
  },
  {
    id: "stealth-black",
    name: "Stealth Black",
    desc: "Heavy Shield Puffer",
    price: 1599.99,
    image: images.stealthBlack,
    colours: [
      { name: "Black", dot: "oklch(28% 0.02 234)" },
      { name: "White", dot: "oklch(95% 0.005 230)" },
    ],
  },
];

export const collection = [
  {
    id: "glacier-white",
    name: "Glacier White",
    desc: "Insulated Puffer Jacket",
    price: 1299.99,
    image: images.glacierWhite,
    colours: [{ name: "Grey", dot: "oklch(60% 0.02 230)" }],
  },
  {
    id: "polar-gloss",
    name: "Polar Gloss",
    desc: "Blue Puffer Jacket",
    price: 899.99,
    image: images.polarGloss,
    colours: [{ name: "Blue Gloss", dot: "oklch(52% 0.062 238)" }],
  },
  {
    id: "stealth-heavy",
    name: "Stealth Black",
    desc: "Heavy Puffer Jacket",
    price: 1199.99,
    image: images.stealthHeavy,
    colours: [
      { name: "Navy Blue", dot: "oklch(40% 0.05 240)" },
      { name: "Black", dot: "oklch(28% 0.02 234)" },
    ],
  },
  {
    id: "icefield-blue",
    name: "Icefield Blue",
    desc: "Tech Puffer Jacket",
    price: 999.99,
    image: images.icefieldBlue,
    colours: [{ name: "Blue", dot: "oklch(70% 0.04 232)" }],
  },
  {
    id: "polar-white",
    name: "Polar White",
    desc: "Shell Puffer Jacket",
    price: 1499.99,
    image: images.polarWhite,
    colours: [{ name: "White", dot: "oklch(95% 0.005 230)" }],
  },
];
