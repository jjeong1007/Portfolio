import { CharacterGlasses, CharacterHair } from "@/components/home/character-art";

/**
 * Vector art for the Amazon Music personas, rebuilt from the "Characters"
 * Figma file (Wwi1NkPuotXha6PAinCnqm). Every persona shares one anatomy, the
 * full-body figure in Frame 1 (739 x 739): the face, ear, brows, neck and
 * sweater. Hair, glasses and outfit details are swapped per persona; head
 * variants from Frame 3 are moved into Frame 1's coordinates with a
 * translate, since they all reuse the same face. Jason's hair and glasses come
 * from his own rig (home/character-art.tsx), whose face is this face
 * mirrored at 0.882 scale.
 *
 * The arms are jointed (shoulder, elbow) so each character can hold a
 * different pose, but they're drawn the way Frame 1 draws them: one outline
 * around the sweater and both sleeves together (TORSO_D + SLEEVE, stroked under
 * the fills), plus open interior lines where a sleeve crosses the body, a
 * crease at a bent elbow, and Frame 1's fist or open hand. Poses are set by
 * where the wrist goes (see `ARM_POSES` and `solveArm`); motion lives in
 * jam-cover.tsx.
 */

/** Head pivot at the neck, in Frame 1 units. */
export const PERSONA_NECK = { x: 341, y: 250 };

export type PersonaKey = "sally" | "louise" | "quincy" | "jason";

/** Hair colors from the persona portraits. */
const HAIR: Record<PersonaKey, string> = {
  sally: "#FF1D1D",
  louise: "#FFE81D",
  quincy: "#1D92FF",
  jason: "#000000",
};

const STROKE = { stroke: "black", strokeWidth: 2, strokeMiterlimit: 10 } as const;

/**
 * Moves Jason's rig art onto this face: his face is this one mirrored and
 * scaled by 0.882, anchored at the top of the face.
 */
export const JASON_TO_PERSONA = "translate(326.156 159.022) scale(-1.1338 1.1338) translate(-261.642 -26.3773)";
/** His strokes are 2.4 units; at this scale that would be 2.7, so bring them back to 2. */
const JASON_STROKE = "[&_[stroke-width]]:[stroke-width:1.76]";

/** Drawn behind the body: hair that falls past the neck. */
export function PersonaHairBack({ persona }: { persona: PersonaKey }) {
  if (persona === "sally") {
    return (
      <path
        d="M316.523 207.668L313.575 247.848L378.96 256.15L384.871 225.21L321.999 201.322"
        fill={HAIR.sally}
        {...STROKE}
        strokeLinejoin="round"
      />
    );
  }
  if (persona === "louise") {
    return (
      <path
        transform="translate(17.92 104)"
        d="M298.603 103.668L295.655 143.848L361.04 152.15L366.951 121.21L304.079 97.3221"
        fill={HAIR.louise}
        {...STROKE}
        strokeLinejoin="round"
      />
    );
  }
  return null;
}

/**
 * The sweater body, without arms. In Frame 1 the sweater and its sleeves are
 * one shape with one outline, so this path is never stroked on its own: the
 * host strokes it together with the sleeve shapes (see SLEEVE) underneath all
 * the fills, which leaves only the outer silhouette showing.
 */
export const TORSO_D =
  "M326 249C292 247 256 260 240 282C230 296 225 312 225 330L248 362C246 420 236 520 233.8 564.5C233.4 566.9 234.5 569.2 236.6 570.4C298.8 605 375.6 617.7 441.5 587.8C443.7 586.8 445 584.5 444.8 582.2L432 362L453 330C453 312 448 296 438 282C422 260 386 252 357 251Z";

/** The sweater's fill, then what sits on it: hem, outfit details, neck and collar. */
export function PersonaTorso({ persona, outfit = true }: { persona: PersonaKey; outfit?: boolean }) {
  return (
    <>
      <path d={TORSO_D} fill="white" />
      <path d="M409.085 567.181C409.085 567.181 340.71 589.507 276.289 557.004" {...STROKE} />
      {outfit && <PersonaOutfit persona={persona} />}
      {/* Neck + collar */}
      <path d="M329.553 228.05L326.156 258.84C345.193 265.417 356.458 259.873 356.458 259.873V239.464" fill="white" {...STROKE} />
      <path d="M372.371 253.663C372.371 253.663 340.548 298.993 308.603 247.834" fill="white" {...STROKE} />
    </>
  );
}

