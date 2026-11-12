import json
from pathlib import Path
from PIL import Image
SRC="assets/originals"; OUT="public/images"
manifest_file = Path("src/data/image-manifest.json")
existing = json.loads(manifest_file.read_text(encoding="utf-8")) if manifest_file.exists() else {}
# Keep existing manifest entries for client images without checked-in source masters.
manifest = dict(existing)
def emit(name, im, folder, widths, q=78):
    w,h=im.size; outs=[]
    for tw in widths:
        if tw>w: tw=w
        r=im if tw==w else im.resize((tw, round(h*tw/w)), Image.LANCZOS)
        p=f"{OUT}/{folder}/{name}-{tw}.webp"
        r.save(p,"WEBP",quality=q,method=6); outs.append(tw)
    manifest[f"{folder}/{name}"]={"w":w,"h":h,"widths":sorted(set(outs))}
stock=["dubai-skyline","dubai-night-boulevard","downtown-dubai","palm-jumeirah","burj-al-arab-coast","villa-illustrative","villa-garden-illustrative","apartment-interior-illustrative","dubai-tower-detail"]
for n in stock:
    emit(n, Image.open(f"{SRC}/{n}.jpg").convert("RGB"), "stock", [640,1280,1920], 72)
EDITED = Path(SRC) / "gescard-edited"
emit("gescard-portrait", Image.open(EDITED / "gescard-portrait.png").convert("RGB"), "gescard", [480,800,1122], 85)
cut=Image.open(f"{SRC}/gescard-portrait-cutout.png").convert("RGBA")
bbox=cut.getchannel("A").point(lambda a:255 if a>20 else 0).getbbox(); print("cut bbox",bbox)
cut=cut.crop((max(0,bbox[0]-40),max(0,bbox[1]-60),min(cut.width,bbox[2]+40),cut.height))
emit("gescard-portrait-cutout", cut, "gescard", [480,800,cut.width], 82)
edited_photos = [
    ("office-portrait", "office-portrait.jpg", [480,800,1200]),
    ("about-portrait", "about-portrait.jpg", [480,800,1200]),
    ("consultation", "consultation.jpg", [480,800,1200]),
    ("richkey-office", "richkey-office.png", [640,1000,1448]),
    ("emaar-awards-team-stage", "emaar-awards-team-stage.png", [640,1290,1448]),
    ("emaar-awards-team-group", "emaar-awards-team-group.png", [640,1254]),
    ("emaar-awards-duo", "emaar-awards-duo.png", [640,1290,1448]),
]
for name, filename, widths in edited_photos:
    im = Image.open(EDITED / filename).convert("RGB")
    print(name, im.size)
    emit(name, im, "gescard", widths, 85)
manifest_file.write_text(json.dumps(manifest, indent=1) + "\n", encoding="utf-8")
print(json.dumps(manifest)[:600])
