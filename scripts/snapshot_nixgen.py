"""Capture hero screenshots of NixGen client websites for the portfolio carousel."""
from playwright.sync_api import sync_playwright
from pathlib import Path

APPS = [
    {"slug": "hikewales",             "url": "https://hikewales.com"},
    {"slug": "madea",                 "url": "https://madea.io"},
    {"slug": "crave-fragrances",      "url": "https://cravefragrances.com"},
    {"slug": "madeea-pro",            "url": "https://madeea.com"},
    {"slug": "four-states-concrete",  "url": "https://fourstatesconcreterepair.com"},
    {"slug": "runpest",               "url": "https://runpest.com"},
    {"slug": "upscale-rails",         "url": "https://upscalerails.com"},
    {"slug": "colorado-river",        "url": "https://coloradoriverexpeditions.com"},
]

OUT = Path(__file__).parent.parent / "public" / "nixgen"
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORT = {"width": 1440, "height": 900}

def snap(page, app):
    url = app["url"]
    slug = app["slug"]
    print(f"-> {slug}: {url}")
    try:
        page.goto(url, wait_until="networkidle", timeout=45000)
    except Exception as e:
        print(f"  networkidle timeout, falling back to domcontentloaded: {e}")
        page.goto(url, wait_until="domcontentloaded", timeout=45000)
    page.wait_for_timeout(3000)  # let animations + fonts settle
    out_path = OUT / f"{slug}.png"
    page.screenshot(
        path=str(out_path),
        full_page=False,
        clip={"x": 0, "y": 0, "width": 1440, "height": 900},
    )
    print(f"  saved -> {out_path} ({out_path.stat().st_size} bytes)")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport=VIEWPORT,
            device_scale_factor=2,
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0 Safari/537.36",
        )
        page = context.new_page()
        for app in APPS:
            try:
                snap(page, app)
            except Exception as e:
                print(f"  FAILED: {e}")
        browser.close()

if __name__ == "__main__":
    main()
