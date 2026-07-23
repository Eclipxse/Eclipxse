"""Generate the portfolio's project case-study pages from structured content."""

from __future__ import annotations

import html
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


PROJECTS = [
    {
        "slug": "gamertheorys",
        "title": "GamerTheorys",
        "category": "Full-stack gaming platform",
        "year": "2026",
        "description": (
            "A full-stack gaming product that brings esports, studio services, "
            "hosting and creator workflows into one focused platform."
        ),
        "role": "Product design + full-stack development",
        "stack": "Full-stack web · Responsive UI · Product architecture",
        "status": "Portfolio build",
        "cover": "/assets/images/projects/EclipxseCovers/gamertheorys-polished.webp",
        "cover_alt": "GamerTheorys gaming platform homepage",
        "overview_title": "One platform, several kinds of player",
        "overview": (
            "GamerTheorys needed to speak to competitive players, creators and "
            "teams without feeling like several unrelated products. I treated the "
            "homepage as a product map: the hierarchy introduces the ecosystem, "
            "then moves through proof, services and clear routes into the platform."
        ),
        "focus": [
            (
                "Information architecture",
                "The offer is grouped around real user intent, so competitive play, "
                "studio work and infrastructure remain easy to scan.",
            ),
            (
                "Responsive product UI",
                "Dense metrics and gaming visuals collapse into a readable mobile "
                "flow without losing the platform's energy.",
            ),
            (
                "Service storytelling",
                "Capability, scale and credibility are communicated with concise "
                "sections instead of a wall of feature claims.",
            ),
        ],
        "decisions_title": "A gaming identity with product discipline",
        "decisions": (
            "The interface uses a high-contrast black and yellow system, but the "
            "structure stays measured. Repeated spacing, controlled type scales and "
            "a consistent card language keep the presentation useful as well as loud."
        ),
        "build": [
            ("Primary challenge", "Unifying several gaming services"),
            ("Design direction", "High contrast, competitive, direct"),
            ("Responsive goal", "Preserve hierarchy on small screens"),
            ("Outcome", "A clearer product and service story"),
        ],
        "gallery": [
            (
                "/assets/images/projects/galleries/gamertheorys/full-homepage.webp",
                "Full homepage",
                "Complete product narrative",
            ),
            (
                "/assets/images/projects/galleries/gamertheorys/hero-focus.webp",
                "Hero system",
                "Positioning and primary actions",
            ),
            (
                "/assets/images/projects/galleries/gamertheorys/platform-metrics.webp",
                "Platform metrics",
                "Scale presented as product proof",
            ),
        ],
        "current": (
            "This case study documents the portfolio build and the thinking behind "
            "its product presentation. A public source repository is not linked."
        ),
        "actions": [],
    },
    {
        "slug": "eclipxse-in",
        "title": "Eclipxse.in",
        "category": "Interactive portfolio",
        "year": "2025",
        "description": (
            "An earlier Nuxt portfolio that turned my work into a game-like, "
            "exploratory web experience."
        ),
        "role": "Design + front-end development",
        "stack": "Nuxt · Vue · TypeScript",
        "status": "Archived portfolio",
        "cover": "/assets/images/projects/EclipxseCovers/eclipxse-in-polished.webp",
        "cover_alt": "Earlier Eclipxse.in interactive portfolio",
        "overview_title": "A portfolio built around discovery",
        "overview": (
            "This version of Eclipxse.in explored a more game-like way to browse a "
            "developer portfolio. Rather than treating every project as a static card, "
            "the interface used a navigable visual world, character-led moments and "
            "reusable panels to make moving through the work feel deliberate."
        ),
        "focus": [
            (
                "Game-like identity",
                "The presentation borrows the sense of discovery and progression "
                "from games without turning the content into a puzzle.",
            ),
            (
                "Clear navigation",
                "Expressive visuals are balanced by repeatable controls and visible "
                "routes back to the main project library.",
            ),
            (
                "Reusable interface",
                "Nuxt and Vue components keep cards, panels and content states "
                "consistent across the experience.",
            ),
        ],
        "decisions_title": "Interaction was part of the identity",
        "decisions": (
            "The strongest lesson from this build was that motion works best when it "
            "explains structure. Transitions, hover states and layered scenes were "
            "designed to tell the visitor where they were going—not simply decorate "
            "the page."
        ),
        "build": [
            ("Framework", "Nuxt with Vue and TypeScript"),
            ("Visual system", "Character-led, layered and playful"),
            ("Interaction goal", "Make browsing feel exploratory"),
            ("Current state", "Archived as an earlier portfolio"),
        ],
        "gallery": [
            (
                "/assets/images/projects/galleries/eclipxse-in/full-homepage.webp",
                "Homepage",
                "The complete interactive composition",
            ),
            (
                "/assets/images/projects/galleries/eclipxse-in/game-library.webp",
                "Project library",
                "Work presented as a browsable system",
            ),
            (
                "/assets/images/projects/galleries/eclipxse-in/lawliet-pixel-art.webp",
                "Character detail",
                "Custom pixel-art identity",
            ),
        ],
        "current": (
            "The site is preserved as an earlier chapter of my portfolio. Its "
            "component structure and interaction experiments informed the more "
            "editorial direction of the current site."
        ),
        "actions": [
            ("View source", "https://github.com/Eclipxse/Eclifolio"),
        ],
    },
    {
        "slug": "lizziee",
        "title": "Lizziee",
        "category": "Creative portfolio",
        "year": "2026",
        "description": (
            "An expressive React portfolio built from custom illustration, pastel "
            "surfaces and a deliberately paced scroll experience."
        ),
        "role": "Design + front-end development",
        "stack": "React · Vite · Tailwind · GSAP · Lenis",
        "status": "Open source",
        "cover": "/assets/images/projects/EclipxseCovers/lizziee-polished.webp",
        "cover_alt": "Lizziee illustrated creative portfolio",
        "overview_title": "Personality first, structure underneath",
        "overview": (
            "Lizziee is a creative portfolio with a softer visual voice: hand-drawn "
            "character art, broad pastel fields and oversized type. Underneath that "
            "surface is a strict responsive system that keeps the narrative legible "
            "as the composition shifts from wide desktop scenes to a single mobile flow."
        ),
        "focus": [
            (
                "Custom illustration",
                "Character artwork is treated as the central voice of the site, "
                "with composition built around it instead of added afterward.",
            ),
            (
                "Scroll pacing",
                "GSAP and Lenis support measured reveals and transitions that keep "
                "the long page moving without becoming restless.",
            ),
            (
                "Responsive composition",
                "The layout changes its balance at smaller widths while preserving "
                "type hierarchy, artwork and clear reading order.",
            ),
        ],
        "decisions_title": "Soft visuals, firm layout rules",
        "decisions": (
            "A portfolio this expressive can become difficult to navigate quickly. "
            "The solution was a compact palette, repeated spacing rules and a small "
            "set of motion patterns. The art stays distinctive while the interface "
            "remains predictable."
        ),
        "build": [
            ("Runtime", "React and Vite"),
            ("Styling", "Tailwind CSS"),
            ("Motion", "GSAP with Lenis scrolling"),
            ("Source", "Public repository"),
        ],
        "gallery": [
            (
                "/assets/images/projects/galleries/lizziee/full-homepage.webp",
                "Full homepage",
                "Long-form visual narrative",
            ),
            (
                "/assets/images/projects/galleries/lizziee/character-study.webp",
                "Character study",
                "Illustration as interface identity",
            ),
            (
                "/assets/images/projects/galleries/lizziee/side-profile.webp",
                "Profile composition",
                "Artwork and type in balance",
            ),
        ],
        "current": (
            "The implementation is available publicly and serves as a focused "
            "example of combining custom illustration with a production-ready "
            "React front end."
        ),
        "actions": [
            ("View source", "https://github.com/Eclipxse/Lizzie"),
        ],
    },
    {
        "slug": "godot-farming",
        "title": "Godot Farming",
        "category": "2D game prototype",
        "year": "2026",
        "description": (
            "A small farming-game prototype used to build the foundations of a "
            "tile-based world, player movement and repeatable interactions."
        ),
        "role": "Game design + programming",
        "stack": "Godot 4 · GDScript · TileMaps",
        "status": "Prototype",
        "cover": "/assets/images/projects/EclipxseCovers/godot-farming-real.webp",
        "cover_alt": "Godot editor showing the farming game prototype",
        "overview_title": "Building the loop from the ground up",
        "overview": (
            "The prototype focuses on the parts that make a farming game feel "
            "coherent: a readable world grid, responsive movement, scene ownership "
            "and interactions that can be repeated without creating one-off logic "
            "for every object."
        ),
        "focus": [
            (
                "Scene structure",
                "Player, world and interaction responsibilities are separated so "
                "new mechanics can be added without rewriting the map.",
            ),
            (
                "Tile-based world",
                "Layered TileMaps organize terrain, water, decoration and collision "
                "while keeping iteration fast inside the editor.",
            ),
            (
                "Interaction loop",
                "The input and state flow is designed around repeatable actions that "
                "can later support tools, crops and progression.",
            ),
        ],
        "decisions_title": "Prototype the system, not only the scene",
        "decisions": (
            "The goal was not to draw a finished map and stop there. The project "
            "tests whether the world can accept more content without its logic "
            "becoming brittle, using reusable scenes and clear ownership for each "
            "piece of game state."
        ),
        "build": [
            ("Engine", "Godot 4"),
            ("World model", "Layered TileMaps"),
            ("Code", "GDScript scene logic"),
            ("Scope", "Playable systems prototype"),
        ],
        "gallery": [
            (
                "/assets/images/projects/galleries/godot-farming/godot-editor.webp",
                "Editor overview",
                "World and scene workflow",
            ),
            (
                "/assets/images/projects/galleries/godot-farming/farm-map.webp",
                "Farm map",
                "Tile-based playable space",
            ),
            (
                "/assets/images/projects/galleries/godot-farming/scene-structure.webp",
                "Scene structure",
                "Reusable nodes and responsibilities",
            ),
        ],
        "current": (
            "This remains a working prototype rather than a released game. The next "
            "useful milestone is expanding the interaction layer into tools, crop "
            "state and a complete day-to-day loop."
        ),
        "actions": [],
    },
    {
        "slug": "blunt38",
        "title": "blunt38",
        "category": "Discord platform",
        "year": "2026",
        "description": (
            "A UI-first Discord platform combining moderation, music, community "
            "systems, AI tools and a real-time web dashboard."
        ),
        "role": "System design + full-stack development",
        "stack": "TypeScript · discord.js · Supabase · Next.js · Lavalink",
        "status": "Open source",
        "cover": "/assets/images/projects/EclipxseCovers/blunt38.webp",
        "cover_alt": "Blunt38 Discord platform identity",
        "overview_title": "A Discord product, not a command pile",
        "overview": (
            "Blunt38 is organized as a platform with 26 command groups spanning "
            "moderation, tickets, roles, leveling, temporary voice channels, music, "
            "AI providers and server setup. A Next.js dashboard extends those systems "
            "beyond Discord, including real-time experiences such as Draw Party."
        ),
        "focus": [
            (
                "Modular command system",
                "Features are divided into clear domains so a large command surface "
                "can grow without turning every handler into shared state.",
            ),
            (
                "Persistent platform data",
                "Supabase and Postgres support configuration, progression and "
                "community state across the bot and dashboard.",
            ),
            (
                "Bot + web experience",
                "The Discord client, Lavalink audio layer and Next.js dashboard are "
                "treated as connected surfaces of one product.",
            ),
        ],
        "decisions_title": "Complex underneath, clear at the surface",
        "decisions": (
            "The product is intentionally UI-first. Commands, dashboard controls and "
            "automated flows are written around understandable outcomes, while the "
            "service boundaries underneath keep music, moderation, AI and community "
            "features independently maintainable."
        ),
        "build": [
            ("Command surface", "26 feature groups"),
            ("Data layer", "Supabase and Postgres"),
            ("Audio", "Lavalink-backed music"),
            ("Web layer", "Next.js dashboard + Draw Party"),
        ],
        "gallery": [
            (
                "/assets/images/projects/galleries/blunt38/brand-banner.webp",
                "Platform banner",
                "Blunt38 product identity",
            ),
            (
                "/assets/images/projects/galleries/blunt38/brand-mark.webp",
                "Brand mark",
                "Compact community-facing asset",
            ),
        ],
        "current": (
            "The source is public and the privacy policy is available as a stable "
            "route for Discord platform review. The project remains an active base "
            "for new community and dashboard features."
        ),
        "actions": [
            ("View source", "https://github.com/Eclipxse/Blunt38"),
            ("Privacy policy", "/privacy/"),
        ],
    },
    {
        "slug": "game-research",
        "title": "Game RE Study",
        "category": "Technical research",
        "year": "2026",
        "description": (
            "A documented runtime-analysis study using observation, memory scanning "
            "and controlled value testing to understand a game's internal state."
        ),
        "role": "Runtime analysis + documentation",
        "stack": "Cheat Engine · Memory scanning · Debugging",
        "status": "Research study",
        "cover": "/assets/images/projects/EclipxseCovers/game-re-it-takes-two.webp",
        "cover_alt": "Game reverse-engineering research presentation",
        "overview_title": "Turning visible behaviour into testable state",
        "overview": (
            "The study starts with a visible change in the game, narrows possible "
            "addresses through repeated scans and then validates each candidate under "
            "controlled conditions. The point is the method: observe, form a hypothesis, "
            "test it and document what the runtime actually does."
        ),
        "focus": [
            (
                "Runtime observation",
                "A repeatable in-game behaviour creates a reliable before-and-after "
                "signal for the investigation.",
            ),
            (
                "Address narrowing",
                "Successive value scans reduce a large memory space into candidates "
                "that can be validated individually.",
            ),
            (
                "Responsible documentation",
                "The work records the analysis process and its limits without "
                "shipping a distributable cheat or automated exploit.",
            ),
        ],
        "decisions_title": "Evidence before assumptions",
        "decisions": (
            "Memory analysis becomes noise when each test changes several variables. "
            "This workflow keeps one observable condition at a time, records the scan "
            "state and retests candidates after scene or value changes before drawing "
            "a conclusion."
        ),
        "build": [
            ("Method", "Observe, scan, narrow, validate"),
            ("Tooling", "Cheat Engine"),
            ("Output", "Process documentation"),
            ("Boundary", "No distributable cheat or automation"),
        ],
        "gallery": [
            (
                "/assets/images/projects/galleries/game-research/research-thumbnail.webp",
                "Research overview",
                "The documented study",
            ),
            (
                "/assets/images/projects/galleries/game-research/memory-scan.webp",
                "Memory scan",
                "Candidate address narrowing",
            ),
            (
                "/assets/images/projects/galleries/game-research/raven-focus.webp",
                "Presentation detail",
                "Communicating the method clearly",
            ),
        ],
        "current": (
            "The case study is presented as a technical learning record. It documents "
            "the reasoning and debugging workflow rather than distributing a tool "
            "that modifies the game."
        ),
        "actions": [],
    },
    {
        "slug": "marishoku-os",
        "title": "MARISHOKU/OS",
        "category": "Debian remix",
        "year": "2026",
        "description": (
            "An experimental Debian 13 and Plasma 6 remix with custom profiles, "
            "desktop tooling, package builds and a reproducible hybrid ISO pipeline."
        ),
        "role": "System design + Linux customization",
        "stack": "Debian 13 · Plasma 6 · Python · live-build",
        "status": "Experimental V1.3",
        "cover": "/assets/images/projects/EclipxseCovers/marishoku-os.webp",
        "cover_alt": "MARISHOKU OS desktop concept",
        "overview_title": "From desktop idea to reproducible system",
        "overview": (
            "MARISHOKU/OS explores how far a cohesive desktop concept can be carried "
            "through a real Debian-based build. It combines Plasma theming, custom "
            "tools, OMOTE and URA profiles, a Debian package and a repeatable live-build "
            "configuration for producing a hybrid ISO."
        ),
        "focus": [
            (
                "Boot-to-desktop flow",
                "Branding, session defaults and the desktop shell are treated as one "
                "continuous experience rather than disconnected themes.",
            ),
            (
                "Custom desktop layer",
                "Profiles, tooling and Plasma configuration shape the working "
                "environment while retaining Debian's package foundation.",
            ),
            (
                "Reproducible builds",
                "Package and ISO automation make the experiment repeatable instead of "
                "depending on one hand-configured machine.",
            ),
        ],
        "decisions_title": "A concept that can actually be rebuilt",
        "decisions": (
            "The project separates visual assets, desktop defaults, package contents "
            "and live-build configuration. That makes changes traceable and allows a "
            "fresh image to be produced from source rather than copied from an existing "
            "installation."
        ),
        "build": [
            ("Base", "Debian 13"),
            ("Desktop", "KDE Plasma 6"),
            ("Distribution", "Debian package + hybrid ISO"),
            ("Validation", "Hardware installer testing pending"),
        ],
        "gallery": [
            (
                "/assets/images/projects/galleries/marishoku-os/boot-screen.webp",
                "Boot screen",
                "The start of the system flow",
            ),
            (
                "/assets/images/projects/galleries/marishoku-os/desktop-concept.webp",
                "Desktop concept",
                "Custom Plasma environment",
            ),
            (
                "/assets/images/projects/galleries/marishoku-os/omote-wallpaper.webp",
                "OMOTE profile",
                "One side of the desktop system",
            ),
            (
                "/assets/images/projects/galleries/marishoku-os/ura-wallpaper.webp",
                "URA profile",
                "Alternate desktop profile",
            ),
        ],
        "current": (
            "Package and ISO builds are working. The project is explicitly experimental: "
            "physical-hardware validation and the full installer path still need testing "
            "before it should be treated as a general-purpose distribution."
        ),
        "actions": [
            ("View source", "https://github.com/Eclipxse/Eclipxse_OS"),
        ],
    },
    {
        "slug": "eclipxse-beam",
        "title": "Eclipxse Beam",
        "category": "Native + web app",
        "year": "2026",
        "description": (
            "A Rust desktop app and web companion for encrypted peer-to-peer file "
            "transfer with QR pairing and no account requirement."
        ),
        "role": "Native + web development",
        "stack": "Rust · Slint · WebRTC · PeerJS",
        "status": "Open source · Windows x64",
        "cover": "/assets/images/projects/EclipxseCovers/eclipxse-beam.webp",
        "cover_alt": "Eclipxse Beam peer-to-peer file transfer app",
        "overview_title": "Move the file directly",
        "overview": (
            "Eclipxse Beam pairs a native Windows sender with a browser-based receiver. "
            "A QR code handles discovery, WebRTC carries the encrypted peer-to-peer "
            "transfer and the workflow avoids accounts or cloud payload storage."
        ),
        "focus": [
            (
                "Fast pairing",
                "The desktop app presents a QR code that opens the correct receiver "
                "session without manual server or account setup.",
            ),
            (
                "Direct transfer",
                "WebRTC moves payloads between peers while PeerJS handles the signaling "
                "needed to establish the connection.",
            ),
            (
                "Safe file handling",
                "Incoming writes use collision-safe naming so an existing file is not "
                "silently overwritten.",
            ),
        ],
        "decisions_title": "Reduce the ceremony around local transfer",
        "decisions": (
            "The product is built around one short path: select, scan, receive. Rust "
            "and Slint keep the sender lightweight and native, while the web companion "
            "makes the receiving side available without an install."
        ),
        "build": [
            ("Desktop", "Rust + Slint"),
            ("Transport", "Encrypted WebRTC"),
            ("Pairing", "QR code + PeerJS signaling"),
            ("Data model", "No accounts or cloud payload storage"),
        ],
        "gallery": [
            (
                "/assets/images/projects/galleries/eclipxse-beam/send.webp",
                "Send flow",
                "Select and prepare a transfer",
            ),
            (
                "/assets/images/projects/galleries/eclipxse-beam/receive.webp",
                "Receive flow",
                "Browser-based companion",
            ),
            (
                "/assets/images/projects/galleries/eclipxse-beam/transfer.webp",
                "Transfer state",
                "Direct peer-to-peer progress",
            ),
        ],
        "current": (
            "The current release targets Windows x64 and is unsigned. Folder transfer "
            "and resumable transfers remain future work; the direct single-file path "
            "is the present focus."
        ),
        "actions": [
            ("Open web app", "https://eclipxse.github.io/Eclipxse_beam/"),
            ("View source", "https://github.com/Eclipxse/Eclipxse_beam"),
            (
                "Download Windows build",
                "https://github.com/Eclipxse/Eclipxse_beam/releases/latest",
            ),
        ],
    },
]


