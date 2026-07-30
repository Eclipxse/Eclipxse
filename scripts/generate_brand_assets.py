from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
BRAND_DIR = ASSETS / "images" / "brand"
SOCIAL_DIR = ASSETS / "images" / "social"
FAVICON_DIR = ASSETS / "favicon"

BLACK = "#0a0a0a"
PAPER = "#f1f1ef"
MUTED = "#969694"
RED = "#ff3514"

FONT_REGULAR = Path("C:/Windows/Fonts/arial.ttf")
FONT_BOLD = Path("C:/Windows/Fonts/arialbd.ttf")
FONT_SERIF = Path("C:/Windows/Fonts/times.ttf")
FONT_SERIF_ITALIC = Path("C:/Windows/Fonts/timesi.ttf")
FONT_MACHINE = ASSETS / "fonts" / "Machine.otf"


PROJECTS = [
    {
        "slug": "gamertheorys",
        "name": "GamerTheorys",
        "category": "FULL-STACK GAMING PLATFORM",
        "summary": "Esports, studio services, hosting and creator workflows in one focused product experience.",
        "stack": ["FULL-STACK", "PLATFORM", "GAMING"],
        "accent": "#e7c51d",
        "cover": "assets/images/projects/EclipxseCovers/gamertheorys-polished.webp",
    },
    {
        "slug": "eclipxse-in",
        "name": "Eclipxse.in",
        "category": "INTERACTIVE PORTFOLIO",
        "summary": "An earlier Nuxt portfolio shaped around game-like navigation and an expressive developer profile.",
        "stack": ["VUE", "NUXT", "TYPESCRIPT"],
        "accent": "#ff3514",
        "cover": "assets/images/projects/EclipxseCovers/eclipxse-in-polished.webp",
    },
    {
        "slug": "lizziee",
        "name": "Lizziee",
        "category": "CREATIVE PORTFOLIO",
        "summary": "A responsive React portfolio with custom illustration, kinetic scrolling and a pastel design system.",
        "stack": ["REACT", "VITE", "GSAP"],
        "accent": "#ef9fbd",
        "cover": "assets/images/projects/EclipxseCovers/lizziee-polished.webp",
    },
    {
        "slug": "godot-farming",
        "name": "Godot Farming",
        "category": "2D GAME PROTOTYPE",
        "summary": "A Godot 4 farming prototype exploring tilemaps, scene composition and interaction systems.",
        "stack": ["GODOT 4", "GDSCRIPT", "2D"],
        "accent": "#74a7d7",
        "cover": "assets/images/projects/EclipxseCovers/godot-farming-real.webp",
    },
    {
        "slug": "blunt38",
        "name": "blunt38",
        "category": "DISCORD PLATFORM",
        "summary": "A UI-first Discord system spanning moderation, AI, music, dashboards and multiplayer drawing.",
        "stack": ["TYPESCRIPT", "DISCORD.JS", "NEXT.JS"],
        "accent": "#b878cd",
        "cover": "assets/images/projects/EclipxseCovers/blunt38.webp",
    },
    {
        "slug": "game-research",
        "name": "Game RE Study",
        "category": "TECHNICAL RESEARCH",
        "summary": "A hands-on study of runtime values, memory scans and changing game state using Cheat Engine.",
        "stack": ["RESEARCH", "MEMORY", "DEBUGGING"],
        "accent": "#ff2f91",
        "cover": "assets/images/projects/EclipxseCovers/game-re-it-takes-two.webp",
    },
    {
        "slug": "marishoku-os",
        "name": "MARISHOKU/OS",
        "category": "DEBIAN REMIX",
        "summary": "A Debian 13 and Plasma 6 remix with system-wide theming, custom tools and reproducible builds.",
        "stack": ["DEBIAN 13", "PLASMA 6", "PYTHON"],
        "accent": "#d13a96",
        "cover": "assets/images/projects/EclipxseCovers/marishoku-os.webp",
    },
    {
        "slug": "eclipxse-beam",
        "name": "Eclipxse Beam",
        "category": "NATIVE + WEB APP",
        "summary": "Private file transfer through a Rust and Slint Windows app, WebRTC and QR-based pairing.",
        "stack": ["RUST", "SLINT", "WEBRTC"],
        "accent": "#ae7748",
        "cover": "assets/images/projects/EclipxseCovers/eclipxse-beam.webp",
    },
]


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def fitted_font(text: str, path: Path, max_size: int, min_size: int, max_width: int) -> ImageFont.FreeTypeFont:
    for size in range(max_size, min_size - 1, -2):
        candidate = font(path, size)
        bbox = candidate.getbbox(text)
        if bbox[2] - bbox[0] <= max_width:
            return candidate
    return font(path, min_size)


def add_grid(image: Image.Image, color=(255, 255, 255, 13), spacing=78) -> None:
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for x in range(0, image.width, spacing):
        draw.line((x, 0, x, image.height), fill=color, width=1)
    for y in range(0, image.height, spacing):
        draw.line((0, y, image.width, y), fill=color, width=1)
    image.alpha_composite(overlay)


