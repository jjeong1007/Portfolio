import type { StaticImageData } from "next/image";
import collageBaby from "./collage-baby.jpg";
import collageFamily from "./collage-family.jpg";
import collageSelfie from "./collage-selfie.jpg";
import collageWorkspace from "./collage-workspace.jpg";
import hike01 from "./hike-01.jpg";
import hike02 from "./hike-02.jpg";
import hike03 from "./hike-03.jpg";
import hike05 from "./hike-05.jpg";
import hike06 from "./hike-06.jpg";
import hike07 from "./hike-07.jpg";
import hikeArmsUp from "./hike-arms-up.jpg";
import photo01 from "./photo-01.jpg";
import photo02 from "./photo-02.jpg";
import photo03 from "./photo-03.jpg";
import photo04 from "./photo-04.jpg";
import photo05 from "./photo-05.jpg";
import photo06 from "./photo-06.jpg";
import photo07 from "./photo-07.jpg";
import photo08 from "./photo-08.jpg";
import photo09 from "./photo-09.jpg";
import photo10 from "./photo-10.jpg";
import photo11 from "./photo-11.jpg";
import photo12 from "./photo-12.jpg";

/**
 * Content for /about (Figma "Who are you", 103:12209).
 * Photos are cropped to their Figma frame (`size`, width × height), so a row's
 * frames share one height at any width. See "About page" in design-system.md.
 */
export type Photo = {
  src: StaticImageData;
  alt: string;
  /** Figma frame, width × height. Only the ratio matters. */
  size: [number, number];
  caption?: string;
  /** CSS object-position when the crop isn't centered */
  focus?: string;
};

export type Gallery = { title: string; rows: Photo[][] };

export const story: string[] = [
  "I’m a product thinker, designer, and builder who loves to tackle complex problems and re-shape how things are done through products that bring wonderful experiences for people.",
  "My journey started in 5th grade when I began my first YouTube channel where this was my first exposure to graphic design and storytelling. I fell in love with just creating anything whether it was through telling a story through my Minecraft let’s plays or making awesome thumbnails or logo designs for my own personal brand.",
  "I then began to explore more into the realm of product coming into Northwestern University. This was when I was able to mix my desires to tell stories and create visual designs in a way that would impact people’s lives.",
];

/** The "hover over me!" collage: one photo in the middle, four fanned around it. */
type Corner = Pick<Photo, "src" | "alt" | "focus">;

export const collage: {
  center: Pick<Photo, "src" | "alt">;
  /** Top left, top right, bottom left, bottom right */
  corners: [Corner, Corner, Corner, Corner];
} = {
  center: { src: collageSelfie, alt: "Jason smiling in front of green rolling hills" },
  corners: [
    { src: collageWorkspace, alt: "A desk with a plant and a Figma sticker", focus: "50% 58%" },
    { src: hikeArmsUp, alt: "Jason jumping with his arms up on a mountain overlook" },
    { src: collageFamily, alt: "An old family photo of Jason as a kid with his family" },
    { src: collageBaby, alt: "Baby photos of Jason with his sibling" },
  ],
};

export const galleries: Gallery[] = [
  {
    title: "Photography",
    rows: [
      [
        { src: photo01, alt: "Storm clouds breaking over golden hills", size: [228, 334], caption: "Japan Series" },
        { src: photo02, alt: "A quiet residential street lined with old wooden houses", size: [218, 334], caption: "Japan Series" },
        { src: photo03, alt: "A tree framed between two buildings in a narrow alley", size: [253, 334], caption: "Japan Series" },
        { src: photo04, alt: "A lone hiker on a snowy ridge under rolling clouds", size: [251, 334], caption: "Mount Rainier" },
      ],
      [
        { src: photo05, alt: "A snow-covered volcanic peak under a blue sky", size: [486, 324], caption: "Mount Rainier" },
        { src: photo06, alt: "Evergreen trees in front of a snowy mountain", size: [488, 324], caption: "Mount Rainier" },
      ],
      [
        { src: photo07, alt: "A dark mountain peak wrapped in clouds at dusk", size: [640, 360], caption: "Dolomites, Italy" },
        { src: photo08, alt: "A person sitting in a green alpine meadow below limestone cliffs", size: [334, 360], caption: "Dolomites, Italy" },
      ],
      [{ src: photo09, alt: "A busy shopping street with a gate and hanging banners", size: [986, 355], caption: "Japan Series" }],
      [
        { src: photo10, alt: "A coastal headland silhouetted against a hazy sky", size: [313, 418], caption: "Dublin, Ireland" },
        { src: photo11, alt: "Sea cliffs dropping into turquoise water, from above", size: [335, 418], caption: "Dublin, Ireland" },
        { src: photo12, alt: "Tall grass on a clifftop with a bird overhead", size: [313, 418], caption: "Cliffs of Moher" },
      ],
    ],
  },
  {
    title: "Hiking + Travel",
    rows: [
      [
        { src: hike01, alt: "Jason’s legs stretched out on a cliff above the ocean", size: [309, 412] },
        { src: hike02, alt: "Jason looking back while leading the way down a grassy trail", size: [309, 412] },
        { src: hike03, alt: "Jason and a friend taking a selfie in front of rocky mountains", size: [343, 412] },
      ],
      [
        { src: hikeArmsUp, alt: "Jason jumping with his arms up on a mountain overlook", size: [464, 349] },
        { src: hike05, alt: "Snowy peaks above a half-frozen lake", size: [505, 349] },
      ],
      [
        { src: hike06, alt: "Jason holding a water bottle by a glacier lake", size: [321, 357] },
        { src: hike07, alt: "Jason with his hands on his head, facing sunlit mountains", size: [648, 357] },
      ],
    ],
  },
];
