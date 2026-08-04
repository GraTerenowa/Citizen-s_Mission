from pathlib import Path
import argparse
import json
import qrcode
from qrcode.constants import ERROR_CORRECT_M

BASE = Path(__file__).resolve().parent
OUTPUT = BASE / "assets" / "qr"
OUTPUT.mkdir(parents=True, exist_ok=True)

parser = argparse.ArgumentParser(description="Generate printed QR codes linking to the clue page.")
parser.add_argument("--base-url", help="Public folder URL, e.g. https://example.com/nowa-huta/")
args = parser.parse_args()

settings_path = BASE / "qr_settings.json"
settings = json.loads(settings_path.read_text(encoding="utf-8"))
if args.base_url:
    settings["baseUrl"] = args.base_url
    settings_path.write_text(json.dumps(settings, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

base_url = settings["baseUrl"].strip()
if not base_url.endswith("/"):
    base_url += "/"

clues = json.loads((BASE / "qr_clues.json").read_text(encoding="utf-8"))
links = {}

for task_id in clues:
    url = f"{base_url}clue.html?task={task_id}"
    links[task_id] = url
    qr = qrcode.QRCode(version=None, error_correction=ERROR_CORRECT_M, box_size=10, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    image = qr.make_image(fill_color="#171815", back_color="#f4ecd8")
    image.save(OUTPUT / f"{task_id}.png")
    print(f"Generated: {task_id}.png -> {url}")

(BASE / "qr-links.js").write_text(
    "window.QR_LINKS = " + json.dumps(links, ensure_ascii=False, indent=2) + ";\n",
    encoding="utf-8"
)
(BASE / "QR_LINKS.txt").write_text(
    "\n".join(f"{task_id}: {url}" for task_id, url in links.items()) + "\n",
    encoding="utf-8"
)
