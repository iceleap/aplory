#!/usr/bin/env python3
"""Flatten dist/ into one self-contained HTML file for sharing/publishing.

Run `npm run build` first. Output goes to dist-single/index.html: CSS and JS
inlined, font and logo embedded as data URIs, no external requests.

The wrapper tags (<!doctype>, <html>, <head>, <body>) are stripped because the
artifact host supplies its own document shell.
"""
import base64
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"
OUT = ROOT / "dist-single"
OUT.mkdir(exist_ok=True)

html = (DIST / "index.html").read_text(encoding="utf-8")


MIME = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".ttf": "font/ttf",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
}


def data_uri(name: str) -> str:
    """Files from public/ are copied to the dist root, not into dist/assets/."""
    path = DIST / name
    mime = MIME.get(path.suffix.lower(), "application/octet-stream")
    return "data:%s;base64,%s" % (mime, base64.b64encode(path.read_bytes()).decode())


def inline_css_assets(css: str) -> str:
    """Replace every url(/foo.ext) with a data URI.

    Discovered rather than hard-coded: this used to name the font and logo
    explicitly, so renaming an asset silently shipped a bundle with a dead
    absolute URL — invisible locally, broken once published.
    """
    for ref in sorted(set(re.findall(r"url\((/[^)\"']+)\)", css))):
        name = ref.lstrip("/")
        if not (DIST / name).is_file():
            raise SystemExit(
                "bundle-artifact: %s is referenced by the CSS but missing from dist/" % ref
            )
        css = css.replace(ref, data_uri(name))
        print("  inlined %s" % ref)
    return css


# Inline every built stylesheet, with asset URLs swapped for data URIs.
# Plural on purpose: once the build gained a second entry point, Vite split the
# CSS into a shared chunk plus a per-page one, and inlining only the first
# silently dropped half the styles.
links = list(re.finditer(r'<link rel="stylesheet"[^>]*href="/assets/([^"]+\.css)"[^>]*>', html))
if not links:
    raise SystemExit("bundle-artifact: no stylesheet link found in dist/index.html")
for i, link in enumerate(links):
    css = inline_css_assets((DIST / "assets" / link.group(1)).read_text(encoding="utf-8"))
    html = html.replace(link.group(0), "<style>\n%s\n</style>" % css)
print("  inlined %d stylesheet(s)" % len(links))

# Inline the built module bundle.
js_src = re.search(r'<script type="module"[^>]*src="/assets/([^"]+\.js)"[^>]*></script>', html)
js = (DIST / "assets" / js_src.group(1)).read_text(encoding="utf-8")
html = html.replace(js_src.group(0), '<script type="module">\n%s\n</script>' % js)

# The favicon link points at a file that will not exist alongside the artifact.
html = re.sub(r'<link rel="(icon|apple-touch-icon)"[^>]*>\s*', "", html)
html = re.sub(r'<link rel="preload"[^>]*>\s*', "", html)

# Strip the document shell, keeping head and body contents in order.
head = re.search(r"<head>(.*?)</head>", html, re.S).group(1)
body = re.search(r"<body>(.*?)</body>", html, re.S).group(1)
page = (head.strip() + "\n" + body.strip() + "\n")

leftover = sorted(set(re.findall(r"url\((/[^)\"']+)\)", page)))
if leftover:
    raise SystemExit(
        "bundle-artifact: absolute URLs survived and would 404 once published: %s"
        % ", ".join(leftover)
    )

# An inlined module that still imports a sibling chunk fails to execute, and a
# failed module renders *nothing* — the page goes blank with no error on screen.
# Cheap to check, so check rather than trust the build's chunking.
dangling = sorted(set(re.findall(r"""(?:import|from)\s*["'](\.{0,2}/[^"']+)["']""", page)))
if dangling:
    raise SystemExit(
        "bundle-artifact: the inlined script imports chunks that won't exist "
        "standalone, which renders a blank page: %s" % ", ".join(dangling)
    )

out = OUT / "index.html"
out.write_text(page, encoding="utf-8")
print("wrote %s — %d KB" % (out, round(out.stat().st_size / 1024)))
