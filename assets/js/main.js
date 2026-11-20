/* Renders the home page and project pages from projects.js. No libraries, no build step. */
(function () {
  const S = window.SITE, P = window.PROJECTS;
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* Image with automatic placeholder if the file does not exist yet */
  function img(src, alt, cls = "") {
    return `<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-ph="${esc(src)}">`;
  }
  function wirePlaceholders(root = document) {
    root.querySelectorAll("img[data-ph]").forEach(el => {
      const swap = () => {
        const d = document.createElement("div");
        d.className = "ph";
        d.innerHTML = `<span>Add image: ${esc(el.dataset.ph)}</span>`;
        el.replaceWith(d);
      };
      if (el.complete && el.naturalWidth > 0) el.classList.add("loaded");
      else if (el.complete) swap();
      else {
        el.addEventListener("error", swap, { once: true });
        el.addEventListener("load", () => el.classList.add("loaded"), { once: true });
      }
    });
  }

  function contactButtons(extraClass = "") {
    let h = "";
    if (S.github) h += `<a class="btn ${extraClass}" href="${esc(S.github)}" target="_blank" rel="noopener">GitHub</a>`;
    if (S.linkedin) h += `<a class="btn" href="${esc(S.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`;
    if (S.email) h += `<a class="btn" href="mailto:${esc(S.email)}">Email</a>`;
    if (S.cv) h += `<a class="btn" href="${esc(S.cv)}" target="_blank" rel="noopener">Download CV</a>`;
    return h;
  }

  function card(p) {
    return `<a class="card" href="project.html#${esc(p.slug)}" data-cat="${esc(p.category)}">
      <div class="media">${img(p.cover, p.title)}</div>
      <div class="body">
        <div class="cat">${esc(p.category)}${p.year ? " · " + esc(p.year) : ""}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.short)}</p>
        <div class="tags">${p.tags.slice(0, 4).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </div>
    </a>`;
  }

  /* ---------------- Home ---------------- */
  function renderHome() {
    $("#hero-links").innerHTML = `<a class="btn primary" href="#projects">View projects</a>` + contactButtons();
    $("#stat-count").textContent = P.length;
    $("#featured").innerHTML = P.filter(p => p.featured).map(card).join("");

    const cats = ["All", ...new Set(P.map(p => p.category))];
    const filters = $("#filters");
    filters.innerHTML = cats.map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    const all = $("#all");
    all.innerHTML = P.map(card).join("");
    filters.addEventListener("click", e => {
      const b = e.target.closest(".chip"); if (!b) return;
      filters.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === b));
      all.querySelectorAll(".card").forEach(c => {
        c.style.display = (b.dataset.cat === "All" || c.dataset.cat === b.dataset.cat) ? "" : "none";
      });
    });
    $("#footer-links").innerHTML = contactButtons("primary");
    wirePlaceholders();
  }

  /* ---------------- Project page ---------------- */
  function video(v) {
    const url = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0${v.start ? "&start=" + v.start : ""}`;
    return `<div class="video${v.vertical ? " vertical" : ""}" data-src="${esc(url)}" role="button" tabindex="0" aria-label="Play video">
      <img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" onerror="this.remove()">
      <div class="play"><i>&#9654;</i> Watch demo</div>
    </div>
    <p class="small"><a href="https://www.youtube.com/watch?v=${esc(v.id)}${v.start ? "&t=" + v.start + "s" : ""}" target="_blank" rel="noopener">Open on YouTube</a></p>`;
  }

  function section(s) {
    let h = `<h2>${esc(s.h)}</h2>`;
    (s.p || []).forEach(t => h += `<p>${t}</p>`);
    if (s.ul) h += `<ul>${s.ul.map(t => `<li>${t}</li>`).join("")}</ul>`;
    return h;
  }

  function renderProject() {
    const slug = location.hash.slice(1) || new URLSearchParams(location.search).get("p") || P[0].slug;
    const i = Math.max(0, P.findIndex(p => p.slug === slug));
    const p = P[i];
    document.title = `${p.title} | ${S.name}`;

    let main = "";
    if (p.video) main += `<h2>Video demonstration</h2>` + video(p.video);
    main += p.sections.map(section).join("");

    let side = Object.entries(p.facts || {}).map(([k, v]) =>
      `<div class="side-box"><h4>${esc(k)}</h4><p>${esc(v)}</p></div>`).join("");
    const links = [];
    if (p.github) links.push(`<a class="btn primary" href="${esc(p.github)}" target="_blank" rel="noopener">View code on GitHub</a>`);
    if (links.length) side = `<div class="side-links">${links.join("")}</div>` + side;

    const prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];

    $("#project").innerHTML = `
      <div class="wrap">
        <a class="back" href="index.html#projects">&larr; All projects</a>
        <header class="p-hero">
          <div class="eyebrow">${esc(p.category)}${p.year ? " · " + esc(p.year) : ""}</div>
          <h1>${esc(p.title)}${p.subtitle ? `<br><span style="color:var(--muted);font-weight:500">${esc(p.subtitle)}</span>` : ""}</h1>
          <p class="lede">${esc(p.lede)}</p>
          <div class="tags" style="margin-top:18px">${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </header>
        <div class="p-cover">${img(p.cover, p.title, "zoom")}</div>
        ${p.results ? `<div class="results">${p.results.map(r => `<div class="result"><b>${esc(r.v)}</b><span>${esc(r.l)}</span></div>`).join("")}</div>` : ""}
        <div class="p-layout">
          <article class="p-main">${main}</article>
          <aside class="p-side">${side}</aside>
        </div>
        ${p.gallery && p.gallery.length ? `
        <section class="gallery">
          <h2>Gallery</h2>
          <div class="g-grid">${p.gallery.map(g => `<figure class="g-item">${img(g.src, g.cap || p.title, "zoom")}${g.cap ? `<figcaption>${esc(g.cap)}</figcaption>` : ""}</figure>`).join("")}</div>
        </section>` : ""}
        <nav class="p-nav">
          <a href="project.html#${esc(prev.slug)}"><small>&larr; Previous</small>${esc(prev.title)}</a>
          <a class="next" href="project.html#${esc(next.slug)}"><small>Next &rarr;</small>${esc(next.title)}</a>
        </nav>
      </div>`;

    // Video facade: swap in the YouTube player on click
    document.querySelectorAll(".video").forEach(v => {
      const play = () => { v.innerHTML = `<iframe src="${v.dataset.src}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`; v.style.cursor = "default"; };
      v.addEventListener("click", play, { once: true });
      v.addEventListener("keydown", e => { if (e.key === "Enter") play(); }, { once: true });
    });

    wirePlaceholders();
    setupLightbox(p);
  }

  /* ---------------- Lightbox ---------------- */
  let lbItems = [];
  function setupLightbox(p) {
    lbItems = [{ src: p.cover, cap: p.title }, ...(p.gallery || [])];
    if (setupLightbox.done) return; setupLightbox.done = true;
    const lb = $("#lightbox"), lbImg = $("#lb-img"), lbCap = $("#lb-cap");
    const items = { get length() { return lbItems.length; } };
    const at = i => lbItems[i];
    let cur = 0, dir = 1, skips = 0;
    const show = (n, d = 1) => {
      dir = d;
      cur = (n + items.length) % items.length;
      lbImg.src = at(cur).src; lbCap.textContent = at(cur).cap || "";
    };
    lbImg.addEventListener("load", () => { skips = 0; });
    document.addEventListener("click", e => {
      const t = e.target.closest("img.zoom"); if (!t) return;
      const n = lbItems.findIndex(it => it.src === t.dataset.ph);
      skips = 0; show(n < 0 ? 0 : n); lb.classList.add("open");
    });
    // Skip images that have not been added yet (and stop if none exist)
    lbImg.addEventListener("error", () => {
      if (!lb.classList.contains("open")) return;
      if (++skips >= items.length) { lb.classList.remove("open"); return; }
      show(cur + dir, dir);
    });
    $("#lb-prev").onclick = () => { skips = 0; show(cur - 1, -1); };
    $("#lb-next").onclick = () => { skips = 0; show(cur + 1, 1); };
    $("#lb-close").onclick = () => lb.classList.remove("open");
    lb.addEventListener("click", e => { if (e.target === lb) lb.classList.remove("open"); });
    document.addEventListener("keydown", e => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") lb.classList.remove("open");
      if (e.key === "ArrowLeft") { skips = 0; show(cur - 1, -1); }
      if (e.key === "ArrowRight") { skips = 0; show(cur + 1, 1); }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page === "home") renderHome();
    else {
      renderProject();
      window.addEventListener("hashchange", () => { renderProject(); window.scrollTo(0, 0); });
    }
  });
})();