type Point = { x: number; y: number };

/** Shoulder pivots, inside the sweater so the sleeves grow out of its shoulders. "back" is the arm on the far side. */
export const SHOULDERS: Record<"back" | "front", Point> = {
  back: { x: 262, y: 314 },
  front: { x: 416, y: 314 },
};
/** Shoulder to elbow, and elbow to wrist (about Frame 1's arm length). */
export const UPPER_ARM = 95;
const FOREARM = 80;

/**
 * Sleeve shapes, drawn pointing down (+y) from their pivot. Frame 1's sleeves
 * are wide and dropped: the upper sleeve starts as a rounded shoulder, a
 * sleeve over an open hand flares into a bell (like the raised arm), and one
 * over a fist tapers into the cuff (like the lowered arm).
 */
export const SLEEVE = {
  upper: `M-38 0C-38 -26 -20 -38 0 -38C20 -38 38 -26 38 0C38 34 35 66 32 ${UPPER_ARM}A32 32 0 0 1 -32 ${UPPER_ARM}C-35 66 -38 34 -38 0Z`,
  open: `M-32 0C-33 28 -35 56 -38 ${FOREARM}C-24 ${FOREARM + 7} 24 ${FOREARM + 7} 38 ${FOREARM}C35 56 33 28 32 0Z`,
  fist: `M-32 0C-30 30 -27 58 -24 ${FOREARM}L24 ${FOREARM}C27 58 30 30 32 0Z`,
};

export type ArmPose = {
  /** Where the wrist goes, in Frame 1 units. */
  wrist: Point;
  /**
   * Which of the two elbow positions to use: 1 puts the elbow clockwise (on
   * screen) of the shoulder-to-wrist line, -1 counterclockwise.
   */
  bend: 1 | -1;
  hand: "fist" | "open";
  /**
   * Which sleeve edges get their own line. Edges on the outer silhouette
   * already have the shared outline; like Frame 1, only edges lying over the
   * body (or head) are drawn: the inner edge of a hanging sleeve, or both
   * edges of a forearm across the chest.
   */
  lines: { upper: "inner" | "none"; fore: "inner" | "both" | "none" };
};

/**
 * Arm poses for the rig. The other characters' poses come from the Figma pose
 * sheet instead (pose-art.tsx), so only Jason's is rigged.
 */
export const ARM_POSES = {
  /** Arms doing nothing, hanging straight by the hips (wrists at full reach, so the inner line runs unbroken). */
  relaxed: {
    back: { wrist: { x: 240, y: 488 }, bend: -1, hand: "fist", lines: { upper: "inner", fore: "inner" } },
    front: { wrist: { x: 438, y: 488 }, bend: 1, hand: "fist", lines: { upper: "inner", fore: "inner" } },
  },
} satisfies Record<string, Record<"back" | "front", ArmPose>>;

/**
 * Which local side (-1 or 1 along x) of a sleeve faces the body's center
 * line, given the sleeve's pivot and its total rotation in degrees.
 */
export function innerSide(pivotX: number, rotation: number) {
  const towardCenter = 340 - pivotX;
  return Math.cos((rotation * Math.PI) / 180) * towardCenter >= 0 ? 1 : -1;
}

const deg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Two-bone IK: the shoulder and elbow rotations (SVG degrees, 0 = hanging
 * straight down) that put the wrist on `wrist`.
 */
export function solveArm(shoulder: Point, { wrist, bend }: Pick<ArmPose, "wrist" | "bend">) {
  const dx = wrist.x - shoulder.x;
  const dy = wrist.y - shoulder.y;
  const reach = Math.min(Math.hypot(dx, dy), UPPER_ARM + FOREARM - 0.5);
  const toWrist = Math.atan2(dy, dx);
  const atShoulder = Math.acos((UPPER_ARM ** 2 + reach ** 2 - FOREARM ** 2) / (2 * UPPER_ARM * reach));
  // Pick the elbow side that bends toward `bend`
  const upper = toWrist + (bend === 1 ? atShoulder : -atShoulder);
  const elbow = { x: shoulder.x + UPPER_ARM * Math.cos(upper), y: shoulder.y + UPPER_ARM * Math.sin(upper) };
  const fore = Math.atan2(wrist.y - elbow.y, wrist.x - elbow.x);
  // Sleeves are drawn pointing down (+y), so a direction of 90° is no rotation
  return { shoulder: deg(upper) - 90, elbow: deg(fore) - deg(upper) };
}

