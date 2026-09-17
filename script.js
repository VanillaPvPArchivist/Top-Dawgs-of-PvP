(function () {
  const body = document.body;
  const modeButtons = document.querySelectorAll(".mode-btn");
  const classButtons = document.querySelectorAll(".class-btn");
  const modelViewer = document.getElementById("classModel");
  const modelPlaceholder = document.getElementById("modelPlaceholder");
  const placeholderPath = document.getElementById("placeholderPath");
  const classText = document.getElementById("classText");
  const loreName = document.getElementById("loreName");
  const loreText = document.getElementById("loreText");
  const loreRating = document.getElementById("loreRating");
  const videoStage = document.getElementById("videoStage");
  const videoMissing = document.getElementById("videoMissing");
  const bgProbe = document.getElementById("bgProbe");
  const bgLayerA = document.getElementById("bgLayerA");
  const bgLayerB = document.getElementById("bgLayerB");
  const honorableBtn = document.getElementById("honorableBtn");
  const honorableBackBtn = document.getElementById("honorableBackBtn");
  const honorableClassButtons = document.querySelectorAll(".honorable-class-btn");
  const honorableListFun = document.getElementById("honorableListFun");
  const honorableListSkill = document.getElementById("honorableListSkill");
  const honorableNote = document.getElementById("honorableNote");
  const honorableVideoOverlay = document.getElementById("honorableVideoOverlay");
  const honorableVideoFrame = document.getElementById("honorableVideoFrame");
  const bgMusic = document.getElementById("bgMusic");
  const audioControl = document.getElementById("audioControl");
  const audioBtn = document.getElementById("audioBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const audioPauseBtn = document.getElementById("audioPauseBtn");

  // ---------------------------------------------------------------
  // PLACEHOLDER DATA -- some of this is still meant to be filled in.
  // For each class, "skill" and "fun" each hold a name, a line of
  // flavor text, a path to a .glb model, an animation clip name, and
  // a longer "lore" string. "text" is currently empty on every entry
  // (fill it in if you want the bottom flavor-text line to show
  // anything). "model" points at models/{class}-{mode}.glb -- any
  // combination without a matching file in models/ shows a dashed
  // placeholder box until you add one, no code changes needed.
  // ---------------------------------------------------------------
  const CLASS_DATA = {
    druid: {
      skill: { name: "Tfo", text: "", model: "models/druid-skill.glb", lore: "Very solid player, he has an exceptional grasp on how to use the utility and strengths of this versatile class. 7.5/10", video: "aX93zH6wJeM", animation: "Stand" },
      fun:   { name: "N E V E R ", text: "", model: "models/druid-fun.glb", lore: "You thought druids were weak in vanilla? Ferahgo and Boro came together to show you otherwise.", video: "J7DN_w0LQUI", animation: "Stand" }
    },
    hunter: {
      skill: { name: "Junglle", text: "", model: "models/hunter-skill.glb", lore: "Some decent kiting here, especially given that he's clicking the majority of his spells. In comparison to every hunter PvP video (sorry Dysphoria) we've come across might as well be a god. 5/10", video: "QrXL4bxtymk", animation: "Stand" },
      fun:   { name: "Dysphoria", text: "", model: "models/hunter-fun.glb", lore: " A completely fresh soundtrack for the time and a mental that says nothing is impossible Hunter Vs. World is an all time classic series.", video: "7XgF_P9Ddjk", animation: "Stand" }
    },
    mage: {
      skill: { name: "Clazzi", text: "", model: "models/mage-skill.glb", lore: "Crispy movement, cooldown management and a complete confidence in his actions. Perhaps the first known recording of a dirty pop, the opening 1vX is one of the best recorded vanilla fights of all time. 9.5/10", video: "3_Tr5aklJ6U", animation: "Stand (ID 0 variation 0)" },
      fun:   { name: "Pathologist", text: "", model: "models/mage-fun.glb", lore: "By far the most unique and creative visual style, Pathologist (Dyf1.6) saw the potential for PvP videos to be more than crit showcases and unedited BG footage, he wanted to make art, not just in video form as half of his soundtracks are his own songs. Had God blessed him with the PvP skill of a Clazzi, he'd be the only name on this list. ", video: "0ZNAWoYEras", animation: "Stand (ID 0 variation 0)", cameraRadius: "75%" }
    },
    paladin: {
      skill: { name: "Arthus", text: "", model: "models/paladin-skill.glb", lore: " Is friends with bobo 6/10", video: "S9XitQA-dkE", animation: "Stand" },
      fun:   { name: "Zalgradis", text: "", model: "models/paladin-fun.glb", lore: "Sketches, engineering, bad voice acting, and a unique playstyle come together in a love letter full of references to other videos of the era", video: "NOXrGmulbMk", animation: "Stand" }
    },
    priest: {
      skill: { name: "There are no good priests apparently", text: "", model: "models/priest-skill.glb", lore: "There are no good priests apparently", video: "X9737mnPejQ", animation: "Stand" },
      fun:   { name: "Beckon", text: "", model: "models/priest-fun.glb", lore: "is the Hulksmash of holy priests, sit back, relax, and watch this man cast a 40 second holy fire to take someones head off", video: "x_EgBtUtWBM", animation: "Stand (ID 0 variation 0)" }
    },  
    rogue: {
      skill: { name: "Cielz", text: "", model: "models/rogue-skill.glb", lore: "The intro promises a lot, the subsequent 19 minutes delivers on some. Early attempts at 5-8ing warriors, a healthy trigger discipline on their cooldowns and a willingness to take on 1vX's. On top of it all he's a swirly ball enjoyer. Definitely check out the rogue honourable mentions as this was an incredibly close competition. 7.5/10", video:"qN9GtoGnTxc", animation: "Stand" },
      fun:   { name: "Mute (World of Roguecraft)", text: "", model: "models/rogue-fun.glb", lore: "The most influential vanilla PvP videos of all time, if you ever saw someone trying to flex on their enemies while naked, it's probably because of mute. (Released in reverse order, episode 3 was the first in the series)", video: "bqx1CFomKMI", animation: "Stand (ID 0 variation 0)" }
    },
    shaman: {
      skill: { name: "Nimhabulove", text: "", model: "models/shaman-skill.glb", lore: "Between totems, shocks, healing and damaging spells shaman has a lot of tools at its disposal, our guy said nah, not enough, and added some engi to this toolkit. Grounding coils, reflecting fears and stunlocking with tidal/nades, there are definite moments in his video that earn him a spot on this page. 6/10", video: "qxMSzBxxesk", animation: "Stand" },
      fun: {
        variants: [
          { name: "Cabbarnuke", text: "", model: "models/shaman-fun-cabbarnuke.glb", lore: "If you saw Roguecraft and needed more naked PvP, Cabbarnuke is your guy.", video: "eXE-J13gpNE", animation: "Stand" },
          { name: "Unbreakable", text: "", model: "models/shaman-fun-unbreakable.glb", lore: "If you're looking for the exact opposite and want to see a man swing a big hammer as hard as he can, Unbreakable has got your back.", video: "ja1j7xWpB3w", animation: "Stand" }
        ]
      }
    },
    warlock: {
      skill: { name: "Lokilo", text: "", model: "models/warlock-skill.glb", lore: "An actual time traveler, completely cool under pressure with impeccable character control and target selection. What he lacks in flashiness he makes up for in pure cleanliness. 9/10", video: "dPJf4Ocjc-8", animation: "Stand (ID 0 variation 0)", cameraRadius: "70%" },
      fun:   { name: "Drakedog", text: "", model: "models/warlock-fun.glb", lore: "Did we mention we're fans of Pathologist? Drakedog, who is probably the most beloved vanilla warlock, having Pathologist edit his video for him was a crossover that came out of nowhere and we're glad it did.", video: "I918N8wUvRs", animation: "Stand (ID 0 variation 0)", cameraRadius: "40%" }
    },
    warrior: {
      skill: { name: "Bobo", text: "", model: "models/warrior-skill.glb", lore: "The rest of the skilled section were picked for their individual skill, Bobo however was picked because the demons he chose to fight could have made it to this list on their own (one of them did). By far the cleanest and most impressive warrior at the time, you could easily believe some of these duels were recorded yesterday and not 20 years ago. 9/10", video: "23MOz4cc0Uk", animation: "Stand", cameraRadius: "85%" },
      fun:   { name: "S&Q Inc Group PVP", text: "", model: "models/warrior-fun.glb", lore: "One of the classiest PvP videos in all of vanilla, the editing, the soundtrack and the 2vX lens they filmed through, S&Q Inc is nothing if not fun. A shoutout to Wheeliecool & Champ for a similar vibe but for us it's gotta be S&Q Inc.", video: "sHJS1bqu6yw", animation: "Stand" }
    }
    
  };

  // ---------------------------------------------------------------
  // Honorable Mentions -- a longer list per class/mode, each entry
  // just a name plus optional lore text and an optional YouTube
  // video id. Unlike the main CLASS_DATA entry above, these are
  // collapsed by default and expand on click. Add or remove entries
  // freely -- each is just { name: "...", lore: "...", video: "..." }
  // or { name: "...", lore: "", video: null } if you only have a name
  // so far.
  // ---------------------------------------------------------------
  const HONORABLE_MENTIONS = {
    warrior: {
      skill: [{ name: "Laintime", lore: "People think of Laintime as the godfather of warriors, we remember him as the lone pillar holding up the tuber industry. The people of Felwood thank you, Laintime", video: "LFkSidbQu2o" }],
      fun: [{ name: "Swifty", lore: "", video: "HUPexEfCG7g" }, { name: "Pat", lore: "", video: "RGBnjELkgok" }, { name: "Maydie", lore: "", video: "SwSR1SHYZRI" }, { name: "Illusion", lore: "", video: "STq43Pxqgc4" }, { name: "Spinister", lore: "", video: "hW8ButI6mns" }, { name: "Hulksmash", lore: "", video: "IAR1CsAXLCw" }, { name: "Xahlior", lore: "", video: "oKQNJL5IL2s" }],
      note: "People think of Laintime as the godfather of warriors, we remember him as the lone pillar holding up the tuber industry. The people of Felwood thank you, Laintime"
    },
    paladin: {
      skill: [{ name: "Chipman", lore: "", video: "b2EfsrD_Mqk" }, { name: "Kirill", lore: "", video: "fhnEhZVzo3I" }],
      fun: []
    },
    hunter: {
      skill: [{ name: "Biuret", lore: "", video: "m-IzBxFa8yg" }, { name: "Kishra", lore: "", video: "eIW0i5tch1E" }],
      fun: [{ name: "Fubarius(Huntology)", lore: "Can’t really put this one into words, it’s something that just needs to be experienced. Some (most) will hate it and others will love it, for us however, we definitely believe in immersing ourselves in the dream of the hunt.", video: "k5DdYPLoItU" }],
      note: "Can’t really put this one into words, it’s something that just needs to be experienced. Some (most) will hate it and others will love it, for us however, we definitely believe in immersing ourselves in the dream of the hunt."
    },
    rogue: {
      skill: [{ name: "Dahis", lore: "", video: "VMCDsXwAEK8" }, { name: "Corrupt", lore: "", video: "CkRIrlmQRYQ" }, { name: "Ming", lore: "", video: "aDXXr3ad3is" }, { name: "Happyminti", lore: "", video: "YvQoYMq8_Ng" }, { name: "Oozo", lore: "", video: "1C7Uvt_0oYs" }],
      fun: [{ name: "Caen", lore: "", video: "CGZiwuUPFMo" }, { name: "Perkulator ", lore: "", video: "ID192rw5Whw" }, { name: "Grim", lore: "", video: "oWNt_8xcOZw" }],
      note: "Each rogue has moments where they shine brighter than the others, we just had to pick one"
    },
    priest: {
      skill: [],
      fun: [{ name: "Keytal", lore: "", video: "zAJOrVks7Xc" }],
      note: "There are no honorable priests apparently"
    },
    shaman: {
      skill: [],
      fun: [{ name: "Arashmano", lore: "", video: "8-w9Wl8v6ZA" }]
    },
    mage: {
      skill: [{ name: "Drifting", lore: "", video: "VXh_kZZ-GQo" }, { name: "Zachary", lore: "", video: "ohTYLIi1ghY" }, { name: "Gameking", lore: "", video: "RfY8Egsd6C8" }, { name: "Alca", lore: "", video: "MMnmuU8mOsw" }, { name: "Vurtne", lore: "", video: "k5Wieh9MMmc" }],
      fun: [{ name: "Zelta", lore: "", video: "WYSbkW__6MI" }, { name: "Faxmonkey", lore: "", video: "3O_pNDc73MM" }, { name: "Voidim", lore: "", video: "fSn46eGGW7s" }, { name: "Otherguy(Sorrow Hill)", lore: "", video: "2FwMRW1ra0E" }],
      note: "Both Zachary and Drifiting get extra special mentions as standouts, Clazzi is just a cut above everyone else"
    },
    warlock: {
      skill: [{ name: "Shining", lore: "Coiling intercepts and smart use of spellstones, Shining is a strong contender for top spot", video: "SqlJUxRd9WU" }, { name: "May", lore: "", video: "fwvpcN72K98" }, { name: "Diivil", lore: "", video: "BV5iAVmiqF8" }],
      fun: [],
      note: "Coiling intercepts and smart use of spellstones, Shining is a strong contender for top spot"
    },
    druid: {
      skill: [{ name: "Unstoppable", lore: "", video: "_QLmuHDy0Qs" }, { name: "Azgaz", lore: "", video: "xlXOnYi5tAU" }],
      fun: []
    }
  };

  let currentClass = "warrior";
  let currentMode = "skill";
  let requestedSrc = "";
  let requestedAnimation = "Stand";
  let hasStartedPreload = false;
  let activeBgLayer = bgLayerA;
  let currentVariantSlug = null;

  // Mirrors the neutral placeholder gradient from style.css -- used
  // as the crossfade layer's image when the probe resolves to "none"
  // (i.e. no background rule exists yet for this class/mode).
  const NEUTRAL_BG =
    'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 75%), ' +
    'linear-gradient(180deg, #211d17 0%, #2c261e 45%, #181410 100%)';

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ---------------------------------------------------------------
  // If a lore string ends with a "X/10" or "X.X/10" rating, pull it
  // out and render it as a separate review-score badge (stars + a
  // large number), the way a movie trailer displays a critic score,
  // instead of leaving it as plain trailing text in the paragraph.
  // Lore strings without a trailing rating just render as-is.
  // ---------------------------------------------------------------
  // Splits a trailing "X/10" (or "X.X/10") rating off the end of a
  // lore string, if present. Returns { mainText, ratingHtml } --
  // ratingHtml is "" when there's no rating.
  function splitLoreRating(rawLore) {
    const match = /^([\s\S]*?)\s*(\d{1,2}(?:\.\d)?)\s*\/\s*10\s*$/.exec((rawLore || "").trim());

    if (!match) {
      return { mainText: (rawLore || "").trim(), ratingHtml: "" };
    }

    const mainText = match[1].trim();
    const score = match[2];
    // Round to the nearest half-star (10-point scale, so nearest 0.5)
    // and build 10 individual star spans, each explicitly full, half,
    // or empty -- rather than one string of glyphs -- so a rating
    // like 7.5 renders a genuine half-filled 8th star instead of
    // rounding up to a full one.
    const clamped = Math.min(10, Math.max(0, parseFloat(score)));
    const rounded = Math.round(clamped * 2) / 2;
    let stars = "";
    for (let i = 1; i <= 10; i++) {
      let state = "empty";
      if (rounded >= i) state = "full";
      else if (rounded >= i - 0.5) state = "half";
      stars += `<span class="star star-${state}">★</span>`;
    }

    const ratingHtml =
      `<span class="rating-stars">${stars}</span>` +
      `<span class="rating-score">${escapeHtml(score)}<span class="rating-outof">/10</span></span>`;

    return { mainText, ratingHtml };
  }

  function renderLore(rawLore) {
    const { mainText } = splitLoreRating(rawLore);
    return `<p class="lore-text">${escapeHtml(mainText)}</p>`;
  }

  // ---------------------------------------------------------------
  // Crossfades the background. Rather than a second copy of every
  // background rule in style.css, this mirrors body's data-class /
  // data-mode onto the hidden #bgProbe element, so the exact same
  // [data-class][data-mode] rules already in style.css resolve on it
  // too -- then reads the resulting image off it with
  // getComputedStyle() and hands that to whichever of the two
  // .bg-layer divs is currently hidden, fading it in while fading the
  // other one out.
  // ---------------------------------------------------------------
  function updateBackground() {
    if (!bgProbe || !bgLayerA || !bgLayerB) return;

    bgProbe.dataset.class = currentClass;
    bgProbe.dataset.mode = currentMode;
    if (currentVariantSlug) {
      bgProbe.dataset.variant = currentVariantSlug;
    } else {
      delete bgProbe.dataset.variant;
    }

    const resolved = getComputedStyle(bgProbe).backgroundImage;
    const image = !resolved || resolved === "none" ? NEUTRAL_BG : resolved;

    const incoming = activeBgLayer === bgLayerA ? bgLayerB : bgLayerA;
    incoming.style.backgroundImage = image;

    // Force layout before adding the class, so the browser registers
    // the new image first and actually animates the opacity change
    // instead of jumping straight to the end state.
    void incoming.offsetWidth;

    incoming.classList.add("visible");
    activeBgLayer.classList.remove("visible");
    activeBgLayer = incoming;
  }

  // If a model's requested animation clip doesn't exist in the file,
  // try these common alternate names before giving up.
  const ANIMATION_FALLBACKS = ["Stand", "Idle", "idle", "stand", "Idle01", "Stand1"];

  // ---------------------------------------------------------------
  // Preload everything on page load instead of waiting for a click.
  // Models: every unique .glb path in CLASS_DATA gets fetched once,
  // which primes the browser's HTTP cache -- when <model-viewer>
  // later requests the same URL, it loads instantly from cache
  // instead of hitting the network. 404s (classes without a real
  // model yet) fail silently, same as they always have.
  // Backgrounds: rather than hardcoding a second list of image paths
  // to keep in sync with style.css, this scans the loaded stylesheet
  // for every "background-image: url(...)" rule and preloads each
  // one via a throwaway Image() object, so any image you add to
  // style.css later gets preloaded automatically with no extra code.
  // ---------------------------------------------------------------
  function preloadAllAssets() {
    const modelPaths = new Set();
    Object.values(CLASS_DATA).forEach((modes) => {
      Object.values(modes).forEach((entry) => {
        if (entry.model) modelPaths.add(entry.model);
      });
    });
    modelPaths.forEach((path) => {
      fetch(path).catch(() => {});
    });

    const urlPattern = /url\((['"]?)([^'")]+)\1\)/g;
    const imageUrls = new Set();
    try {
      Array.from(document.styleSheets).forEach((sheet) => {
        let rules;
        try {
          rules = sheet.cssRules;
        } catch (e) {
          return; // cross-origin stylesheet (e.g. Google Fonts) -- skip
        }
        if (!rules) return;
        Array.from(rules).forEach((rule) => {
          const bg = rule.style && rule.style.backgroundImage;
          if (!bg || bg === "none") return;
          let match;
          while ((match = urlPattern.exec(bg)) !== null) {
            imageUrls.add(match[2]);
          }
        });
      });
    } catch (e) {
      console.warn("Couldn't scan stylesheets to preload background images:", e);
    }
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  // ---------------------------------------------------------------
  // Some class/mode entries have multiple interchangeable profiles
  // (e.g. Shaman/Fun: Cabbarnuke or Unbreakable) instead of a single
  // flat { name, text, model, lore, video, animation } object -- for
  // those, CLASS_DATA has a "variants" array of that same shape
  // instead. getResolvedEntry() picks whichever variant is currently
  // selected (tracked per class/mode in variantIndices, default 0).
  // The name header shows every variant's name joined by "/" (e.g.
  // "Cabbarnuke/Unbreakable"), with the active one at full brightness
  // and the others dimmed -- clicking a specific name switches to it,
  // fading the emphasis across rather than replacing the text.
  // ---------------------------------------------------------------
  const variantIndices = {};

  function slugify(str) {
    return (str || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function getResolvedEntry(className, mode) {
    const raw = CLASS_DATA[className][mode];
    if (raw.variants) {
      const key = className + "-" + mode;
      return raw.variants[variantIndices[key] || 0];
    }
    return raw;
  }

  function updateView() {
    const rawEntry = CLASS_DATA[currentClass][currentMode];
    const data = getResolvedEntry(currentClass, currentMode);
    currentVariantSlug = rawEntry.variants ? slugify(data.name) : null;

    body.dataset.class = currentClass;
    body.dataset.mode = currentMode;

    updateBackground();

    if (classText) classText.textContent = data.text;
    if (loreName) {
      if (rawEntry.variants) {
        const key = currentClass + "-" + currentMode;
        const activeIdx = variantIndices[key] || 0;
        loreName.innerHTML = rawEntry.variants
          .map(
            (v, i) =>
              `<span class="variant-option${i === activeIdx ? " active" : ""}" data-variant-index="${i}">${escapeHtml(v.name)}</span>`
          )
          .join('<span class="variant-sep">/</span>');
      } else {
        loreName.textContent = data.name;
      }
    }
    if (loreText) {
      loreText.innerHTML = renderLore(data.lore);
    } else {
      console.warn('script.js expected an element with id="loreText" but did not find one. Make sure index.html, style.css, and script.js are all the latest versions, deployed together.');
    }
    if (loreRating) {
      loreRating.innerHTML = splitLoreRating(data.lore).ratingHtml;
    }

    requestedSrc = data.model;
    requestedAnimation = data.animation || "Stand";
    if (modelPlaceholder) modelPlaceholder.classList.remove("visible");
    if (placeholderPath) placeholderPath.textContent = data.model;
    if (modelViewer) {
      modelViewer.setAttribute("src", data.model);
      modelViewer.setAttribute("animation-name", requestedAnimation);
      // Camera radius (distance from the model) defaults to 100% --
      // set a "cameraRadius" field on a class/mode entry (e.g. "75%")
      // to zoom that specific model in closer, making it read as
      // bigger. min/max-camera-orbit have to move together with
      // camera-orbit's radius since they otherwise clamp it back.
      const radius = data.cameraRadius || "100%";
      modelViewer.setAttribute("camera-orbit", `90deg 75deg ${radius}`);
      modelViewer.setAttribute("min-camera-orbit", `auto 90deg ${radius}`);
      modelViewer.setAttribute("max-camera-orbit", `auto 90deg ${radius}`);
    }

    applyVideoId(data.video || null);

    modeButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === currentMode));
    classButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.class === currentClass));
  }

  if (loreName) {
    loreName.addEventListener("click", (e) => {
      const optionEl = e.target.closest(".variant-option");
      if (!optionEl) return;
      const rawEntry = CLASS_DATA[currentClass][currentMode];
      if (!rawEntry.variants) return;
      const key = currentClass + "-" + currentMode;
      variantIndices[key] = parseInt(optionEl.dataset.variantIndex, 10);
      updateView();
    });
  }

  // ---------------------------------------------------------------
  // Embedded video for the current class/mode, using the YouTube
  // IFrame API rather than a plain <iframe src="...">. Two reasons:
  // 1. cueVideoById() loads a video's thumbnail/metadata and gets it
  //    ready to play WITHOUT autoplaying it -- a plain iframe with
  //    ?autoplay=0 still sometimes autoplays depending on browser/
  //    embed settings, whereas "cue" (vs. "load") is explicitly the
  //    non-autoplaying variant.
  // 2. onStateChange lets us detect actual play/pause state, which
  //    drives the fade-in-when-playing behavior in style.css (see
  //    ".video-stage.playing"), not just hover.
  //
  // "Loading in the background" for a YouTube embed doesn't map onto
  // the same technique as preloading an image or .glb file -- you
  // can't pre-fetch a video's bytes without a player instance, and
  // instantiating 18 hidden players (one per class/mode) would be
  // wasteful and could itself trigger unwanted playback. The
  // equivalent here is starting the IFrame API script loading
  // immediately on page load (see loadYouTubeApi() near the bottom of
  // this file) rather than waiting for any interaction, so the player
  // itself is ready well before the visitor hovers or clicks it.
  // ---------------------------------------------------------------
  let ytPlayer = null;
  let pendingVideoId; // set if a class/mode is selected before the API finishes loading

  function applyVideoId(videoId) {
    if (videoStage) videoStage.classList.remove("playing");

    if (!ytPlayer || typeof ytPlayer.cueVideoById !== "function") {
      pendingVideoId = videoId;
      return;
    }

    if (videoId) {
      if (videoMissing) videoMissing.classList.remove("visible");
      ytPlayer.cueVideoById(videoId);
    } else {
      if (videoMissing) videoMissing.classList.add("visible");
      if (typeof ytPlayer.stopVideo === "function") ytPlayer.stopVideo();
    }
  }

  function initYouTubePlayer() {
    if (!window.YT || !window.YT.Player || !document.getElementById("videoFrame")) return;

    ytPlayer = new YT.Player("videoFrame", {
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        rel: 0,
        modestbranding: 1,
        playsinline: 1
      },
      events: {
        onReady: () => {
          if (pendingVideoId !== undefined) {
            applyVideoId(pendingVideoId);
            pendingVideoId = undefined;
          }
        },
        onStateChange: (event) => {
          if (!videoStage || !window.YT) return;
          const isPlaying = event.data === YT.PlayerState.PLAYING;
          videoStage.classList.toggle("playing", isPlaying);

          // Auto-pause the background music while this video plays,
          // and resume it once the video stops -- but only if the
          // music was actually playing (and not paused for some other
          // reason, e.g. the visitor's own pause button) when the
          // video started. Resuming waits a beat rather than firing
          // immediately: skipping through a video fires brief
          // BUFFERING/PAUSED states between seeks, and without a
          // delay the music would blip back in during every one of
          // those instead of only when playback actually stops.
          if (bgMusic) {
            if (isPlaying) {
              if (resumeMusicTimer) {
                clearTimeout(resumeMusicTimer);
                resumeMusicTimer = null;
              }
              if (!bgMusic.paused) {
                bgMusic.pause();
                pausedForVideo = true;
              }
            } else if (pausedForVideo) {
              if (resumeMusicTimer) clearTimeout(resumeMusicTimer);
              resumeMusicTimer = setTimeout(() => {
                bgMusic.play().catch(() => {});
                pausedForVideo = false;
                resumeMusicTimer = null;
              }, 3000);
            }
          }
        }
      }
    });
  }

  function loadYouTubeApi() {
    if (window.YT && window.YT.Player) {
      initYouTubePlayer();
      return;
    }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initYouTubePlayer;
  }

  if (modelViewer) {
    modelViewer.addEventListener("error", () => {
      if (modelPlaceholder && modelViewer.getAttribute("src") === requestedSrc) {
        modelPlaceholder.classList.add("visible");
      }
      // Even if the initial model fails to load, still kick off
      // background preloading rather than waiting forever for a
      // "load" event that will never come.
      if (!hasStartedPreload) {
        hasStartedPreload = true;
        preloadAllAssets();
      }
    });

    modelViewer.addEventListener("load", () => {
      if (modelViewer.getAttribute("src") !== requestedSrc) return;

      if (modelPlaceholder) modelPlaceholder.classList.remove("visible");

      // Some .glb files don't have a clip literally named "Stand" (or
      // whatever this class/mode's "animation" field says) -- their
      // idle animation might be called something else entirely. Try a
      // short list of common alternates before giving up, and if none
      // match, log the file's real animation names so you know exactly
      // what to put in CLASS_DATA's "animation" field for this entry.
      const available = modelViewer.availableAnimations || [];

      if (available.includes(requestedAnimation)) {
        modelViewer.animationName = requestedAnimation;
        return;
      }

      const fallback = ANIMATION_FALLBACKS.find((name) => available.includes(name));
      if (fallback) {
        modelViewer.animationName = fallback;
        console.warn(
          `"${requestedSrc}" has no "${requestedAnimation}" animation. Using "${fallback}" instead. ` +
          `Set animation: "${fallback}" for this class/mode in CLASS_DATA to make this permanent and remove this warning.`
        );
      } else {
        console.warn(
          `"${requestedSrc}" has no "${requestedAnimation}" animation and none of the common fallbacks matched either. ` +
          `It's currently playing "${modelViewer.availableAnimations ? modelViewer.availableAnimations[0] : "(unknown)"}" (the file's first animation) instead. ` +
          `Available animations in this file: [${available.join(", ")}]. ` +
          `Set animation: "<one of those>" for this class/mode in CLASS_DATA to fix it.`
        );
      }

      // Once the very first model (whatever's shown on page load) has
      // finished loading, quietly start preloading everything else in
      // the background -- this way the initial model isn't competing
      // for bandwidth with 17 other downloads at the same time.
      if (!hasStartedPreload) {
        hasStartedPreload = true;
        preloadAllAssets();
      }
    });
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.mode === currentMode) return; // already selected -- avoid a pointless re-fade
      currentMode = btn.dataset.mode;
      updateView();
    });
  });

  classButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.class === currentClass) return; // already selected -- avoid a pointless re-fade
      currentClass = btn.dataset.class;
      updateView();
    });
  });

  // ---------------------------------------------------------------
  // Honorable Mentions scene. Slides in/out via the "honorable-open"
  // class on <body> (see style.css for the actual slide transition).
  // Clicking a class in the vertical icon column renders that class's
  // HONORABLE_MENTIONS entries into the Fun (left) and Skill (right)
  // lists. Clicking a name expands it in place to reveal its lore
  // text and (if set) an embedded video -- built as a plain iframe
  // rather than the YouTube IFrame API used on the main scene, since
  // there can be many of these and only ever one is expanded at a
  // time, so the simpler approach is enough here. The iframe's src is
  // only set when an entry is expanded (never before), which means
  // nothing autoplays and nothing loads until it's actually opened.
  // ---------------------------------------------------------------
  function renderHonorableList(container, entries) {
    if (!container) return;

    if (!entries || entries.length === 0) {
      container.innerHTML = '<p class="honorable-placeholder">No entries yet.</p>';
      return;
    }

    // Entries only ever contain the name button now -- video and lore
    // are both handled by shared, top-level elements (the video
    // overlay and the note slot respectively) positioned via JS from
    // the clicked entry's own position, rather than living nested
    // inside this list. That sidesteps clipping/overflow problems
    // entirely: nothing here needs to escape this list's bounds.
    container.innerHTML = entries
      .map(
        (entry, i) =>
          `<div class="honorable-entry" data-index="${i}">` +
          `<div class="honorable-entry-box">` +
          `<button type="button" class="honorable-entry-name">${escapeHtml(entry.name)}</button>` +
          `</div>` +
          `</div>`
      )
      .join("");
  }

  // Every box across BOTH lists shares one single uniform width, sized
  // to whichever name is longest overall -- not just the longest
  // within its own side. Deferred to the next frame (rather than
  // measuring immediately after setting innerHTML) so the browser has
  // definitely finished laying out the new content first.
  // The box width is the SAME constant for every class, not
  // recalculated per class -- otherwise a class with a short longest
  // name would show narrower boxes than one with a long longest name.
  // Measured once (lazily, cached) across every name in every class's
  // skill and fun arrays combined, using a detached element styled
  // identically to a real entry name so the measurement matches
  // exactly (same font, weight, padding).
  let globalEntryBoxWidth = null;

  function computeGlobalEntryBoxWidth() {
    if (globalEntryBoxWidth !== null) return globalEntryBoxWidth;

    const measurer = document.createElement("button");
    measurer.className = "honorable-entry-name";
    measurer.style.position = "absolute";
    measurer.style.visibility = "hidden";
    measurer.style.width = "auto";
    measurer.style.whiteSpace = "nowrap";
    measurer.style.pointerEvents = "none";
    document.body.appendChild(measurer);

    let maxWidth = 0;
    Object.values(HONORABLE_MENTIONS).forEach((classData) => {
      ["skill", "fun"].forEach((mode) => {
        (classData[mode] || []).forEach((entry) => {
          measurer.textContent = entry.name;
          maxWidth = Math.max(maxWidth, measurer.getBoundingClientRect().width);
        });
      });
    });

    document.body.removeChild(measurer);
    globalEntryBoxWidth = maxWidth;
    return globalEntryBoxWidth;
  }

  function applyUniformEntryBoxWidth() {
    const width = computeGlobalEntryBoxWidth();
    const boxes = document.querySelectorAll(
      "#honorableListFun .honorable-entry-box, #honorableListSkill .honorable-entry-box"
    );
    boxes.forEach((box) => {
      box.style.width = width + "px";
    });
  }

  let typewriterTimer = null;

  function stopTypewriter() {
    if (typewriterTimer) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
    }
  }

  // Reveals text one character at a time, like it's being typed.
  function typeWriterEffect(el, text) {
    stopTypewriter();
    el.textContent = "";
    el.classList.add("typing");
    let i = 0;
    typewriterTimer = setInterval(() => {
      el.textContent += text.charAt(i);
      i++;
      if (i >= text.length) {
        stopTypewriter();
        el.classList.remove("typing");
      }
    }, 23);
  }

  // Positions the note to start at the same row as the given class's
  // own icon in the vertical column, immediately to its right --
  // "next to the icon" rather than centered on screen. Top-anchored
  // (not vertically centered) so multi-line text grows downward from
  // that row instead of expanding upward over the icons above it.
  // Positions the note to the right of the given class's icon -- the
  // note is purely class-level now (lore no longer varies by side
  // since it's always shown on class selection, not tied to a
  // specific Fun/Skill entry click).
  // Classes whose note should open to the left of the icon instead of
  // the default right -- add more class names here if others need it.
  const NOTE_ON_LEFT = new Set(["hunter"]);

  function alignNoteWithIcon(className) {
    if (!honorableNote) return;
    const iconBtn = document.querySelector(`.honorable-class-btn[data-class="${className}"]`);
    if (!iconBtn) return;
    const rect = iconBtn.getBoundingClientRect();
    honorableNote.style.top = rect.top + "px";
    if (NOTE_ON_LEFT.has(className)) {
      honorableNote.style.left = "auto";
      honorableNote.style.right = window.innerWidth - rect.left + 20 + "px";
    } else {
      honorableNote.style.right = "auto";
      honorableNote.style.left = rect.right + 20 + "px";
    }
  }

  // Aligns the icon column's left edge with the "Back" button's left
  // edge, rather than keeping the column horizontally centered. The
  // back button's own width depends on its text/padding, so this is
  // computed in JS rather than hardcoded -- getBoundingClientRect()
  // works correctly even while the scene is translated off-screen,
  // since that transform is vertical only and doesn't affect x
  // coordinates.
  function alignIconColumnWithBack() {
    const iconColumn = document.getElementById("honorableIconColumn");
    if (!iconColumn || !honorableBackBtn) return;
    const rect = honorableBackBtn.getBoundingClientRect();
    iconColumn.style.left = rect.left + "px";
    iconColumn.style.transform = "translateY(-50%)";
  }

  // Shows the given class's own "note" (if it has one) in the shared
  // note slot next to the icon column -- this is the default state,
  // shown whenever no honorable-mention entry's lore is currently
  // overriding it (see the expand/collapse handler below).
  function showClassNote(className) {
    const data = HONORABLE_MENTIONS[className];
    if (!honorableNote || !data) return;
    stopTypewriter();
    if (data.note) {
      alignNoteWithIcon(className);
      honorableNote.classList.add("visible");
      typeWriterEffect(honorableNote, data.note);
    } else {
      honorableNote.textContent = "";
      honorableNote.classList.remove("visible", "typing");
    }
  }

  function renderHonorableLists(className) {
    const data = HONORABLE_MENTIONS[className];
    if (!data) return;
    renderHonorableList(honorableListFun, data.fun);
    renderHonorableList(honorableListSkill, data.skill);
    applyUniformEntryBoxWidth();
    showClassNote(className);
  }

  // Positions the shared, unstyled video slot right next to the given
  // entry element -- to its right for Fun (which sits on the left of
  // the screen, so this opens toward the center), or to its left for
  // Skill (mirrored, also opening toward the center).
  let currentVideoEntry = null;
  let currentVideoSide = null;

  function showVideoOverlay(entryEl, videoId, sideKey) {
    if (!honorableVideoOverlay || !honorableVideoFrame) return;
    currentVideoEntry = entryEl;
    currentVideoSide = sideKey;
    const rect = entryEl.getBoundingClientRect();
    honorableVideoOverlay.style.top = rect.top + "px";
    if (sideKey === "fun") {
      honorableVideoOverlay.style.left = rect.right + 10 + "px";
      honorableVideoOverlay.style.right = "auto";
    } else {
      honorableVideoOverlay.style.right = window.innerWidth - rect.left + 10 + "px";
      honorableVideoOverlay.style.left = "auto";
    }
    honorableVideoFrame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" title="Honorable mention video" frameborder="0" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    honorableVideoOverlay.classList.add("visible");
  }

  function hideVideoOverlay() {
    if (!honorableVideoOverlay || !honorableVideoFrame) return;
    currentVideoEntry = null;
    currentVideoSide = null;
    honorableVideoOverlay.classList.remove("visible");
    honorableVideoFrame.innerHTML = ""; // stops playback, not just visually hides it
  }

  // Expand/collapse entries via event delegation, since the list
  // contents are rebuilt from scratch every time a class is picked.
  // Names only ever control the video slot now -- lore lives entirely
  // in the class-level "note" (see showClassNote), shown the moment
  // you click a class icon rather than requiring a name click too.
  [honorableListFun, honorableListSkill].forEach((list) => {
    if (!list) return;
    const sideKey = list === honorableListFun ? "fun" : "skill";

    list.addEventListener("click", (e) => {
      const nameBtn = e.target.closest(".honorable-entry-name");
      if (!nameBtn) return;

      const entry = nameBtn.closest(".honorable-entry");
      const alreadyOpen = entry.classList.contains("expanded");

      list.querySelectorAll(".honorable-entry.expanded").forEach((el) => el.classList.remove("expanded"));

      if (alreadyOpen) {
        hideVideoOverlay();
        return;
      }

      entry.classList.add("expanded");

      const index = parseInt(entry.dataset.index, 10);
      const entryData = HONORABLE_MENTIONS[currentHonorableClass] && HONORABLE_MENTIONS[currentHonorableClass][sideKey][index];

      if (entryData && entryData.video) {
        showVideoOverlay(entry, entryData.video, sideKey);
      } else {
        hideVideoOverlay();
      }
    });
  });

  let currentHonorableClass = null;

  honorableClassButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      honorableClassButtons.forEach((b) => b.classList.toggle("active", b === btn));
      currentHonorableClass = btn.dataset.class;
      hideVideoOverlay();
      renderHonorableLists(currentHonorableClass);
    });
  });

  function repositionVideoOverlay() {
    if (!currentVideoEntry || !honorableVideoOverlay.classList.contains("visible")) return;
    const rect = currentVideoEntry.getBoundingClientRect();
    honorableVideoOverlay.style.top = rect.top + "px";
    if (currentVideoSide === "fun") {
      honorableVideoOverlay.style.left = rect.right + 10 + "px";
    } else {
      honorableVideoOverlay.style.right = window.innerWidth - rect.left + 10 + "px";
    }
  }

  window.addEventListener("resize", () => {
    if (currentHonorableClass) alignNoteWithIcon(currentHonorableClass);
    alignIconColumnWithBack();
    repositionVideoOverlay();
  });

  alignIconColumnWithBack();

  if (honorableBtn) {
    honorableBtn.addEventListener("click", () => {
      body.classList.add("honorable-open");
    });
  }

  if (honorableBackBtn) {
    honorableBackBtn.addEventListener("click", () => {
      body.classList.remove("honorable-open");
      hideVideoOverlay();
    });
  }

  // ---------------------------------------------------------------
  // Background music. Starts silent, then fades in over a few
  // seconds once playback actually begins. Browsers generally block
  // audio-with-sound from autoplaying until the visitor has
  // interacted with the page in some way, so this tries to play
  // immediately, and if that's blocked, waits for the first click,
  // keypress, or touch anywhere on the page and tries again then --
  // the fade-in timing is the same either way, just measured from
  // whenever playback actually manages to start rather than from
  // page load.
  // ---------------------------------------------------------------
  const MUSIC_TARGET_VOLUME = 0.25;
  const MUSIC_FADE_IN_DELAY_MS = 1500;
  const MUSIC_FADE_IN_DURATION_MS = 4000;
  let userAdjustedVolume = false;
  let pausedForVideo = false;
  let resumeMusicTimer = null;

  function fadeInMusic() {
    if (!bgMusic) return;
    let start = null;
    function step(timestamp) {
      if (userAdjustedVolume) return; // visitor took the slider -- stop overriding it
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / MUSIC_FADE_IN_DURATION_MS, 1);
      bgMusic.volume = progress * MUSIC_TARGET_VOLUME;
      if (volumeSlider) volumeSlider.value = bgMusic.volume;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function startMusic() {
    if (!bgMusic) return;
    const playPromise = bgMusic.play();
    if (playPromise === undefined) {
      setTimeout(fadeInMusic, MUSIC_FADE_IN_DELAY_MS);
      return;
    }
    playPromise
      .then(() => {
        setTimeout(fadeInMusic, MUSIC_FADE_IN_DELAY_MS);
      })
      .catch(() => {
        const resumeOnInteraction = () => {
          document.removeEventListener("click", resumeOnInteraction);
          document.removeEventListener("keydown", resumeOnInteraction);
          document.removeEventListener("touchstart", resumeOnInteraction);
          bgMusic
            .play()
            .then(() => setTimeout(fadeInMusic, MUSIC_FADE_IN_DELAY_MS))
            .catch(() => {});
        };
        document.addEventListener("click", resumeOnInteraction);
        document.addEventListener("keydown", resumeOnInteraction);
        document.addEventListener("touchstart", resumeOnInteraction);
      });
  }

  if (bgMusic) {
    bgMusic.volume = 0;
    startMusic();
  }

  // Collapses the slider automatically 3 seconds after it was opened
  // or last interacted with, rather than staying open indefinitely.
  let collapseTimer = null;

  function scheduleCollapse() {
    if (collapseTimer) clearTimeout(collapseTimer);
    collapseTimer = setTimeout(() => {
      if (audioControl) audioControl.classList.remove("open");
      collapseTimer = null;
    }, 3000);
  }

  if (audioBtn && audioControl) {
    audioBtn.addEventListener("click", () => {
      audioControl.classList.toggle("open");
      if (audioControl.classList.contains("open")) {
        scheduleCollapse();
      } else if (collapseTimer) {
        clearTimeout(collapseTimer);
        collapseTimer = null;
      }
    });
  }

  if (volumeSlider && bgMusic) {
    volumeSlider.addEventListener("input", () => {
      userAdjustedVolume = true;
      bgMusic.volume = parseFloat(volumeSlider.value);
      scheduleCollapse();
    });
  }

  // Keeps the pause/play icon in sync with the audio element's real
  // state regardless of what caused the change (the button itself,
  // or music auto-pausing because a video started playing).
  if (bgMusic && audioPauseBtn) {
    const iconPause = audioPauseBtn.querySelector(".icon-pause");
    const iconPlay = audioPauseBtn.querySelector(".icon-play");

    function syncPauseIcon() {
      const isPaused = bgMusic.paused;
      if (iconPause) iconPause.style.display = isPaused ? "none" : "";
      if (iconPlay) iconPlay.style.display = isPaused ? "" : "none";
      audioPauseBtn.setAttribute("aria-label", isPaused ? "Play music" : "Pause music");
    }

    bgMusic.addEventListener("play", syncPauseIcon);
    bgMusic.addEventListener("pause", syncPauseIcon);
    syncPauseIcon();

    audioPauseBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play().catch(() => {});
      } else {
        bgMusic.pause();
        pausedForVideo = false; // manual pause -- don't auto-resume this later
        if (resumeMusicTimer) {
          clearTimeout(resumeMusicTimer);
          resumeMusicTimer = null;
        }
      }
      scheduleCollapse();
    });
  }

  updateView();
  loadYouTubeApi();
})();