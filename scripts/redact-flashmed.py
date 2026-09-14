"""Professional frosted privacy covers for FlashMed screenshots.

Replaces crude black bars / cloudy blobs with clean rounded frosted plates.
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageStat

ROOT = Path(__file__).resolve().parents[1]
CASE = ROOT / "public" / "case-studies" / "flashmed"
SOURCE = CASE / "_source"
EDIT = ROOT / "flashmed-images-edit"


def load_clean(name: str) -> Image.Image:
    for base in (SOURCE, CASE, EDIT):
        path = base / name
        if path.exists():
            return Image.open(path).convert("RGBA")
    raise FileNotFoundError(name)


def crop_chrome(im: Image.Image, top: float = 0.145, bottom: float = 0.085) -> Image.Image:
    w, h = im.size
    return im.crop((0, int(h * top), w, int(h * (1 - bottom))))


def frost_region(
    im: Image.Image,
    box: tuple[float, float, float, float],
    *,
    blur: int = 18,
    opacity: int = 170,
    roundness: float = 0.28,
) -> Image.Image:
    """Clean frosted plate: blur underlay + solid rounded cover tinted from local color."""
    w, h = im.size
    x0 = max(0, int(box[0] * w))
    y0 = max(0, int(box[1] * h))
    x1 = min(w, int(box[2] * w))
    y1 = min(h, int(box[3] * h))
    if x1 - x0 < 4 or y1 - y0 < 4:
        return im

    region = im.crop((x0, y0, x1, y1))
    blurred = region.filter(ImageFilter.GaussianBlur(radius=blur))

    # Local average color → premium frosted tint
    stats = ImageStat.Stat(region.convert("RGB"))
    r, g, b = [int(v) for v in stats.mean]
    # Bias toward a soft neutral frost so covers look consistent
    r = int(r * 0.45 + 230 * 0.55)
    g = int(g * 0.45 + 232 * 0.55)
    b = int(b * 0.45 + 236 * 0.55)

    rw, rh = x1 - x0, y1 - y0
    radius = max(6, int(min(rw, rh) * roundness))

    plate = Image.new("RGBA", (rw, rh), (0, 0, 0, 0))
    draw = ImageDraw.Draw(plate)
    draw.rounded_rectangle([0, 0, rw - 1, rh - 1], radius=radius, fill=(r, g, b, opacity))

    # Subtle top highlight for glass feel
    highlight = Image.new("RGBA", (rw, rh), (0, 0, 0, 0))
    hdraw = ImageDraw.Draw(highlight)
    hdraw.rounded_rectangle(
        [2, 2, rw - 3, max(3, rh // 3)],
        radius=max(4, radius // 2),
        fill=(255, 255, 255, 35),
    )

    composed = Image.alpha_composite(blurred.convert("RGBA"), plate)
    composed = Image.alpha_composite(composed, highlight)

    out = im.copy()
    out.paste(composed, (x0, y0))
    return out


def save(im: Image.Image, name: str) -> None:
    rgb = im.convert("RGB")
    for folder in (CASE, EDIT):
        folder.mkdir(parents=True, exist_ok=True)
        rgb.save(folder / name, "PNG", optimize=True)
    print(f"ok {name} {rgb.size}")


def main() -> None:
    # 01 — money / sales figures only (tight plates, keep labels outside when possible)
    im = load_clean("01-admin-home.png")
    for box in [
        (0.145, 0.065, 0.255, 0.145),  # Audi value
        (0.27, 0.065, 0.40, 0.145),
        (0.42, 0.065, 0.54, 0.145),
        (0.56, 0.065, 0.70, 0.145),
        (0.72, 0.065, 0.88, 0.145),
        (0.38, 0.24, 0.58, 0.38),  # Total Sales amount
        (0.60, 0.24, 0.72, 0.38),  # %
        (0.13, 0.46, 0.30, 0.55),  # cash out
        (0.35, 0.46, 0.51, 0.55),
        (0.55, 0.46, 0.70, 0.55),
        (0.74, 0.46, 0.90, 0.55),
    ]:
        im = frost_region(im, box, blur=16, opacity=175, roundness=0.35)
    save(im, "01-admin-home.png")

    # 02 — KPI values
    im = load_clean("02-role-home.png")
    im = frost_region(im, (0.22, 0.125, 0.40, 0.195), blur=14, opacity=180, roundness=0.4)
    im = frost_region(im, (0.42, 0.125, 0.58, 0.195), blur=14, opacity=180, roundness=0.4)
    im = frost_region(im, (0.60, 0.125, 0.76, 0.195), blur=14, opacity=180, roundness=0.4)
    # hide URL tooltip
    im = frost_region(im, (0.0, 0.945, 0.42, 0.995), blur=10, opacity=200, roundness=0.2)
    save(im, "02-role-home.png")

    # 03 payments KPIs — frost only the number zone of $ cards
    im = load_clean("03-payment-schedule.png")
    if im.height >= 540:
        im = crop_chrome(im)
    for box in [
        (0.09, 0.10, 0.32, 0.19),
        (0.38, 0.10, 0.60, 0.19),
        (0.67, 0.10, 0.90, 0.19),
        (0.38, 0.25, 0.60, 0.34),
        (0.67, 0.25, 0.92, 0.36),
        (0.09, 0.56, 0.28, 0.64),
        (0.09, 0.69, 0.28, 0.77),
    ]:
        im = frost_region(im, box, blur=18, opacity=185, roundness=0.32)
    save(im, "03-payment-schedule.png")

    # 03 table — separate frosted columns for money (keep status readable)
    im = load_clean("03-payment-table.png")
    if im.height >= 540:
        im = crop_chrome(im)
    for box in [
        (0.54, 0.14, 0.64, 0.98),  # due / sale $
        (0.70, 0.08, 0.84, 0.98),  # paid due + header total
        (0.84, 0.14, 0.99, 0.98),  # remaining
    ]:
        im = frost_region(im, box, blur=14, opacity=190, roundness=0.06)
    save(im, "03-payment-table.png")

    # portal phones
    for name, box in [
        ("09-portal-phone.png", (0.28, 0.51, 0.72, 0.585)),
        ("09-portal-otp.png", (0.28, 0.43, 0.72, 0.505)),
    ]:
        im = load_clean(name)
        if im.height >= 540:
            im = crop_chrome(im, top=0.115, bottom=0.075)
        im = frost_region(im, box, blur=12, opacity=185, roundness=0.25)
        if im.width != 1024:
            nh = int(im.height * 1024 / im.width)
            im = im.resize((1024, nh), Image.LANCZOS)
        save(im, name)

    # chrome strip only
    for name in ("04-service-tickets.png", "04-job-sheet.png", "08-ai-report.png", "09-portal-requests.png"):
        if not (SOURCE / name).exists():
            continue
        im = load_clean(name)
        if im.height >= 540:
            top = 0.115 if "portal" in name else 0.145
            bottom = 0.075 if "portal" in name else 0.085
            im = crop_chrome(im, top=top, bottom=bottom)
            if im.width != 1024:
                nh = int(im.height * 1024 / im.width)
                im = im.resize((1024, nh), Image.LANCZOS)
            save(im, name)

    print("done — frosted privacy covers")


if __name__ == "__main__":
    main()
