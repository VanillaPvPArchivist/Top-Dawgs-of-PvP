# Character Select Page

A character-select-style landing page: pick a class from the row of 9
icons at the top of the screen, and the background, 3D model, name,
and lore text all switch. A "Skill" / "Fun" toggle above the row swaps
in a second, different set of the same for whichever class is
currently selected.

## Files
- `index.html` — structure
- `style.css` — styling, including one background theme per class/mode
  and the class icon row
- `script.js` — `CLASS_DATA` (all the names, lore, videos, models, and
  animations) plus the logic that swaps everything when you click a
  class or a mode, and preloads assets in the background
- `models/` — `.glb` 3D model files
- `icons/` — class icon images
- `images/` — background images per class/mode
- `fonts/` — for the Morpheus font file (see below)

## Reference

**Class icons:** each button shows a real icon image
(`icons/classicon_{class}.png`) inside a thin silver-bordered square.
To change one, just replace the corresponding file in `icons/` — no
code changes needed as long as the filename stays the same.

**Backgrounds:** set per class *and* mode in `style.css`, since Skill
and Fun can each look different for the same class:
```css
[data-class="warrior"][data-mode="skill"] {
  background-image: url("images/warrior-skill.jpg");
  background-size: cover;
  background-position: center;
}
```
Any class/mode combination without its own rule falls back to a
neutral dark backdrop.

**Names, flavor text, and lore:** all in `script.js` under
`CLASS_DATA`. Each class has a `skill` and a `fun` entry with:
- `name` — shown in the read-only name field at the bottom (visitors
  can't edit it)
- `text` — a shorter flavor line (currently empty on every entry; fill
  it in if you want that line to show something)
- `lore` — the longer text shown in the right-hand panel. If it ends
  with "X/10" or "X.X/10", that gets pulled out and rendered as a
  star-rating badge next to the name instead of staying in the
  paragraph — see "Ratings" below.

**Multiple profiles per class/mode:** instead of a flat entry, a
class/mode can have a `variants` array of that same shape (each with
its own `name`, `text`, `model`, `lore`, `video`, `animation`) when
there's more than one option worth featuring — right now just
Shaman/Fun (Cabbarnuke and Unbreakable). Clicking the name header
cycles to the next variant, updating everything (lore, rating, model,
video) to match. Add more variants to any class/mode's array the same
way if you want the same behavior elsewhere.

**Ratings:** shown next to the name header, right-aligned, as a row of
10 stars (supporting genuine half-stars, not just rounding) plus the
raw score. This only appears when a `lore` string ends in "X/10"; the
rest of the text becomes the paragraph body.

**Embedded video:** a video player sits on the left side of the
screen for the current class/mode's `video` field (the id from the
YouTube URL, e.g. `"dQw4w9WgXcQ"`). It's faded to low opacity until
you hover over it or start playing it (it stays fully visible while
actually playing, even after your mouse leaves). It never autoplays —
switching class/mode loads the new video's thumbnail via YouTube's
"cue" API, ready to play on click, rather than starting it
automatically. If `video` is `null`, the box shows "No video has been
set for this class / mode yet." instead of an empty player.

**3D models + animations:** each entry points at
`models/{class}-{mode}.glb` and names which animation clip to play via
`animation` (defaults to `"Stand"`). If a model doesn't have a clip by
that name, the code automatically tries a few common alternates
("Idle", "Stand1", etc.), and if none of those match either, it plays
the file's first animation and logs a console warning listing that
file's actual animation names — check DevTools → Console if a
character is playing the wrong animation. Any class/mode without a
model file yet shows a dashed placeholder box with the expected path.
An entry can also set `cameraRadius` (e.g. `"75%"`) to zoom that
specific model in closer than the default 100% — Warlock/Fun uses this
to look bigger than the rest. min/max-camera-orbit move together with
it automatically so the zoom isn't clamped back.

