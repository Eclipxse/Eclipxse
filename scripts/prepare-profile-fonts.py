"""Rebuild the profile's outline cache. Optional build tool: fonttools==4.63.0.

The normal Node profile build reads the committed cache without dependencies.
The original OFL fonts and licenses are stored beside that cache.
"""
from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.roundingPen import RoundingPen

ROOT = Path(__file__).resolve().parent / 'profile-fonts'
CHARACTERS = ''.join(chr(i) for i in range(32, 127)) + '×→↓↗·'
FACES = {
    'display': ('syne.ttf', 'Syne ExtraBold', 800),
    'mono': ('azeretmono.ttf', 'Azeret Mono Medium', 500),
    'editorial': ('instrumentserif-italic.ttf', 'Instrument Serif Italic', None),
}

def kerning_tables(font):
    if 'GPOS' not in font:
        return []
    table = font['GPOS'].table
    indices = {i for feature in table.FeatureList.FeatureRecord
               if feature.FeatureTag == 'kern'
               for i in feature.Feature.LookupListIndex}
    result = []
    for i in sorted(indices):
        lookup = table.LookupList.Lookup[i]
        for subtable in lookup.SubTable:
            if lookup.LookupType == 2:
                result.append(subtable)
            elif lookup.LookupType == 9 and subtable.ExtensionLookupType == 2:
                result.append(subtable.ExtSubTable)
    return result

def kerning(left, right, tables):
    total = 0
    for table in tables:
        if left not in table.Coverage.glyphs:
            continue
        value = None
        if table.Format == 1:
            pairs = table.PairSet[table.Coverage.glyphs.index(left)]
            value = next((p.Value1 for p in pairs.PairValueRecord if p.SecondGlyph == right), None)
        elif table.Format == 2:
            c1 = table.ClassDef1.classDefs.get(left, 0)
            c2 = table.ClassDef2.classDefs.get(right, 0)
            value = table.Class1Record[c1].Class2Record[c2].Value1
        total += getattr(value, 'XAdvance', 0) or 0
    return total

result = {}
for key, (filename, name, weight) in FACES.items():
    font = TTFont(ROOT / filename)
    if weight is not None:
        font = instantiateVariableFont(font, {'wght': weight})
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    glyphs = {}
    for character in CHARACTERS:
        if ord(character) not in cmap:
            continue
        glyph_name = cmap[ord(character)]
        glyph = glyph_set[glyph_name]
        pen = SVGPathPen(glyph_set)
        glyph.draw(RoundingPen(pen, roundFunc=lambda value: round(value, 2)))
        glyphs[character] = {'d': pen.getCommands(), 'advance': glyph.width}
    tables = kerning_tables(font)
    pairs = {}
    for a in glyphs:
        for b in glyphs:
            value = kerning(cmap[ord(a)], cmap[ord(b)], tables)
            if value:
                pairs[a+b] = value
    result[key] = {'name': name, 'units': font['head'].unitsPerEm, 'glyphs': glyphs, 'kern': pairs}
    print(f'{name}: {len(glyphs)} glyphs, {len(pairs)} kern pairs')
(ROOT / 'outlines.json').write_text(json.dumps(result, separators=(',', ':')), encoding='utf-8')