def draw_project_card(project: dict, index: int) -> None:
    source = Image.open(ROOT / project["cover"]).convert("RGB")
    background = ImageOps.fit(source, (1200, 630), method=Image.Resampling.LANCZOS)
    background = background.filter(ImageFilter.GaussianBlur(radius=0.35)).convert("RGBA")

    grade = Image.new("RGBA", background.size, (0, 0, 0, 0))
    grade_draw = ImageDraw.Draw(grade)
    for x in range(background.width):
        ratio = x / max(1, background.width - 1)
        alpha = int(236 - ratio * 118)
        grade_draw.line((x, 0, x, background.height), fill=(4, 4, 4, alpha))
    grade_draw.rectangle((0, 0, 14, 630), fill=project["accent"])
    grade_draw.rectangle((930, 0, 1200, 630), fill=(0, 0, 0, 38))
    background.alpha_composite(grade)
    add_grid(background, color=(255, 255, 255, 10), spacing=90)

    draw = ImageDraw.Draw(background)
    small = font(FONT_BOLD, 19)
    meta = font(FONT_BOLD, 18)
    body = font(FONT_REGULAR, 30)
    tag_font = font(FONT_BOLD, 15)

    draw.text((54, 45), "ECLIPXSE", font=small, fill=PAPER)
    draw.rectangle((177, 54, 193, 58), fill=project["accent"])
    draw.text((212, 45), "SELECTED WORK", font=small, fill=MUTED)
    draw.text((1030, 45), f"{index:02d} / 08", font=meta, fill=PAPER)

    title_font = fitted_font(project["name"], FONT_BOLD, 112, 68, 720)
    draw.text((54, 206), project["name"], font=title_font, fill=PAPER, stroke_width=1)
    draw.text((58, 177), project["category"], font=meta, fill=project["accent"])

    summary_box = (58, 352, 720, 454)
    words = project["summary"].split()
    lines = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if draw.textlength(trial, font=body) <= summary_box[2] - summary_box[0]:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    draw.multiline_text((summary_box[0], summary_box[1]), "\n".join(lines[:3]), font=body, fill=(221, 221, 217), spacing=9)

    tag_x = 58
    tag_y = 530
    for label in project["stack"]:
        width = int(draw.textlength(label, font=tag_font)) + 34
        draw.rounded_rectangle((tag_x, tag_y, tag_x + width, tag_y + 42), radius=21, outline=(230, 230, 226, 100), width=1)
        draw.text((tag_x + 17, tag_y + 12), label, font=tag_font, fill=PAPER)
        tag_x += width + 12

    draw.line((54, 606, 1146, 606), fill=(255, 255, 255, 45), width=1)
    draw.text((1044, 582), "2026", font=tag_font, fill=MUTED)

    output = SOCIAL_DIR / f"{project['slug']}.jpg"
    background.convert("RGB").save(output, "JPEG", quality=91, optimize=True, progressive=True)


def draw_generic_social() -> None:
    master = BRAND_DIR / "logo-social-master.png"
    if not master.exists():
        raise FileNotFoundError(
            "Missing assets/images/brand/logo-social-master.png. "
            "This is the approved editorial portrait composition."
        )

    image = ImageOps.fit(
        Image.open(master).convert("RGB"),
        (1200, 630),
        method=Image.Resampling.LANCZOS,
    )
    for filename in ("logo-social.jpg", "logo-social-editorial.jpg"):
        image.save(
            BRAND_DIR / filename,
            "JPEG",
            quality=92,
            optimize=True,
            progressive=True,
        )


def draw_brand_mark(size: int) -> Image.Image:
    image = Image.new("RGBA", (size, size), BLACK)
    draw = ImageDraw.Draw(image)

    bracket = round(size * 0.105)
    inset = round(size * 0.145)
    stroke = max(4, round(size * 0.025))
    draw.line(
        ((inset, inset + bracket), (inset, inset), (inset + bracket, inset)),
        fill=RED,
        width=stroke,
        joint="curve",
    )
    draw.line(
        (
            (size - inset - bracket, size - inset),
            (size - inset, size - inset),
            (size - inset, size - inset - bracket),
        ),
        fill=RED,
        width=stroke,
        joint="curve",
    )

    draw.text(
        (round(size * 0.165), round(size * 0.51)),
        "e",
        font=font(FONT_SERIF, round(size * 0.63)),
        fill=PAPER,
        anchor="lm",
    )
    draw.text(
        (round(size * 0.57), round(size * 0.525)),
        "x",
        font=font(FONT_SERIF_ITALIC, round(size * 0.41)),
        fill=RED,
        anchor="lm",
    )
    return image


def draw_square_brand() -> None:
    image = draw_brand_mark(1024)
    image.convert("RGB").save(
        BRAND_DIR / "logo-square.jpg",
        "JPEG",
        quality=95,
        optimize=True,
        progressive=True,
    )


def draw_favicons() -> None:
    base = draw_brand_mark(512)
    sizes = {
        "site-icon-512.png": 512,
        "site-icon-192.png": 192,
        "apple-touch-icon.png": 180,
        "favicon-48x48.png": 48,
        "favicon-32x32.png": 32,
        "favicon-16x16.png": 16,
    }
    for filename, size in sizes.items():
        rendered = base.resize((size, size), Image.Resampling.LANCZOS)
        rendered.save(FAVICON_DIR / filename, "PNG", optimize=True)
    base.save(
        FAVICON_DIR / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)],
    )


def main() -> None:
    BRAND_DIR.mkdir(parents=True, exist_ok=True)
    SOCIAL_DIR.mkdir(parents=True, exist_ok=True)
    FAVICON_DIR.mkdir(parents=True, exist_ok=True)
    draw_generic_social()
    draw_square_brand()
    draw_favicons()
    for index, project in enumerate(PROJECTS, 1):
        draw_project_card(project, index)
    print(f"Generated 3 brand images, 6 PNG favicons, 1 ICO, and {len(PROJECTS)} project social cards.")


if __name__ == "__main__":
    main()