def esc(value: str) -> str:
    return html.escape(value, quote=True)


def action_markup(actions: list[tuple[str, str]]) -> str:
    if not actions:
        return '<a class="case-action" href="#project-story">Read the story <span>↓</span></a>'

    links = []
    for label, url in actions:
        external = url.startswith("http")
        attrs = ' target="_blank" rel="noopener noreferrer"' if external else ""
        links.append(
            f'<a class="case-action" href="{esc(url)}"{attrs}>'
            f'{esc(label)} <span>{"↗" if external else "→"}</span></a>'
        )
    return "\n          ".join(links)


def gallery_markup(items: list[tuple[str, str, str]]) -> str:
    figures = []
    for index, (image, label, note) in enumerate(items, start=1):
        figures.append(
            f"""<figure class="gallery-item reveal">
          <div class="gallery-frame">
            <img src="{esc(image)}" alt="{esc(label)} — {esc(note)}"
              loading="lazy" decoding="async" data-parallax>
          </div>
          <figcaption><span>{index:02d} / {esc(label)}</span><span>{esc(note)}</span></figcaption>
        </figure>"""
        )
    return "\n        ".join(figures)


def render(project: dict, index: int, next_project: dict) -> str:
    canonical = f"https://eclipxse.in/works/{project['slug']}/"
    social = f"https://eclipxse.in/assets/images/social/{project['slug']}.jpg"
    structured_data = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "name": project["title"],
        "url": canonical,
        "image": social,
        "description": project["description"],
        "creator": {
            "@type": "Person",
            "name": "Eclipxse",
            "url": "https://eclipxse.in/",
        },
        "dateCreated": project["year"],
    }

    focuses = "\n      ".join(
        f"""<article class="focus-card reveal">
        <span>{number:02d}</span>
        <h3>{esc(title)}</h3>
        <p>{esc(body)}</p>
      </article>"""
        for number, (title, body) in enumerate(project["focus"], start=1)
    )
    build = "\n              ".join(
        f"<div><dt>{esc(label)}</dt><dd>{esc(value)}</dd></div>"
        for label, value in project["build"]
    )

    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(project["title"])} — Case study · Eclipxse</title>
  <meta name="description" content="{esc(project["description"])}">
  <meta name="theme-color" content="#0a0a0a">
  <link rel="canonical" href="{canonical}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Eclipxse">
  <meta property="og:title" content="{esc(project["title"])} — Case study">
  <meta property="og:description" content="{esc(project["description"])}">
  <meta property="og:url" content="{canonical}">
  <meta property="og:image" content="{social}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{esc(project["title"])} project preview">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(project["title"])} — Case study">
  <meta name="twitter:description" content="{esc(project["description"])}">
  <meta name="twitter:image" content="{social}">
  <meta name="twitter:image:alt" content="{esc(project["title"])} project preview">
  <link rel="icon" href="/assets/favicon/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/assets/favicon/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="/assets/favicon/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles/case-study.css?v=20260723-r3">
  <script type="application/ld+json">{json.dumps(structured_data, ensure_ascii=False, separators=(",", ":"))}</script>
