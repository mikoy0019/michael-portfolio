"""Capture hero screenshots of Michael's real deployed webapps for the portfolio."""
from playwright.sync_api import sync_playwright
from pathlib import Path

APPS = [
    {"slug": "pos-app",             "url": "https://pos-app-nine-olive.vercel.app"},
    {"slug": "delivery-app",        "url": "https://deliverease-frontend.vercel.app"},
    {"slug": "supernova-dashboard", "url": "https://supernova-dashboard.vercel.app"},
    {"slug": "invoice-chase",       "url": "https://invoice-chase-rho.vercel.app"},
]

OUT = Path(__file__).parent.parent / "public" / "projects"
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
    page.wait_for_timeout(2500)  # let animations + fonts settle
    out_path = OUT / f"{slug}.png"
    page.screenshot(path=str(out_path), full_page=False, clip={"x": 0, "y": 0, "width": 1440, "height": 900})
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