/**
 * The upper sleeve's inner line, where it hangs over the sweater. Like Frame
 * 1's lowered arm, it starts at the armpit and leaves the shoulder open, so the
 * shoulder flows into the sleeve without a seam.
 */
export function PersonaUpperArmLine({ side }: { side: 1 | -1 }) {
  return <path d={`M${side * 37} 50C${side * 36} 66 ${side * 34} 80 ${side * 32} ${UPPER_ARM}`} {...STROKE} />;
}

/**
 * Forearm sleeve edges (`edges`: which local sides get a line) and the hand.
 * `bend` is the elbow angle in degrees: a bent elbow gets Frame 1's short
 * crease on its inner side.
 */
export function PersonaForearmLines({ hand, bend, edges }: { hand: ArmPose["hand"]; bend: number; edges: (1 | -1)[] }) {
  // A positive angle swings the forearm toward -x, so that's the inside of the elbow
  const inside = bend > 0 ? -1 : 1;
  const fist = hand === "fist";
  return (
    <>
      {/* A hanging sleeve's inner line runs on from the upper sleeve's; a forearm across the body starts clear of the elbow, which the outline and crease cover */}
      {edges.map((x) =>
        fist ? (
          <path key={x} d={edges.length === 2 ? `M${x * 30} 28C${x * 28} 46 ${x * 26} 64 ${x * 24} ${FOREARM}` : `M${x * 32} 0C${x * 30} 30 ${x * 27} 58 ${x * 24} ${FOREARM}`} {...STROKE} />
        ) : (
          <path key={x} d={edges.length === 2 ? `M${x * 33} 28C${x * 34} 46 ${x * 36} 64 ${x * 38} ${FOREARM}` : `M${x * 32} 0C${x * 33} 28 ${x * 35} 56 ${x * 38} ${FOREARM}`} {...STROKE} />
        ),
      )}
      {/* A sleeve over the head has no outline under it, so its opening gets a line too */}
      {!fist && edges.length === 2 && (
        <path d={`M-38 ${FOREARM}C-24 ${FOREARM + 7} 24 ${FOREARM + 7} 38 ${FOREARM}`} {...STROKE} />
      )}
      {fist ? (
        // Frame 1's fist and cuff, turned to point along the forearm
        <g transform={`translate(0 ${FOREARM}) rotate(-20) translate(-191 -449)`}>
          <PersonaFist />
        </g>
      ) : (
        // Frame 1's open hand, coming out of the sleeve's opening
        <g transform={`translate(0 ${FOREARM - 2}) rotate(115) translate(-577 -325)`}>
          <PersonaOpenHand />
        </g>
      )}
      {Math.abs(bend) > 25 && <path d={`M${inside * 31} 2C${inside * 26} 6 ${inside * 20} 8 ${inside * 15} 8`} {...STROKE} strokeLinecap="round" />}
    </>
  );
}

