# GitHub profile design

Scope: README, its vector assets and its build script. Music and Portfolio are the only featured projects. The portfolio application is a separate surface.

Reading this as an animated developer profile for people exploring Mario's work: a terminal-inspired visual voice with native GitHub navigation and disclosures. Design variance 6, motion intensity 6, visual density 3.

Use one phosphor lime accent, warm white text and a near-black canvas. Pixel type identifies Eclipxse; native Markdown carries the readable content and working links. The project visuals are mathematical geometry, not application screenshots or live data. No raster artwork, image generation, remote widgets, external fonts or browser scripts.

## Composition

Identity and ASCII torus; short personal introduction and navigation; Music and its procedural audio signal; Portfolio and its parametric knot; contact and a terminal signoff. Project details use native disclosures. Preserve Musify attribution and the verified project links.

Mobile gets dedicated 600-unit compositions selected by picture sources below 600px. Desktop uses 1100-unit compositions. The GitHub host owns body typography, themes, links, keyboard focus and disclosure behavior.

## Motion

Pixel glyphs enter once over 450ms with 50ms stagger and cubic-bezier(.23,1,.32,1). The ASCII torus rotates over 6 seconds at 16 samples per second. The wireframe rotates over 5 seconds at 24 samples per second. Signal bars use transform and opacity only. Geometry is computed once during the build and animated with CSS frame visibility.

Reduced motion selects separate still SVGs before the animated asset loads, including a combined mobile/reduced-motion source. Still assets retain only one geometry frame and no keyframes. The README also links to an explicit still edition.

## Build

Run `node scripts/build-profile.mjs` from the repository root. The script has no dependencies and writes both README editions and all sixteen SVG assets. Use `--out <directory>` to preview in another directory.
