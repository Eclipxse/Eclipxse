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
    image = Image.new("RGBA", (1200, 630), BLACK)
    add_grid(image, color=(255, 255, 255, 12), spacing=84)
    draw = ImageDraw.Draw(image)

    draw.polygon([(835, -40), (1040, -40), (910, 670), (705, 670)], fill=(255, 53, 20, 24))
    draw.rectangle((0, 0, 14, 630), fill=RED)
    draw.text((55, 45), "PORTFOLIO / 2026", font=font(FONT_BOLD, 20), fill=MUTED)
    draw.text((1044, 45), "V3.0", font=font(FONT_BOLD, 20), fill=PAPER)

    title = fitted_font("ECLIPXSE", FONT_BOLD, 160, 92, 1060)
    draw.text((52, 194), "ECLIPXSE", font=title, fill=PAPER)
    draw.rectangle((57, 376, 314, 386), fill=RED)

    draw.text((58, 422), "CREATIVE DEVELOPER / FULL-STACK BUILDER", font=font(FONT_BOLD, 29), fill=PAPER)
    draw.text((58, 468), "WEB  ·  TOOLS  ·  DISCORD SYSTEMS  ·  NATIVE APPS  ·  GAMES", font=font(FONT_BOLD, 17), fill=MUTED)

    draw.text((58, 572), "ECLIPXSE.IN", font=font(FONT_BOLD, 18), fill=PAPER)
    draw.text((1019, 572), "08 PROJECTS", font=font(FONT_BOLD, 18), fill=MUTED)

    image.convert("RGB").save(BRAND_DIR / "logo-social.jpg", "JPEG", quality=93, optimize=True, progressive=True)


def draw_square_brand() -> None:
    image = Image.new("RGBA", (1024, 1024), BLACK)
    add_grid(image, color=(255, 255, 255, 11), spacing=96)
    draw = ImageDraw.Draw(image)
    draw.polygon([(760, -60), (990, -60), (760, 1084), (530, 1084)], fill=(255, 53, 20, 30))
    draw.rectangle((0, 0, 20, 1024), fill=RED)

    e_font = font(FONT_BOLD, 600)
    e_bbox = draw.textbbox((0, 0), "E", font=e_font)
    e_w = e_bbox[2] - e_bbox[0]
    e_h = e_bbox[3] - e_bbox[1]
    draw.text(((1024 - e_w) / 2 - 16, (1024 - e_h) / 2 - e_bbox[1] - 58), "E", font=e_font, fill=PAPER)

    draw.rectangle((76, 872, 948, 874), fill=(255, 255, 255, 70))
    draw.text((76, 902), "ECLIPXSE", font=font(FONT_BOLD, 55), fill=PAPER)
    draw.text((757, 921), "2026", font=font(FONT_BOLD, 25), fill=MUTED)
    image.convert("RGB").save(BRAND_DIR / "logo-square.jpg", "JPEG", quality=94, optimize=True, progressive=True)


def draw_favicon_base() -> Image.Image:
    image = Image.new("RGBA", (512, 512), BLACK)
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, 36, 512), fill=RED)
    draw.polygon([(388, -30), (490, -30), (430, 542), (328, 542)], fill=(255, 53, 20, 36))
    e_font = font(FONT_BOLD, 350)
    bbox = draw.textbbox((0, 0), "E", font=e_font)
    width = bbox[2] - bbox[0]
    height = bbox[3] - bbox[1]
    draw.text(((512 - width) / 2 + 12, (512 - height) / 2 - bbox[1] - 4), "E", font=e_font, fill=PAPER)
    return image


def draw_favicons() -> None:
    base = draw_favicon_base()
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
    print(f"Generated 2 brand images, 6 PNG favicons, 1 ICO, and {len(PROJECTS)} project social cards.")


if __name__ == "__main__":
    main()