/** The open hand from Frame 1's raised arm. */
function PersonaOpenHand() {
  return (
    <>
      <path
        d="M568.447 308.369C568.284 308.233 568.909 308.124 568.732 308.002C573.542 295.392 579.901 284.237 583.04 284.549C589.916 285.242 581.029 304.673 581.029 304.673L600.637 300.868C600.637 300.868 622.568 298.708 626.413 301.249C630.259 303.803 622.215 309.375 622.215 309.375C622.215 309.375 637.895 307.513 634.525 314.416C631.169 321.305 620.244 323.696 620.244 323.696C620.244 323.696 635.708 321.087 630.925 329.023C628.954 332.298 607.798 341.103 588.353 343.073C587.253 343.182 586.261 342.421 586.057 341.32C584.956 335.341 578.094 318.193 568.447 308.369Z"
        fill="white"
        {...STROKE}
      />
      <path d="M621.916 324.933C618.519 325.898 615.122 326.862 611.739 327.814C611.032 328.017 610.258 327.569 610.068 326.862C609.877 326.156 610.312 325.395 611.019 325.191C614.416 324.226 617.813 323.262 621.196 322.31C621.903 322.107 622.677 322.555 622.868 323.262C623.058 323.968 622.623 324.729 621.916 324.933Z" fill="black" />
      <path d="M623.411 310.231C617.283 312.051 611.168 313.886 605.04 315.707C603.355 316.209 602.649 313.587 604.32 313.084C610.448 311.263 616.563 309.429 622.691 307.608C624.376 307.105 625.083 309.728 623.411 310.231Z" fill="black" />
      <path d="M581.574 304.048C584.156 305.298 586.153 307.771 586.778 310.57C587.471 313.628 586.602 316.78 584.604 319.158C584.128 319.715 583.177 319.647 582.688 319.158C582.131 318.601 582.213 317.799 582.688 317.242C584.088 315.584 584.658 313.22 584.128 311.114C583.599 309.008 582.145 307.336 580.215 306.399C579.549 306.073 579.373 305.135 579.726 304.537C580.12 303.858 580.922 303.735 581.588 304.048H581.574Z" fill="black" />
    </>
  );
}

/** The fist from Frame 1's lowered arm, with its cuff. */
function PersonaFist() {
  return (
    <>
      {/* Fill behind the outline so the fist reads solid over anything behind it */}
      <path d="M172 436C160 440 152 452 152 468C153 484 162 494 178 492C190 490 200 482 212 478C217 470 216 460 213 457Z" fill="white" />
      <path d="M214.627 456.982C218.228 465.23 218.16 476.413 211.937 483.479C209.151 486.631 204.504 488.561 200.387 487.052C196.705 485.707 194.3 481.726 195.346 477.853C195.808 476.168 198.417 476.889 197.968 478.573C197.085 481.821 199.952 484.688 203.091 484.838C206.638 485.001 209.613 482.596 211.366 479.701C215.184 473.396 215.198 464.985 212.29 458.341C211.597 456.751 213.934 455.365 214.641 456.968L214.627 456.982Z" fill="black" />
      <path d="M197.546 480.435C193.402 486.427 187.695 491.496 180.642 493.697C174.202 495.708 166.66 494.906 161.103 490.952C154.676 486.386 152.637 478.573 151.591 471.154C150.463 463.124 150.694 454.482 154.553 447.158C158.127 440.35 164.704 435.119 172.503 434.453C174.242 434.303 174.242 437.021 172.503 437.17C166.28 437.7 160.967 441.818 157.76 447.022C153.956 453.191 153.29 460.705 153.915 467.784C154.513 474.47 155.79 482.46 160.899 487.297C165.329 491.496 172.082 492.882 177.952 491.604C185.154 490.042 191.092 485.014 195.209 479.076C196.201 477.649 198.552 479.008 197.56 480.449L197.546 480.435Z" fill="black" />
      <path d="M171.607 492.732C171.933 484.471 174.325 476.413 178.564 469.334C179.461 467.839 181.812 469.198 180.915 470.706C176.92 477.391 174.637 484.96 174.325 492.746C174.257 494.485 171.539 494.499 171.607 492.746V492.732Z" fill="black" />
      <path d="M156.485 484.96C157.748 478.899 159.868 473.043 162.722 467.553C163.523 466.004 165.874 467.377 165.072 468.926C162.314 474.212 160.33 479.851 159.107 485.68C158.754 487.392 156.132 486.672 156.485 484.96Z" fill="black" />
      <path d="M195.753 477.011C197.329 475.38 198.62 473.165 198.837 470.869C198.932 469.877 198.837 468.763 198.185 467.975C197.913 467.649 197.546 467.35 197.166 467.2C196.786 467.051 196.446 467.024 196.079 467.119C194.38 467.554 193.66 464.931 195.359 464.496C196.921 464.102 198.47 464.578 199.68 465.624C200.957 466.725 201.541 468.382 201.596 470.04C201.691 473.328 199.924 476.63 197.696 478.94C196.473 480.204 194.557 478.275 195.78 477.024L195.753 477.011Z" fill="black" />
      <path d="M211.256 463.939C195.847 459.767 181.634 451.9 169.867 441.125C166.633 438.162 171.443 433.366 174.677 436.314C185.588 446.302 198.796 453.517 213.063 457.376C217.276 458.517 215.496 465.08 211.256 463.925V463.939Z" fill="black" />
    </>
  );
}

