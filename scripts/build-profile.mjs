/**
 * Eclipxse profile: Markdown, vector geometry and CSS. No dependencies.
 * Build: node scripts/build-profile.mjs [--out /absolute/directory]
 * The visuals are illustrations made with code; they do not simulate live data.
 */
import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const here = dirname(fileURLToPath(import.meta.url));
const outIndex = process.argv.indexOf('--out');
if (outIndex >= 0 && !process.argv[outIndex + 1]) throw new Error('--out requires a directory');
const root = outIndex >= 0 ? resolve(process.argv[outIndex + 1]) : resolve(here, '..');
const assetRoot = join(root, 'assets/readme/code');
await mkdir(assetRoot, {recursive: true});

const C = {bg:'#0b0d0e', line:'#303638', text:'#f0f2e9', muted:'#a0a9a2', accent:'#c3f86b'};
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const txt = (value,x,y,size=16,color=C.muted,extra='') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${extra}>${esc(value)}</text>`;
const line = (x1,y1,x2,y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${C.line}"/>`;
const rect = (x,y,w,h,fill,extra='') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const canvas = (w,h) => rect(1,1,w-2,h-2,C.bg,`rx="8" stroke="${C.line}"`);
const cursorCSS = '.cursor{animation:cursor 1.2s steps(2,end) infinite}@keyframes cursor{0%,45%{opacity:1}50%,100%{opacity:0}}';
const staticCSS = '.move,.move *,.ascii-frame,.wire-frame{animation:none!important}.ascii-frame,.wire-frame{opacity:0!important}.frame-0{opacity:1!important}';
async function asset(name,w,h,title,desc,content,css='') {
  const wrap = (body,styles) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title><desc id="desc">${esc(desc)}</desc>
<style>text{font-family:Consolas,"Liberation Mono",Menlo,monospace}path{stroke-linecap:round}
${styles}
@media(prefers-reduced-motion:reduce){${staticCSS}}</style>
${body}
</svg>\n`;
  await writeFile(join(assetRoot,`${name}.svg`),wrap(content,css));
  // Still sources retain one geometry frame and contain no animation keyframes.
  const still = content.replace(/<g class="(?:ascii|wire)-frame frame-(\d+)">[\s\S]*?<\/g>/g,
    (group,index) => index === '0' ? group : '');
  await writeFile(join(assetRoot,`${name}-still.svg`),wrap(still,staticCSS));
}

// A 5x7 vector alphabet. Every lit cell is a rectangle, including the green X.
const alphabet = {
  E:['11111','10000','10000','11110','10000','10000','11111'],
  C:['01111','10000','10000','10000','10000','10000','01111'],
  L:['10000','10000','10000','10000','10000','10000','11111'],
  I:['11111','00100','00100','00100','00100','00100','11111'],
  P:['11110','10001','10001','11110','10000','10000','10000'],
  X:['10001','10001','01010','00100','01010','10001','10001'],
  S:['01111','10000','10000','01110','00001','00001','11110'],
};
function wordmark(word,x,y,unit) {
  return [...word].map((letter,index) => `<g class="move glyph" style="animation-delay:${index*.05}s">${alphabet[letter].flatMap((row,j) => [...row].map((cell,i) => cell==='1' ? rect(x+(index*6+i)*unit,y+j*unit,unit-2,unit-2,index===5?C.accent:C.text,'rx=".7"') : '')).join('')}</g>`).join('');
}
function rotate([x,y,z],a,b) {
  const y1=y*Math.cos(a)-z*Math.sin(a), z1=y*Math.sin(a)+z*Math.cos(a);
  return [x*Math.cos(b)+z1*Math.sin(b),y1,-x*Math.sin(b)+z1*Math.cos(b)];
}
// Perspective projection and a depth buffer produce a real rotating ASCII torus.
function torusFrame(a,b) {
  const w=50,h=25,pixels=Array(w*h).fill(' '),depth=Array(w*h).fill(-Infinity),luminance='.,-~:;=!*#$@';
  for (let phi=0;phi<Math.PI*2;phi+=.035) {
    for (let theta=0;theta<Math.PI*2;theta+=.1) {
      const p=rotate([(1.6+.62*Math.cos(theta))*Math.cos(phi),.62*Math.sin(theta),(1.6+.62*Math.cos(theta))*Math.sin(phi)],a,b);
      const n=rotate([Math.cos(theta)*Math.cos(phi),Math.sin(theta),Math.cos(theta)*Math.sin(phi)],a,b);
      const inv=1/(p[2]+5.4),xx=Math.round(w/2+p[0]*49*inv),yy=Math.round(h/2-p[1]*24*inv);
      if (xx<0||xx>=w||yy<0||yy>=h) continue;
      const i=xx+yy*w;
      if (inv<=depth[i]) continue;
      depth[i]=inv;
      const light=Math.max(0,Math.min(1,.2+n[0]*.12+n[1]*.48-n[2]*.7));
      pixels[i]=luminance[Math.floor(light*(luminance.length-1))];
    }
  }
  return Array.from({length:h},(_,i) => pixels.slice(i*w,(i+1)*w).join(''));
}
// CSS-only frame visibility. Geometry is computed at build time.
// Excluding the duplicate angular endpoint makes each rotation loop seamlessly.
function frameCSS(selector,count,seconds) {
  const portion=100/count;
  let css=`${selector}{opacity:0;animation-duration:${seconds}s;animation-iteration-count:infinite;animation-timing-function:steps(1,end)}`;
  for (let i=0;i<count;i++) {
    const start=i*portion,end=(i+1)*portion;
    const keys=i===0 ? `0%{opacity:1}${end.toFixed(6)}%,100%{opacity:0}` : `0%{opacity:0}${start.toFixed(6)}%{opacity:1}${end.toFixed(6)}%,100%{opacity:0}`;
    css+=`${selector}.frame-${i}{animation-name:f${selector.slice(1)}${i}}@keyframes f${selector.slice(1)}${i}{${keys}}`;
  }
  return css;
}
const asciiCount=96, wireCount=120;
const asciiFrames = Array.from({length:asciiCount},(_,i) => `<g class="ascii-frame frame-${i}"><text font-size="12" fill="${C.accent}" xml:space="preserve">${torusFrame(.64+i*Math.PI*2/asciiCount,i*Math.PI*2/asciiCount).map((row,j) => `<tspan x="0" y="${j*10}">${esc(row)}</tspan>`).join('')}</text></g>`).join('');
const bootCSS = `.glyph{animation:arrive .45s cubic-bezier(.23,1,.32,1) both}@keyframes arrive{from{opacity:.35;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}${cursorCSS}${frameCSS('.ascii-frame',asciiCount,6)}`;
for (const mobile of [false,true]) {
  const w=mobile?600:1100,h=mobile?552:378;
  let body=canvas(w,h);
  body+=txt('eclipxse / README.md',mobile?36:48,39,mobile?18:15)+line(24,59,w-24,59);
  body+=wordmark('ECLIPXSE',mobile?64:48,mobile?93:107,mobile?10:12);
  const x=mobile?36:48,y=mobile?211:259,sz=mobile?21:18;
  body+=`<text x="${x}" y="${y}" font-size="${sz}"><tspan fill="${C.muted}">const developer = </tspan><tspan fill="${C.accent}">"Mario";</tspan></text>`;
  body+=txt('// full-stack developer & toolmaker',x,y+36,mobile?20:17);
  body+=`<g transform="translate(${mobile?120:713} ${mobile?289:96})">${asciiFrames}</g>`;
  if (!mobile) body+=line(678,87,678,340);
  await asset(`boot${mobile?'-mobile':''}`,w,h,'Eclipxse | Mario, developer and toolmaker','Vector pixel lettering and a rotating ASCII torus, projected from mathematics into text.',body,bootCSS);
}

// Expressive signal geometry, not a live equalizer.
function frequencyBars(x,y,width,height,count) {
  let bars='';
  for (let i=0;i<count;i++) {
    const h=(.18+Math.sin(i*.15+.5)**2*.6+Math.cos(i*.4)**2*.22)*height;
    bars+=`<g transform="translate(${(x+i*width/count).toFixed(1)} ${y})">${rect(0,-h,3.8,h*2,C.accent,`rx="1.9" class="move frequency" style="animation-delay:-${(i*.133).toFixed(3)}s;animation-duration:${(1.6+(i%5)*.21).toFixed(2)}s"`)}</g>`;
  }
  return bars;
}
const audioCSS = '.frequency{transform-origin:0 0;animation:frequency 2s ease-in-out infinite}@keyframes frequency{0%,100%{transform:scaleY(.28);opacity:.5}45%{transform:scaleY(1);opacity:1}75%{transform:scaleY(.55);opacity:.8}}';
for (const mobile of [false,true]) {
  const w=mobile?600:1100,h=mobile?372:280;
  let body=canvas(w,h);
  body+=txt('ECLIPXSE',36,52,mobile?21:17,C.muted,'letter-spacing="2"');
  body+=txt('MUSIC',32,mobile?115:120,mobile?58:62,C.text,'font-weight="700" letter-spacing="-3"');
  if (!mobile) body+=txt('Your music. Your desktop.',36,171,17)+txt('Flutter / Dart',36,216,15,C.accent);
  body+=frequencyBars(mobile?42:433,mobile?224:126,mobile?520:618,mobile?66:88,mobile?62:76);
  body+=line(24,h-56,w-24,h-56)+txt('source → MediaKit → libmpv → output',36,h-23,mobile?19:15);
  await asset(`music${mobile?'-mobile':''}`,w,h,'Eclipxse Music | Windows audio','Procedural frequency bars illustrate the music project. Audio flows through MediaKit and libmpv.',body,audioCSS);
}

// A rotating parametric knot. Seven continuous paths, sampled at 24 fps.
function knotPoint(t,s) {
  const r=1.65+.45*Math.cos(3*t+s);
  return [r*Math.cos(2*t),r*Math.sin(2*t),.85*Math.sin(3*t+s)];
}
function wireFrame(a) {
  let result='';
  for (let j=0;j<7;j++) {
    const pts=[];
    for (let i=0;i<=80;i++) {
      const p=rotate(knotPoint(i/80*Math.PI*2,j/7*Math.PI*2),.58,a),d=1/(5.5+p[2]);
      pts.push(`${i?'L':'M'}${(p[0]*285*d).toFixed(1)} ${(p[1]*245*d).toFixed(1)}`);
    }
    result+=`<path d="${pts.join('')}" fill="none" stroke="${j%3===0?C.text:C.accent}" stroke-opacity="${j%3===0?.74:.47}" stroke-width="1"/>`;
  }
  return result;
}
const wireFrames=Array.from({length:wireCount},(_,i) => `<g class="wire-frame frame-${i}">${wireFrame(i*Math.PI*2/wireCount)}</g>`).join('');
for (const mobile of [false,true]) {
  const w=mobile?600:1100,h=mobile?408:280;
  let body=canvas(w,h);
  body+=txt('ECLIPXSE.IN',32,mobile?81:109,mobile?52:57,C.text,'font-weight="700" letter-spacing="-3"');
  body+=txt('Design × interaction × code.',36,mobile?126:154,mobile?21:18,C.accent);
  if (!mobile) body+=txt('My home on the web.',36,197,17);
  body+=`<g transform="translate(${mobile?302:843} ${mobile?262:145})${mobile?' scale(1.2)':''}">${wireFrames}</g>`;
  await asset(`portfolio${mobile?'-mobile':''}`,w,h,'Eclipxse.in | Design, interaction and code','A continuous rotating wireframe, built entirely from projected SVG paths.',body,frameCSS('.wire-frame',wireCount,5));
}
for (const mobile of [false,true]) {
  const w=mobile?600:1100,h=mobile?110:92;
  let body=canvas(w,h);
  body+=txt('$',24,mobile?62:55,mobile?24:19,C.accent)+txt('make something worth opening',mobile?54:51,mobile?62:55,mobile?24:19,C.text);
  body+=rect(mobile?466:377,mobile?43:39,mobile?12:10,mobile?24:20,C.accent,'class="move cursor"');
  await asset(`signoff${mobile?'-mobile':''}`,w,h,'Make something worth opening','A terminal prompt with a blinking cursor.',body,cursorCSS);
}

const picture = (name,alt,still=false) => `<picture>
${still?'':`  <source media="(prefers-reduced-motion: reduce) and (max-width: 600px)" srcset="./assets/readme/code/${name}-mobile-still.svg">\n`}  <source media="(max-width: 600px)" srcset="./assets/readme/code/${name}-mobile${still?'-still':''}.svg">
${still?'':`  <source media="(prefers-reduced-motion: reduce)" srcset="./assets/readme/code/${name}-still.svg">\n`}  <img src="./assets/readme/code/${name}${still?'-still':''}.svg" width="100%" alt="${alt}">
</picture>`;
function readme(still=false) { return `${picture('boot','Eclipxse. Mario, full-stack developer and toolmaker. Vector lettering and an ASCII torus.',still)}

**I'm Mario.** I build desktop tools and web experiences, with a thing for interfaces that have a personality.

[Music ↓](#user-content-eclipxse-music) &nbsp;·&nbsp; [Portfolio ↓](#user-content-eclipxsein) &nbsp;·&nbsp; [Contact](mailto:lawliet@eclipxse.in)

---

<h2 id="eclipxse-music">Eclipxse Music</h2>

<a href="https://github.com/Eclipxse/Eclipxse_music_exe">
${picture('music','Eclipxse Music. An animated audio signal for the Windows music project.',still)}
</a>

A personal Windows build of [Musify](https://github.com/gokadzev/Musify), tuned for desktop listening. Local audio, a compact player, native media controls, and an eight-band equalizer.

**[Download for Windows ↗](https://github.com/Eclipxse/Eclipxse_music_exe/releases/latest)** &nbsp;·&nbsp; [Repository](https://github.com/Eclipxse/Eclipxse_music_exe)

<details>
<summary><code>inspect music</code>: stack &amp; controls</summary>

\`Flutter\` · \`Dart\` · \`MediaKit\` · \`libmpv\`

| Shortcut | Action |
| :--- | :--- |
| \`Ctrl + O\` | Open local audio |
| \`Ctrl + Shift + M\` | Toggle compact player |
| \`Ctrl + Space\` | Play / pause |

Customized from the open-source Musify project. Corresponding source archives are included with the [Windows releases](https://github.com/Eclipxse/Eclipxse_music_exe/releases).

</details>

<br>

<h2 id="eclipxsein">Eclipxse.in</h2>

<a href="https://eclipxse.in/">
${picture('portfolio','Eclipxse.in. A rotating wireframe made from mathematical paths.',still)}
</a>

My corner of the web: selected work, sculptural scroll sequences, deliberate typography, and the details that make a website feel personal.

**[Open the portfolio ↗](https://eclipxse.in/)** &nbsp;·&nbsp; [Source](https://github.com/Eclipxse/Eclipxse)

<details>
<summary><code>inspect portfolio</code>: under the hood</summary>

\`JavaScript\` · \`GSAP\` · \`Lenis\` · \`HTML / CSS\`

A custom static site with scroll-driven animation, project previews, and dedicated work pages.

</details>

---

**Something interesting to build?** [Email me](mailto:lawliet@eclipxse.in) or find me on [LinkedIn](https://www.linkedin.com/in/eclipxse/).

${picture('signoff','Terminal prompt: make something worth opening.',still)}

<sub>[Profile code](./scripts/build-profile.mjs) &nbsp;·&nbsp; [${still?'Animated edition':'Still edition'}](./${still?'README.md':'README-static.md'})</sub>
`; }
await writeFile(join(root,'README.md'),readme());
await writeFile(join(root,'README-static.md'),readme(true));
console.log(`Built code-only profile at ${root}`);
console.log('16 self-contained SVGs with desktop, mobile and still variants; zero dependencies.');
