import json
from pathlib import Path
from PIL import Image, ImageStat
SRC="assets/originals"; OUT="public/images"
def trim_bars(im):
    g=im.convert("L"); w,h=g.size
    def flat(y): 
        s=ImageStat.Stat(g.crop((0,y,w,y+1))); return s.stddev[0]<6
    top=0
    while top<h//3 and flat(top): top+=1
    bot=h-1
    while bot>h*2//3 and flat(bot): bot-=1
    return im.crop((0,top,w,bot+1)) if (top>5 or h-1-bot>5) else im
manifest_file = Path("src/data/image-manifest.json")
# The newer client photos are delivered as web-ready copies. Keep their entries
# when regenerating images whose source files live in this repository.
existing = json.loads(manifest_file.read_text(encoding="utf-8")) if manifest_file.exists() else {}
client_images = ("office-portrait", "richkey-awards", "richkey-office", "consultation", "about-portrait", "awards-shelf")
manifest = {key: value for key, value in existing.items() if key.split("/")[-1] in client_images}
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
emit("gescard-portrait", Image.open(f"{SRC}/gescard-portrait.jpg").convert("RGB"), "gescard", [480,800,1002], 82)
cut=Image.open(f"{SRC}/gescard-portrait-cutout.png").convert("RGBA")
bbox=cut.getchannel("A").point(lambda a:255 if a>20 else 0).getbbox(); print("cut bbox",bbox)
cut=cut.crop((max(0,bbox[0]-40),max(0,bbox[1]-60),min(cut.width,bbox[2]+40),cut.height))
emit("gescard-portrait-cutout", cut, "gescard", [480,800,cut.width], 82)
for n in ["emaar-awards-team-stage","emaar-awards-team-group","emaar-awards-duo"]:
    im=trim_bars(Image.open(f"{SRC}/{n}.jpg").convert("RGB")); print(n, im.size)
    emit(n, im, "gescard", [640,1290], 80)
manifest_file.write_text(json.dumps(manifest, indent=1) + "\n", encoding="utf-8")
print(json.dumps(manifest)[:600])