/** What sets each persona's top apart, drawn over the sweater. */
export function PersonaOutfit({ persona }: { persona: PersonaKey }) {
  if (persona === "sally") {
    // Two bold stripes across the chest
    return (
      <>
        <path d="M391.612 261.531C391.612 261.531 386.517 273.393 363.553 288.979C339.203 305.502 298.724 297.662 281.712 255.294" stroke="black" strokeWidth="12" strokeMiterlimit="10" />
        <path d="M428.558 281.886C428.558 281.886 340.29 402.956 245.622 277.13" stroke="black" strokeWidth="12" strokeMiterlimit="10" />
      </>
    );
  }
  if (persona === "louise" || persona === "jason") {
    // Black top under an open cardigan, like their portraits
    return (
      <>
        <path d="M318.5 262C330 268 352 269 366 264.5L392 598C364 606 312 606 278 594Z" fill="black" />
        <path d="M372.371 253.663C372.371 253.663 340.548 298.993 308.603 247.834" fill="white" {...STROKE} />
      </>
    );
  }
  // Quincy: a pointed shirt collar
  return (
    <>
      <path d="M326 249.5L306 262L333 287L342 262Z" fill="white" {...STROKE} strokeLinejoin="round" />
      <path d="M358 255L380 263L348 289L342 264Z" fill="white" {...STROKE} strokeLinejoin="round" />
      <path d="M306 262L304 268L333 293L333 287Z" fill="black" />
      <path d="M380 263L381 269L348 295L348 289Z" fill="black" />
    </>
  );
}

/** Face, ear and brows: everything on the head that doesn't change while jamming. */
export function PersonaFace() {
  return (
    <>
      <path d="M322.341 203.768C322.341 203.768 300.885 222.506 301.959 192.571C303.032 162.637 322.939 181.687 322.939 181.687" fill="white" {...STROKE} />
      <path d="M326.156 159.022C326.156 159.022 396.855 132.295 390.822 201.336C384.775 270.39 325.585 224.68 325.585 224.68C325.585 224.68 317.134 196.892 326.17 159.022H326.156Z" fill="white" {...STROKE} />
      <path d="M315.328 194.895C315.519 194.895 315.709 194.827 315.858 194.705C316.198 194.406 316.239 193.889 315.953 193.55L310.002 186.579C309.703 186.226 309.187 186.198 308.847 186.484C308.507 186.783 308.466 187.299 308.752 187.639L314.703 194.609C314.866 194.8 315.097 194.895 315.328 194.895Z" fill="#010101" stroke="black" strokeWidth="0.5" strokeMiterlimit="10" />
      <path d="M313.522 191.851C313.576 191.742 313.59 191.607 313.549 191.484C313.468 191.199 313.182 191.036 312.897 191.104L307.108 192.694C306.823 192.775 306.66 193.074 306.728 193.346C306.81 193.631 307.095 193.794 307.38 193.726L313.169 192.137C313.332 192.096 313.454 191.987 313.508 191.851H313.522Z" fill="#010101" stroke="black" strokeWidth="0.5" strokeMiterlimit="10" />
      {/* Chin shadow */}
      <path d="M356.215 245.918C352.505 245.932 338.89 244.804 330.221 228.036C330.221 228.036 349.258 237.738 355.046 238.336C355.522 238.39 355.902 238.716 355.984 239.165L357.016 244.953C357.098 245.443 356.731 245.891 356.215 245.905V245.918Z" fill="#231F20" stroke="black" strokeMiterlimit="10" />
    </>
  );
}