</head>
<body class="project-{esc(project["slug"])}">
  <div class="scroll-progress" id="scroll-progress" aria-hidden="true"></div>
  <header class="case-header" id="case-header">
    <a class="case-brand" href="/" aria-label="Eclipxse home">Eclipxse</a>
    <nav class="case-nav" aria-label="Case study navigation">
      <a href="/works/">All work</a>
      <span>Case study</span>
      <span class="case-count">{index:02d} / {len(PROJECTS):02d}</span>
    </nav>
  </header>

  <main>
    <section class="case-hero" aria-labelledby="case-title">
      <p class="case-kicker"><i aria-hidden="true"></i>{esc(project["category"])} · {esc(project["year"])}</p>
      <h1 class="case-title" id="case-title">{esc(project["title"])}</h1>
      <p class="case-lead">{esc(project["description"])}</p>
      <div class="case-actions">
        {action_markup(project["actions"])}
      </div>
      <dl class="case-facts">
        <div class="case-fact"><dt>Role</dt><dd>{esc(project["role"])}</dd></div>
        <div class="case-fact"><dt>Stack</dt><dd>{esc(project["stack"])}</dd></div>
        <div class="case-fact"><dt>Status</dt><dd>{esc(project["status"])}</dd></div>
        <div class="case-fact"><dt>Year</dt><dd>{esc(project["year"])}</dd></div>
      </dl>
    </section>

    <figure class="case-hero-media">
      <img src="{esc(project["cover"])}" alt="{esc(project["cover_alt"])}"
        width="1600" height="900" fetchpriority="high" decoding="async" data-parallax>
    </figure>

    <div class="case-content" id="project-story">
      <section class="case-section reveal">
        <p class="section-index"><span>01</span> / Overview</p>
        <div class="section-copy">
          <h2>{esc(project["overview_title"])}</h2>
          <p>{esc(project["overview"])}</p>
        </div>
      </section>

      <div class="focus-grid">
      {focuses}
      </div>

      <section class="light-section">
        <div class="light-inner reveal">
          <p class="section-index"><span>02</span> / Build decisions</p>
          <div class="light-copy">
            <h2>{esc(project["decisions_title"])}</h2>
            <p>{esc(project["decisions"])}</p>
            <dl class="build-list">
              {build}
            </dl>
          </div>
        </div>
      </section>

      <section class="gallery-section">
        <div class="gallery-head reveal">
          <p class="section-index"><span>03</span> / Selected views</p>
          <h2>Inside the project</h2>
        </div>
        <div class="gallery-list">
        {gallery_markup(project["gallery"])}
        </div>
      </section>

      <section class="case-end">
        <div class="case-end-copy reveal">
          <p class="section-index"><span>04</span> / Current state</p>
          <h2>Where it stands now</h2>
          <p>{esc(project["current"])}</p>
        </div>
        <a class="next-project reveal" href="/works/{esc(next_project["slug"])}/">
          <span>
            <small>Next case study</small>
            <strong>{esc(next_project["title"])}</strong>
          </span>
          <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  </main>

  <footer class="case-footer">
    <span>© 2026 Eclipxse</span>
    <a href="/contact/">Start a conversation ↗</a>
  </footer>
  <script src="/js/case-study.js?v=20260723-r1" defer></script>
</body>
</html>
"""


def main() -> None:
    for index, project in enumerate(PROJECTS, start=1):
        next_project = PROJECTS[index % len(PROJECTS)]
        destination = ROOT / "works" / project["slug"] / "index.html"
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(render(project, index, next_project), encoding="utf-8")
        print(destination.relative_to(ROOT))


if __name__ == "__main__":
    main()
