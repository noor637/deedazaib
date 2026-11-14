/* ==========================================================================
   DEEDAZAIB — website behaviour
   You shouldn't need to edit this file: content lives in js/config.js.
   Sections: 1 helpers · 2 WhatsApp links · 3 the book · 4 scroll glide
             5 lookbook grid · 6 product view
   ========================================================================== */
(function () {
  'use strict';

  var C = window.DEEDAZAIB || { looks: [] };
  var LOOKS = (C.looks || []).slice();
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1 · helpers ---------- */
  function esc(v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(id) { return document.getElementById(id); }
  function label(col) { return col === 'festive' ? 'Festive' : 'Semi-Formal'; }
  function priceText(l) { return 'Rs ' + l.price; }
  function waLink(text) {
    var n = String(C.whatsapp || '').replace(/[^0-9]/g, '');
    return 'https://wa.me/' + n + '?text=' + encodeURIComponent(text);
  }
  function orn(color) {
    return '<div style="color:' + color + '"><div class="orn" aria-hidden="true"><i></i><b></b><i></i></div></div>';
  }
  function mono(rel, dColor, zColor) {
    return '<div class="mono" aria-hidden="true" style="width:calc(var(--pw) * ' + rel + ');height:calc(var(--pw) * ' + rel + ');color:' + zColor + '">' +
      '<span><span class="d" style="font-size:calc(var(--pw) * ' + (rel * 0.36) + ');color:' + dColor + '">D</span>' +
      '<span class="z" lang="ur" style="font-size:calc(var(--pw) * ' + (rel * 0.27) + ');top:calc(var(--pw) * ' + (rel * 0.07) + ')">ز</span></span></div>';
  }
  /* placeholder outfit illustration, used until a look has a real photo */
  function dress(l, dark) {
    var p = l.placeholder || { body: '#D9A5A0', trouser: '#C38E89', dupatta: '#EBCFC6', trim: '#B08A4A' };
    var ground = dark ? 'rgba(0,0,0,.25)' : 'rgba(59,13,26,.10)';
    var dots = ''; for (var i = 0; i < 9; i++) dots += '<circle cx="' + (64 + i * 9) + '" cy="221" r="2.2" fill="' + p.trim + '"/>';
    var neck = ''; [[84, 40], [90, 46], [96, 49], [104, 49], [110, 46], [116, 40]].forEach(function (q) { neck += '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="1.8" fill="' + p.trim + '"/>'; });
    return '<svg viewBox="0 0 200 300" role="img" aria-label="Look ' + esc(l.no) + '">' +
      '<ellipse cx="100" cy="292" rx="62" ry="6" fill="' + ground + '"/>' +
      '<path d="M73 34 C 46 110, 34 196, 52 286 L 70 288 C 58 200, 66 116, 92 46 Z" fill="' + p.dupatta + '"/>' +
      '<path d="M72 230 L128 230 L125 288 L107 288 L100 246 L93 288 L75 288 Z" fill="' + p.trouser + '"/>' +
      '<path d="M78 30 Q100 50 122 30 L150 40 L176 122 L160 128 L140 76 L143 232 L57 232 L60 76 L40 128 L24 122 L50 40 Z" fill="' + p.body + '"/>' +
      '<rect x="57" y="214" width="86" height="14" fill="none" stroke="' + p.trim + '" stroke-width="1"/>' + dots + neck +
      '<path d="M120 30 C 150 60, 156 150, 146 230 L 156 232 C 168 150, 160 70, 128 34 Z" fill="' + p.dupatta + '" opacity=".95"/></svg>';
  }
  /* a look's picture: the real photo if there is one, otherwise the illustration */
  function shot(l) {
    var dark = l.collection === 'festive';
    var bg = dark ? '#5A1F2E' : '#D8C2A2';
    if (l.photo) {
      return '<div class="shot has-photo" style="background:' + bg + '"><img src="' + esc(l.photo) + '" alt="Look ' + esc(l.no) + ' — ' + esc(l.name) + '" loading="lazy" decoding="async"></div>';
    }
    return '<div class="shot" style="background:' + bg + '">' + dress(l, dark) + '</div>';
  }

  /* ---------- 2 · WhatsApp & Instagram links ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa')); });
  if (C.instagram) $('instagram').href = C.instagram; else $('instagram').style.display = 'none';
  $('year').textContent = new Date().getFullYear();

  /* ---------- 3 · the book: cover · endpaper · title · story spread · back cover ---------- */
  var pages = [];
  function add(cls, inner, density) { pages.push({ cls: cls, inner: inner, density: density || 'soft' }); }
  function folio(i) { return '<div class="folio">' + i + '</div>'; }

  add('cover front', '<div class="frame"></div><div class="cover-inner foil">' + mono(0.27, '#F3E6CC', '#D4B271') +
    '<div style="display:flex;flex-direction:column;align-items:center;gap:.4em"><span class="cin" style="font-size:calc(var(--pw) * .062);letter-spacing:.3em">DEEDAZAIB</span><span class="cin" style="font-size:calc(var(--pw) * .022);letter-spacing:.5em">BY BEENISH</span></div>' +
    orn('#D4B271') + '<span class="cin" style="font-size:calc(var(--pw) * .027);letter-spacing:.34em">THE LOOKBOOK</span><span style="font-size:calc(var(--pw) * .024);letter-spacing:.28em">MMXXVI</span></div>', 'hard');
  add('endpaper left', '<div class="pattern"></div>');
  add('right', '<div class="pg center" style="gap:1.1em">' +
    '<div style="display:flex;align-items:center;gap:.4em;line-height:1"><span class="cin" style="font-size:calc(var(--pw) * .075);letter-spacing:.14em">DEEDA</span><span class="ur" lang="ur" dir="rtl" style="font-size:calc(var(--pw) * .093);color:#B08A4A">زیب</span></div>' +
    '<span class="cin" style="font-size:calc(var(--pw) * .022);letter-spacing:.5em">BY BEENISH</span>' + orn('#B08A4A') +
    '<span class="serif-i" style="font-size:calc(var(--pw) * .05);color:var(--sub)">The Lookbook · 2026</span></div>');
  add('left', '<div class="pg" style="gap:1.1em;justify-content:center"><span class="running">HOW WE STARTED</span>' +
    '<span class="cin" style="font-size:calc(var(--pw) * .06);letter-spacing:.06em">Hi, I’m Beenish.</span>' + orn('#B08A4A') +
    '<p class="p-text">For as long as I can remember, I’ve loved designing: sketching outfits, playing with colours, imagining how a fabric would fall.</p>' +
    '<p class="p-text">I’ve always been an entrepreneur at heart, and Deedazaib grew one step at a time, right from my home.</p></div>' + folio(3));
  var early = C.earlyDaysPhoto
    ? '<div class="mini-photo has-photo"><img src="' + esc(C.earlyDaysPhoto) + '" alt="The early days of Deedazaib"></div>'
    : '<div class="mini-photo">PHOTO · THE EARLY DAYS</div>';
  add('right', '<div class="pg" style="gap:1.2em;justify-content:center">' + early +
    '<div class="timeline"><div><b>Shawl exhibitions</b><span>Where it all began</span></div><div><b>Unstitched suits</b><span>Our first collections</span></div><div><b>Ready-to-wear · 2022</b><span>Designed by me, made in Islamabad</span></div></div>' +
    '<p class="p-text">My first customers were friends and family. They told their friends, and slowly a whole family of clients grew around us.</p></div>' + folio(4));
  add('cover back', '<div class="frame"></div><div class="cover-inner foil">' + mono(0.16, '#F3E6CC', '#D4B271') + '<span class="cin" style="font-size:calc(var(--pw) * .022);letter-spacing:.4em">DESIGNED IN ISLAMABAD</span></div>', 'hard');

  var vw = window.innerWidth, vh = window.innerHeight;
  var mobile = vw < 760;
  var PW = Math.round(mobile ? Math.min(vw * 0.84, vh * 0.56 * 0.733, 420) : Math.min(vh * 0.62 * 0.733, vw * 0.4, 460));
  var PH = Math.round(PW / 0.733);
  var bookW = mobile ? PW : PW * 2;
  var book = $('book'), mover = $('mover');
  mover.style.width = bookW + 'px'; mover.style.height = PH + 'px';
  book.style.width = bookW + 'px'; book.style.height = PH + 'px';
  mover.style.setProperty('--pw', PW + 'px');
  pages.forEach(function (p) {
    var el = document.createElement('div');
    el.className = 'page ' + p.cls; el.setAttribute('data-density', p.density); el.innerHTML = p.inner;
    book.appendChild(el);
  });
  var pf = new St.PageFlip(book, {
    width: PW, height: PH, size: 'fixed', showCover: true, usePortrait: true, autoSize: false,
    mobileScrollSupport: true, maxShadowOpacity: 0.45, flippingTime: REDUCED ? 1 : 900, drawShadow: true, showPageCorners: false
  });
  pf.loadFromHTML(book.querySelectorAll('.page'));
  /* the book is for show: visitors can't drag its pages */
  ['pointerdown', 'mousedown', 'touchstart'].forEach(function (ev) {
    mover.addEventListener(ev, function (e) { e.stopPropagation(); }, { capture: true, passive: true });
  });
  mover.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); }, true);

  /* ---------- 4 · the book glides with the scroll ---------- */
  var secs = [].slice.call(document.querySelectorAll('section[data-sec]'));
  var TARGET = [0, 3, 0, 0];   // intro: closed · story: open at the story spread · lookbook: closed (hidden) · about: closed
  function states() {           // where the visible book's centre sits in each section, and its scale
    var headH = 60, cyOpen = headH + (vh - headH) * 0.52;
    if (mobile) return [
      { cx: vw / 2, cy: vh * 0.73, s: 0.62 },
      { cx: vw / 2, cy: cyOpen, s: 1 },
      { cx: vw / 2, cy: cyOpen - vh, s: 0.9 },
      { cx: vw / 2, cy: vh * 0.78, s: 0.42 }
    ];
    return [
      { cx: vw * 0.72, cy: headH + (vh - headH) * 0.5, s: 0.9 },
      { cx: vw / 2, cy: cyOpen, s: 1 },
      { cx: vw / 2, cy: cyOpen - vh, s: 0.9 },
      { cx: vw * 0.3, cy: headH + (vh - headH) * 0.5, s: 0.9 }
    ];
  }
  var S = states();
  function lerp(a, b, t) { return a + (b - a) * t; }
  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function visibleOffset() {   // closed book shows only the right half of the spread
    if (mobile) return 0;
    var i = pf.getCurrentPageIndex();
    if (i === 0) return PW / 2;
    if (i >= pf.getPageCount() - 1) return -PW / 2;
    return 0;
  }
  var activeSec = -1, ticking = false, pending = null;
  function frame() {
    ticking = false;
    var y = window.scrollY;
    var tops = secs.map(function (s) { return s.offsetTop; });
    var i = 0; while (i < tops.length - 1 && y >= tops[i + 1]) i++;
    var frac = i < tops.length - 1 ? Math.min(1, Math.max(0, (y - tops[i]) / (tops[i + 1] - tops[i]))) : 0;
    var e = ease(frac), a = S[i], b = S[Math.min(i + 1, S.length - 1)];
    var cx = lerp(a.cx, b.cx, e), cy = lerp(a.cy, b.cy, e), s = lerp(a.s, b.s, e);
    var lift = REDUCED ? 0 : Math.sin(Math.PI * frac);
    s *= 1 - 0.12 * lift;
    var lastEnd = tops[tops.length - 1] + secs[secs.length - 1].offsetHeight - vh;
    var drift = Math.max(0, y - lastEnd);           // after About, the book scrolls away with the page
    mover.style.transform = 'translate(' + (cx - bookW / 2 - visibleOffset()) + 'px,' + (cy - PH / 2 - drift) + 'px) perspective(1600px) rotateX(' + (6 * lift) + 'deg) scale(' + s + ')';
    var op = 1;                                     // fade out over the lookbook, back in for About
    if (i === 1) op = 1 - Math.min(1, Math.max(0, (frac - 0.05) / 0.3));
    else if (i === 2) op = frac < 0.9 ? 0 : (frac - 0.9) / 0.1;
    mover.style.opacity = op.toFixed(3);
    mover.style.pointerEvents = op < 0.5 ? 'none' : '';
    var sec = frac > 0.55 ? Math.min(i + 1, secs.length - 1) : i;
    if (sec !== activeSec) { activeSec = sec; onSection(sec); }
  }
  function want(sec) {
    var cur = pf.getCurrentPageIndex(), t = TARGET[sec];
    if (t === 0) return cur === 0 ? null : 0;
    if (mobile) return cur === t ? null : t;
    return (cur === t || cur === t + 1) ? null : t;
  }
  function onSection(sec) {
    document.querySelectorAll('.menu a').forEach(function (a) { a.classList.toggle('on', +a.getAttribute('data-sec') === sec); });
    pending = sec; tryFlip();
  }
  function tryFlip() {
    if (pending === null) return;
    if (pf.getState && pf.getState() !== 'read') { setTimeout(tryFlip, 120); return; }
    var w = want(pending); pending = null;
    if (w !== null) pf.flip(w);
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
  pf.on('flip', frame);
  pf.on('changeState', frame);
  window.addEventListener('resize', function () {
    if (Math.abs(window.innerWidth - vw) > 80 || (window.innerWidth < 760) !== mobile) { location.reload(); return; }
    vw = window.innerWidth; vh = window.innerHeight; S = states(); frame();
  });

  /* ---------- 5 · the lookbook grid ---------- */
  var grid = $('grid');
  LOOKS.forEach(function (l, k) {
    var b = document.createElement('button');
    b.className = 'tile'; b.setAttribute('data-col', l.collection);
    b.setAttribute('aria-label', 'Look ' + l.no + ', ' + label(l.collection) + ', ' + priceText(l) + (l.soldOut ? ', sold out' : ''));
    var tag = l.soldOut ? '<span class="tag sold">SOLD OUT</span>' : (l.isNew ? '<span class="tag">NEW</span>' : '');
    b.innerHTML = shot(l) + tag + '<span class="cap"><b>LOOK ' + esc(l.no) + '</b><span>' + esc(priceText(l)) + '</span></span>';
    b.addEventListener('click', function () { openPV(k); });
    grid.appendChild(b);
  });
  var tiles = [].slice.call(grid.children);
  var io = ('IntersectionObserver' in window) && !REDUCED ? new IntersectionObserver(function (entries) {
    var n = 0;
    entries.forEach(function (en) {
      if (en.isIntersecting) { var t = en.target; setTimeout(function () { t.classList.add('in'); }, (n++) * 90); io.unobserve(t); }
    });
  }, { threshold: 0.15 }) : null;
  tiles.forEach(function (t) { if (io) io.observe(t); else t.classList.add('in'); });
  document.querySelectorAll('.tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.getAttribute('data-filter');
      document.querySelectorAll('.tabs button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      tiles.forEach(function (t) { t.hidden = !(f === 'all' || t.getAttribute('data-col') === f); t.classList.remove('in'); });
      tiles.filter(function (t) { return !t.hidden; }).forEach(function (t, k) { setTimeout(function () { t.classList.add('in'); }, 60 + k * 80); });
      frame();
    });
  });

  /* ---------- 6 · product view ---------- */
  var pv = $('pv'), pvPhoto = $('pvPhoto'), cur = 0, size = 'M', lastTile = null;
  function setText(id, v) { $(id).textContent = v || ''; }
  function setPV(k) {
    cur = (k + LOOKS.length) % LOOKS.length;
    var l = LOOKS[cur];
    var old = pvPhoto.querySelector('.shot'); if (old) old.remove();
    pvPhoto.insertAdjacentHTML('beforeend', shot(l));
    setText('pvKick', label(l.collection).toUpperCase());
    setText('pvName', 'LOOK ' + l.no + ' · ' + l.name);
    setText('pvCrumb', 'Look ' + l.no);
    setText('pvPrice', priceText(l));
    setText('pvTime', l.makingTime);
    setText('pvFabric', l.fabric);
    setText('pvCraft', l.craft);
    $('pvDetails').innerHTML = 'Colour: ' + esc(l.colour) + '<br>Shirt · ' + esc(l.shirt) + '<br>Dupatta · ' + esc(l.dupatta) + '<br>Trouser · ' + esc(l.trouser);
    setText('pvFit', l.fit);
    setText('pvCare', l.care);
    setText('pvDelivery', C.delivery);
    setText('pvPrevName', 'Look ' + LOOKS[(cur - 1 + LOOKS.length) % LOOKS.length].no);
    setText('pvNextName', 'Look ' + LOOKS[(cur + 1) % LOOKS.length].no);
    updateOrder();
    pv.scrollTop = 0;
  }
  function updateOrder() {
    var l = LOOKS[cur], what = 'Look ' + l.no + ' (' + label(l.collection) + ')';
    if (l.soldOut) {
      $('pvOrder').href = waLink('Hi Deedazaib! Is ' + what + ' coming back? I’d like it in size ' + size + '.');
      setText('pvOrderText', 'SOLD OUT · ASK ON WHATSAPP');
    } else {
      $('pvOrder').href = waLink('Hi Deedazaib! I’d like to order ' + what + '. Size: ' + size + (size === 'Custom' ? ' — please take my measurements.' : '.'));
      setText('pvOrderText', 'ORDER ON WHATSAPP');
    }
    $('pvHelp').href = waLink('Hi Beenish! I need help choosing — I’m looking at Look ' + l.no + '.');
    $('pvSizeNote').style.visibility = size === 'Custom' ? 'visible' : 'hidden';
  }
  document.querySelectorAll('.sz button').forEach(function (b) {
    b.addEventListener('click', function () {
      size = b.textContent;
      document.querySelectorAll('.sz button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      updateOrder();
    });
  });
  function openPV(k) {
    lastTile = tiles[k]; setPV(k);
    pv.classList.add('open'); document.body.classList.add('pv-open');
    $('pvClose').focus({ preventScroll: true });
  }
  function closePV(silent) {
    if (!pv.classList.contains('open')) return;
    pv.classList.remove('open'); document.body.classList.remove('pv-open');
    if (!silent && lastTile) lastTile.focus({ preventScroll: true });
  }
  $('pvClose').addEventListener('click', function () { closePV(); });
  $('pvBack').addEventListener('click', function () { closePV(); });
  $('pvHome').addEventListener('click', function () { closePV(true); window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); });
  $('pvPrev').addEventListener('click', function () { setPV(cur - 1); });
  $('pvNext').addEventListener('click', function () { setPV(cur + 1); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pv.classList.contains('open')) closePV(); });

  frame();
})();