/** Brows. Separate from the face so they can lift while jamming. */
export function PersonaBrows() {
  return (
    <>
      <path d="M364.558 182.557C361.487 179.975 357.207 178.82 353.266 179.54C352.546 179.676 351.798 179.35 351.595 178.589C351.418 177.937 351.812 177.054 352.546 176.918C357.519 176.021 362.615 177.38 366.487 180.641C367.044 181.117 366.976 182.081 366.487 182.557C365.93 183.114 365.128 183.032 364.571 182.557H364.558Z" fill="black" />
      <path d="M374.571 181.402C378.009 180.274 381.691 180.111 385.224 180.845C385.944 180.994 386.365 181.837 386.175 182.516C385.971 183.263 385.224 183.617 384.504 183.467C381.433 182.829 378.267 183.046 375.291 184.024C374.598 184.255 373.81 183.753 373.62 183.073C373.416 182.339 373.864 181.633 374.571 181.402Z" fill="black" />
    </>
  );
}

/** Open eyes: two short dashes. */
export function PersonaEyesOpen() {
  return (
    <>
      <path d="M380.075 202.98C380.89 203.088 381.529 202.613 381.611 201.92L382.467 195.316C382.562 194.623 382.059 193.984 381.38 193.903C380.687 193.808 380.062 194.297 379.966 194.99L379.11 201.594C379.029 202.232 379.45 202.83 380.062 202.98H380.075Z" fill="#010101" />
      <path d="M355.426 199.393C356.242 199.501 356.88 199.026 356.962 198.333L357.818 191.729C357.913 191.036 357.41 190.397 356.731 190.316C356.038 190.221 355.413 190.71 355.318 191.403L354.462 198.007C354.38 198.645 354.801 199.243 355.413 199.393H355.426Z" fill="#010101" />
    </>
  );
}

/** Closed eyes for jamming: relaxed lid curves where the dashes were. */
export function PersonaEyesClosed() {
  return (
    <g stroke="#010101" strokeWidth="2.4" strokeLinecap="round">
      <path d="M350.6 194.2C352.6 198.6 358.4 199.6 361.6 195.6" />
      <path d="M375.4 197.6C377.4 202 383.2 203 386.4 199" />
    </g>
  );
}

/** A closed-mouth smile: they're bopping along, not singing. */
export function PersonaMouth() {
  return <path d="M375.917 221.46C375.917 221.46 369.517 226.202 356.582 217.438" stroke="#010101" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" />;
}

