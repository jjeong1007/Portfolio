# Personas

How the Amazon Music case study's characters are built, and how to add a new one in the same style. The cast is Social Sally, Lurking Louise, Jason and Quiet Quincy. They appear on the case study cover and on the landing page's project tile.

Everything is SVG drawn in **Frame 1 units**: the 739 × 739 full-body frame in the "Characters" Figma file. Heads, bodies and animation pivots all use these coordinates, so pieces from different files line up.

## Files

| File | What it holds |
|---|---|
| [`src/components/case-study/persona-art.tsx`](src/components/case-study/persona-art.tsx) | The shared head (face, ear, brows, eyes, mouth, neck), each persona's hair, glasses and outfit, and Frame 1's sweater (`TORSO_D`, `PersonaTorso`) |
| [`src/components/case-study/pose-art.tsx`](src/components/case-study/pose-art.tsx) | The bodies: the Figma poses (`FIGMA_POSES`, `PoseBody`, `PoseOverlay`) and Jason's relaxed pose (`RelaxedBody`) |
| [`src/components/case-study/jam-cover.tsx`](src/components/case-study/jam-cover.tsx) | Who's who (`CAST`), how a character is assembled (`Character`), and the motion |

## The style

- **One anatomy.** Every persona shares the same face, ear, brows, eyes, mouth and neck. A persona only changes its hair (`PersonaHairBack`, `PersonaHairFront`), glasses (`PersonaGlasses`) and outfit (`PersonaOutfit`).
- **One line.** Lines are black and 2 units wide (about 2.2 on the Figma bodies), with round joins. The body and sleeves share one outer outline, so an arm never breaks at a joint. Inner lines are drawn only where a shape crosses the body, and each runs unbroken.
- **Flat fills.** The body is white, the hair is one bold color (`HAIR`), and tops and details are black. No shading or gradients.
- **Poses come from Figma.** Draw each pose in Figma and keep its exported paths as they are. Don't rebuild limbs in code, so every character keeps the same hand.
- **Gentle motion.** Heads bob from the neck (`animate-jam-nod`), bodies sway from the hips (`animate-jam-sway`), and eyes close once a character is in the groove.

## How a posed body is built

The poses live on the pose sheet in the portfolio Figma file (`wTRwgEKJ5RXgMkFktaTcTO`):

| Pose | Frame | Used by |
|---|---|---|
| `wave` | `arms-raised` (103:12171) | Sally |
| `ear` | `hand-to-ear` (103:12150) | Louise |
| `crossed` | `arms-crossed` (103:12129) | Quincy |

Each frame's SVG export is kept verbatim in `FIGMA_POSES`. An export is one black silhouette path, which draws every line plus the hair and the black shirt, with white shapes on top. To put a frame on a persona:

1. **Mask the silhouette to the body.** The frames draw Jason, so their head is hidden. Only the body shapes listed in `body` show, along with the black shirt inside `shirt`.
2. **Pin the frame into Frame 1 at the eyes.** `eyes` is the midpoint of the frame's eyes, and `scale` is how much bigger Jason's rig art is (his eye spacing over the frame's). With these, the persona's own head lands on the frame's neck.
3. **Continue below the crop.** The frames are cut off at the chest. The silhouette stops just above the cut (`silhouetteEnd`), and the body continues from the frame's edges (`below`) down to Frame 1's hem. Doing it this way avoids a seam.
4. **Sweater-wearers** (Sally, Quincy) get the cardigan closed: `bridge` covers the opening, and the shapes in `redraw` (neck, collar) go back on top with their lines. Their print is then clipped to the frame's body.
5. **A hand raised to the face** goes in `overlay`. It's drawn after the body and behind the head, and it doesn't bob, so it stays attached to the arm.

**Jason's relaxed pose** isn't on the sheet, so `RelaxedBody` draws it to match:

- Frame 1's sweater, black top and collar.
- Two hanging sleeves, mirrored about the sweater's center, with one outline around the body and both sleeves.
- One unbroken line down each sleeve's inner side and across the cuff.
- Rounded hands with a thumb line.

## Adding a persona or a pose

1. **Draw the pose in Figma** on the pose sheet. Keep the same camera angle and style, and change only the pose. Export the frame as SVG.
2. **Add it to `FIGMA_POSES`:**
   - **Paths:** paste the silhouette (the first, black path), the `body` shapes and any `overlay` shapes.
   - **`eyes`:** the midpoint of the two small black eye shapes in the export.
   - **`scale`:** Jason's eye spacing (25.2 units in `home/character-art.tsx`) divided by the frame's eye spacing.
   - **`shirt`:** a rectangle over the black shirt.
   - **`line`:** the frame's line weight.
   - **`below`:** the frame's body edges just above its bottom edge, plus `silhouetteEnd`.
3. **Check the measurements by rendering, not by eye.** Render the character and compare it with the Figma frame at a large size. Look for seams at the cut, stray lines from the cardigan opening, and the outline weight.
4. **Give the persona its look** in `persona-art.tsx`: a `HAIR` color, front and back hair paths in Frame 1 units, glasses if any, and a `PersonaOutfit` branch. If it wears a sweater rather than the cardigan, add it to `SWEATER` in `pose-art.tsx` and give the pose a `bridge` and `redraw`.
5. **Cast it** in `CAST` in `jam-cover.tsx`, and place it in `COVER_PLACEMENTS` and `TILE_LEANS`. Characters on the right side are mirrored so they face in.
