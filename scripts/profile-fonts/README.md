# Profile lettering

The profile panels use Syne ExtraBold for display titles, Azeret Mono Medium for technical labels, and Instrument Serif Italic for personal lines. The custom pixel identity remains hand-coded geometry.

Original, unmodified font files are from [Google Fonts](https://github.com/google/fonts/tree/8e44913e4ff26fc997e6856c1ec40ff4791c98c5/ofl), pinned to commit `8e44913e4ff26fc997e6856c1ec40ff4791c98c5`:

- `syne/Syne[wght].ttf`, distributed here as `syne.ttf`
- `azeretmono/AzeretMono[wght].ttf`, distributed here as `azeretmono.ttf`
- `instrumentserif/InstrumentSerif-Italic.ttf`, distributed here as `instrumentserif-italic.ttf`

Each font's complete SIL Open Font License and copyright notice is included alongside it. The build selects Syne weight 800 and Azeret Mono weight 500.

`outlines.json` stores the glyph paths, advances and kerning used by the dependency-free Node build. SVG panels contain outlined lettering, so viewing the README requires no font requests or installed fonts. SVG titles, descriptions and README alt text preserve accessible descriptions. The ASCII animation is text-based geometry and keeps its monospace grid.

To refresh the cache after updating a font: install `fonttools==4.63.0` in your Python environment, then run `python scripts/prepare-profile-fonts.py`. Rebuild the panels with `node scripts/build-profile.mjs`.