/** Drawn over the face: the hair on top of the head. */
export function PersonaHairFront({ persona }: { persona: PersonaKey }) {
  if (persona === "sally") {
    return (
      <>
        <path
          d="M376.02 138.282C371.584 136.293 366.336 136.358 360.139 140.351L359.703 140.632L359.222 140.436C359.222 140.436 353.633 138.688 353.633 138.688C350.215 137.826 345.624 137.014 340.87 137.18C336.115 137.345 331.264 138.486 327.249 141.46C323.254 144.42 319.979 149.276 318.499 157.088C318.494 157.113 317.98 160.75 317.639 164.906C317.387 169.344 317.52 174.565 318.911 178.175C319.191 178.905 319.579 179.236 320.012 179.391C320.495 179.564 321.184 179.57 322.12 179.337C324.003 178.867 326.398 177.556 328.982 175.939C331.472 174.382 334.232 172.474 336.511 171.103C337.675 170.402 338.789 169.792 339.787 169.378C340.751 168.978 341.757 168.695 342.645 168.821C342.961 168.866 343.458 168.772 344.25 168.412C345.021 168.062 345.917 167.535 346.994 166.894C349.113 165.632 351.809 164.003 355.057 162.92C358.324 161.831 362.157 161.29 366.58 162.176C370.996 163.061 375.935 165.356 381.44 169.838C388.047 175.217 392.028 175.802 394.132 175.08C396.12 174.398 396.877 172.376 396.729 170.977L396.717 170.93C396.716 170.926 395.768 167.691 394.423 163.819C392.88 159.634 390.566 154.253 387.471 149.401C384.363 144.531 380.538 140.308 376.02 138.282Z"
          fill={HAIR.sally}
          stroke="black"
          strokeWidth="2"
        />
        <path d="M377.087 153.302C377.087 153.302 382.251 162.338 380.919 171.469C379.587 180.6 343.579 170.654 343.579 170.654C343.579 170.654 346.745 163.085 342.587 156.318" fill={HAIR.sally} stroke="black" strokeWidth="2" strokeLinejoin="round" />
      </>
    );
  }
  if (persona === "louise") {
    return (
      <path
        transform="translate(17.92 104)"
        d="M335.525 33.0697C332.688 32.216 325.186 30.3949 317.789 32.2035C314.113 33.1024 310.478 34.8936 307.437 38.141C304.396 41.3879 301.895 46.1495 300.581 53.0775C300.58 53.0827 300.513 53.4783 300.483 53.6732C300.421 54.063 300.337 54.6306 300.245 55.3363C300.06 56.749 299.845 58.711 299.72 60.9066C299.467 65.3449 299.6 70.5652 300.991 74.1752C301.355 75.1281 302.133 75.9496 303.312 76.6478C304.493 77.3475 306.015 77.8857 307.747 78.2865C311.211 79.0882 315.321 79.2997 318.734 79.2924C321.294 79.2869 323.165 76.5856 322.569 73.7289C322.054 71.2567 321.72 68.3585 322.117 65.6986C322.517 63.0241 323.678 60.4806 326.242 58.9496C328.774 57.4382 332.461 57.0445 337.622 58.1449C342.796 59.2481 349.59 61.881 358.471 66.6176C362.192 68.6023 365.186 69.9039 367.6 70.6166C370.022 71.3318 371.774 71.4276 373.059 71.1058C375.466 70.5026 376.753 68.2491 377.515 63.8304C378.746 56.69 379.049 47.8091 374.174 41.3724C369.353 35.0086 359.15 30.6522 338.408 33.3197C337.436 33.4447 336.443 33.3463 335.525 33.0697Z"
        fill={HAIR.louise}
        stroke="black"
        strokeWidth="2"
      />
    );
  }
  if (persona === "jason") {
    return (
      <g transform={JASON_TO_PERSONA} className={JASON_STROKE}>
        <CharacterHair />
      </g>
    );
  }
  return (
    <g transform="translate(254.92 -32.961)">
      <path
        d="M68.1533 176.97C55.6767 171.69 53.5637 197.4 54.0668 209.973C69.6626 212.33 68.1533 217.516 67.1471 224.117C66.1409 230.717 75.1965 232.132 73.6873 226.474C72.178 220.816 77.712 213.273 87.7737 213.273C97.8355 213.273 100.854 206.201 99.3448 199.129C97.8355 192.057 101.357 192.057 105.885 191.586C110.413 191.114 114.94 189.228 115.444 200.072C115.947 210.916 127.518 213.744 134.058 209.973C140.598 206.201 150.157 182.628 121.481 172.727C92.8046 162.826 83.749 183.571 68.1533 176.97Z"
        fill={HAIR.quincy}
        stroke="black"
        strokeWidth="2"
      />
    </g>
  );
}

/** Glasses, drawn over the eyes' spot but under them, since Jason's lenses are filled. */
export function PersonaGlasses({ persona }: { persona: PersonaKey }) {
  if (persona === "quincy") {
    return (
      <g transform="translate(254.92 -32.961)">
        <path d="M135.946 239.984C138.319 235.288 138.716 228.265 138.541 225.578C130.53 219.179 122.437 221.203 119.547 222.539C116.694 231.285 117.366 235.677 117.903 237.254C123.74 239.999 132.312 240.376 135.946 239.984Z" stroke="black" strokeWidth="2" />
        <path d="M89.2087 235.559C88.0793 230.42 89.4428 223.519 90.2816 220.961C99.633 216.757 106.968 220.731 109.434 222.745C110.02 231.926 108.276 236.012 107.363 237.407C101.027 238.612 92.6308 236.843 89.2087 235.559Z" stroke="black" strokeWidth="2" />
        <path d="M109.5 229.892C111 229.225 114.7 228.292 117.5 229.892" stroke="black" strokeWidth="2" />
      </g>
    );
  }
  if (persona === "jason") {
    return (
      <g transform={JASON_TO_PERSONA} className={JASON_STROKE}>
        <CharacterGlasses />
      </g>
    );
  }
  return null;
}