**Morpheus font:** `.lore-text` is set to use "Morpheus" (the
blackletter-style font used in WoW's UI), which isn't available via
Google Fonts or any CDN — it's shareware, free for personal use only.
To enable it:
1. Download it (search "Morpheus font Kiwi Media").
2. Put the file at `fonts/Morpheus.ttf`.
3. It should just work — the `@font-face` rule in `style.css` is
   already active and pointing at that path. If it doesn't show up,
   check the Network tab in DevTools for a 404 on `Morpheus.ttf` —
   that usually means a filename/case mismatch or the file didn't get
   pushed to the repo.
Until the font file is present, `.lore-text` falls back to EB
Garamond automatically.

**Preloading:** on page load, once the first model (Warrior/Skill)
finishes loading, the page automatically starts fetching every other
model and background image in the background — no clicking required
for them to warm up. This means the very first visit downloads
everything eventually, so if your `.glb` files are large, keeping them
compressed (see below) matters more than it otherwise would.

**Honorable Mentions:** the button at the bottom of the main screen
slides the whole page up and out, replaced by a second scene sliding
up from below (see `body.honorable-open` in `style.css` for the
transition). That scene has the same 9 class icons in a vertical
column down the center — click one to populate a list of names on
each side ("Fun" on the left, "Skill" on the right), all sharing one
uniform box width across both lists together (sized to whichever name,
on either side, is longest). This data lives separately from the main
`CLASS_DATA`, in `HONORABLE_MENTIONS` further down in `script.js`:
each class has a `skill` and `fun` array, and you can add or remove
entries freely — each is just `{ name: "...", lore: "...", video: "..." }`
(use `video: null` if there's no video for that entry yet).

Clicking a name only ever controls the video: if that entry has one,
it appears in a single shared, unstyled floating slot (no border or
background of its own) positioned next to whichever entry was clicked
— to the right for a Fun entry, to the left for a Skill entry, both
opening toward the center. It's a top-level element rather than
nested inside either list, so it can never be clipped by a list's
scroll area, and it never affects any entry's position or width.

`lore` on an individual entry currently does nothing on its own —
lore only ever shows via a class's own `note` field (a sibling of
`skill` and `fun`, not inside them): free-flowing text shown next to
the lists the moment you click a class icon, typed out
letter-by-letter, and vertically aligned with that class's own icon in
the column. Only Rogue and Mage have one set right now; any class
without a `note` just shows nothing there. If you want a class's
honorable-mention lore to actually appear, write (or move) it into
that class's `note` field.

The "Back" button at the top returns to the main scene, and the icon
column's left edge is kept aligned with the Back button's left edge
(computed in JS, since the button's width depends on its own
text/padding).

The Honorable Mentions scene has its own background, separate from the
main screen's per-class ones — search `style.css` for `.honorable-scene`
for the comment showing how to point it at an image. It's one image
for the whole scene (not per-class), and shows a solid dark color
until you set one.

On the main screen, the big character name header (e.g. "Bobo",
"Arthus") is tinted to match the currently selected class's official
WoW color — search `style.css` for `body[data-class=` to find/adjust
these. (Honorable Mentions' entry boxes are plain now — that tinting
was tried and then removed.)

Every element on the Honorable Mentions scene (headers, icons, labels,
entry boxes, the note text, the video slot, the Back button) is sized
about 25% larger than an earlier version of this scene — done as
individual font-size/dimension bumps throughout its section of
`style.css` rather than a single CSS transform, to avoid any risk of
content clipping at the screen edges.

**Background music:** `audio/wow-login-music.mp3` plays on a loop,
starting silent and fading in to about a quarter volume over a few
seconds. Browsers generally block audio-with-sound from autoplaying
until the visitor has interacted with the page somehow (clicked,
typed, tapped) — the code tries to start playback right away, and if
that's blocked, waits for the first click/keypress/tap anywhere on the
page and starts then instead, so it should always start eventually
either way, just not always instantly. The volume button, bottom-left
and visible on both scenes, expands a horizontal slider and a
pause/play button when clicked, and collapses again automatically 3
seconds after the last interaction with either control. Once a
visitor touches the slider, the auto fade-in stops adjusting the
volume for them so their choice sticks. The music also automatically
pauses itself while the main video player is actually playing, and
resumes 1.5 seconds after the video stops — that short delay is
deliberate: skipping/seeking through a video fires brief
buffering/paused states between seeks, and without the delay the music
would blip back in during every one of those instead of only when
playback genuinely stops. Unless the visitor paused the music
manually, in which case it stays paused either way. (This only applies
to the main video player, which has real play/state detection via the
YouTube API; the plain-iframe videos inside Honorable Mentions entries
don't pause the music, since there's no equivalent way to detect their
play state.) To use a different track, replace the file at that path
(or update the `<audio>` element's `src` in `index.html` if you rename
it).

## Deploying to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Add `index.html`, `style.css`, `script.js`, and the `models/`,
   `icons/`, `images/`, and `fonts/` folders to the repo root — or into
   a `/docs` folder if you prefer.
3. Commit and push.
4. In the repo, go to **Settings → Pages**.
5. Under "Build and deployment", set **Source** to "Deploy from a
   branch", pick your branch (usually `main`) and the folder (`/` or
   `/docs`), then save.
6. GitHub will give you a URL like `https://yourusername.github.io/yourrepo/`
   within a minute or two.

No build step is required — this is plain HTML/CSS/JS. GitHub Pages'
filesystem is case-sensitive, so double check filenames/folders match
exactly what's referenced in the code if something 404s.

**Keeping `.glb` files small:** try [gltf.report](https://gltf.report/)
(drag-and-drop optimizer, nothing uploaded anywhere) or the
`gltf-transform` CLI (`npm install -g @gltf-transform/cli`, then
`gltf-transform optimize in.glb out.glb`) — texture compression is
usually where the biggest size wins are.