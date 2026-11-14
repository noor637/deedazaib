/* ==========================================================================
   DEEDAZAIB — website behaviour
   You shouldn't need to edit this file: content lives in js/config.js.
   Sections: 1 helpers · 2 WhatsApp links · 3 the gold thread
             4 favourites · 5 lookbook grid · 6 product view
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
  function priceText(l) { return l.price ? 'Rs ' + l.price : 'Price on request'; }
  function waLink(text) {
    var n = String(C.whatsapp || '').replace(/[^0-9]/g, '');
    return 'https://wa.me/' + n + '?text=' + encodeURIComponent(text);
  }
  function orn(color) {
    return '<div style="color:' + color + '"><div class="orn" aria-hidden="true"><i></i><b></b><i></i></div></div>';
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
  function photosOf(l) {
    var list = (l.photos && l.photos.length) ? l.photos : (l.photo ? [l.photo] : []);
    return list.filter(Boolean);
  }
  function alt(l, i) { return (l.name || ('Look ' + l.no)) + (i ? ' — photo ' + (i + 1) : ''); }
  function shot(l) {             // grid tile: first photo, second photo fades in on hover
    var dark = l.collection === 'festive';
    var bg = dark ? '#5A1F2E' : '#D8C2A2';
    var ph = photosOf(l);
    if (ph.length) {
      return '<div class="shot has-photo" style="background:' + bg + '">' +
        '<img src="' + esc(ph[0]) + '" alt="' + esc(alt(l, 0)) + '" loading="lazy" decoding="async">' +
        (ph[1] ? '<img class="alt" src="' + esc(ph[1]) + '" alt="" aria-hidden="true" loading="lazy" decoding="async">' : '') + '</div>';
    }
    return '<div class="shot" style="background:' + bg + '">' + dress(l, dark) + '</div>';
  }
  function gallery(l) {          // product view: every photo, swipeable
    var ph = photosOf(l);
    if (!ph.length) return '<div class="gal"><div class="slide">' + shot(l) + '</div></div>';
    return '<div class="gal" tabindex="0" aria-label="Photos of ' + esc(l.name || 'this look') + '">' +
      ph.map(function (src, i) { return '<div class="slide"><img src="' + esc(src) + '" alt="' + esc(alt(l, i)) + '"' + (i ? ' loading="lazy"' : '') + ' decoding="async"></div>'; }).join('') + '</div>' +
      (ph.length > 1 ? '<button class="gal-btn prev" aria-label="Previous photo"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>' +
        '<button class="gal-btn next" aria-label="Next photo"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' +
        '<span class="gal-count" aria-live="polite">1 / ' + ph.length + '</span>' : '');
  }

  /* ---------- 2 · WhatsApp & Instagram links ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa')); });
  if (C.instagram) $('instagram').href = C.instagram; else $('instagram').style.display = 'none';
  $('year').textContent = new Date().getFullYear();
  if (C.earlyDaysPhoto) { $('early').innerHTML = '<img src="' + esc(C.earlyDaysPhoto) + '" alt="The early days of Deedazaib">'; $('early').hidden = false; }

  /* ---------- 3 · the gold thread ----------
     A single gold thread stitches down the page as you scroll:
     it embroiders a lotus in the hoop (intro), runs through the story timeline,
     slips under the lookbook like a needle under fabric, and ties off into the
     D ز monogram in About. Pure decoration: if anything fails, the site still works. */
  var frame = function () {};
  function viewport() {
    var d = document.documentElement;
    return {
      w: window.innerWidth || d.clientWidth || (window.screen && screen.width) || 1024,
      h: window.innerHeight || d.clientHeight || (window.screen && screen.height) || 768
    };
  }
  var secs = [].slice.call(document.querySelectorAll('section[data-sec]'));
  var activeSec = -1;
  function markMenu() {
    var y = window.scrollY + viewport().h * 0.45, sec = 0;
    secs.forEach(function (s, k) { if (y >= s.offsetTop) sec = k; });
    if (sec !== activeSec) {
      activeSec = sec;
      document.querySelectorAll('.menu a').forEach(function (a) { a.classList.toggle('on', +a.getAttribute('data-sec') === sec); });
    }
  }
  if (!$('thread')) {                                   // the dupatta version has no thread
    frame = markMenu;
    window.addEventListener('scroll', function () { requestAnimationFrame(markMenu); }, { passive: true });
  } else try {
    var NS = 'http://www.w3.org/2000/svg';
    var svg = $('thread'), main = svg.parentNode;
    var mask = $('threadMaskPath'), line = $('threadLine'), shade = $('threadShade'), needle = $('needle');
    var knot = $('knot');
    var total = 0, marks = [], L0 = 0, LR = 0, built = false;
    var startT = null, LOAD_MS = REDUCED ? 1 : 2600;

    function box(el) {                                   // element box in <main> coordinates
      var r = el.getBoundingClientRect(), m = main.getBoundingClientRect();
      return { x: r.left - m.left, y: r.top - m.top, w: r.width, h: r.height, cx: r.left - m.left + r.width / 2, cy: r.top - m.top + r.height / 2 };
    }
    function f(n) { return Math.round(n * 10) / 10; }

    function build() {
      var vp = viewport(), vw = vp.w, vh = vp.h, mobile = vw < 760;
      var W = main.offsetWidth, H = main.offsetHeight;
      svg.setAttribute('width', W); svg.setAttribute('height', H);
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      var d = '', dv = '', px = 0, py = 0, len = 0;
      var meter = document.createElementNS(NS, 'path');
      svg.appendChild(meter);
      marks = [];
      function seg(cmd, x, y) {                          // add one command, keep the running length
        meter.setAttribute('d', 'M' + f(px) + ' ' + f(py) + cmd);
        len += meter.getTotalLength();
        d += cmd; dv += cmd; px = x; py = y;
      }
      function jump(x, y) {                              // the needle goes to the back of the fabric: counts for timing, not drawn
        meter.setAttribute('d', 'M' + f(px) + ' ' + f(py) + 'L' + f(x) + ' ' + f(y));
        len += meter.getTotalLength();
        d += 'L' + f(x) + ' ' + f(y); dv += 'M' + f(x) + ' ' + f(y); px = x; py = y;
      }
      function C(x1, y1, x2, y2, x, y) { seg('C' + f(x1) + ' ' + f(y1) + ' ' + f(x2) + ' ' + f(y2) + ' ' + f(x) + ' ' + f(y), x, y); }
      function A(r, x, y, sweep) { seg('A' + f(r) + ' ' + f(r) + ' 0 0 ' + (sweep ? 1 : 0) + ' ' + f(x) + ' ' + f(y), x, y); }
      function mark(y) { marks.push({ len: len, y: y }); }
      function through(pts) {                            // smooth curve through points (Catmull-Rom)
        var all = [{ x: px, y: py - 40 }, { x: px, y: py }].concat(pts);
        all.push({ x: pts[pts.length - 1].x, y: pts[pts.length - 1].y + 40 });
        for (var i = 1; i < all.length - 2; i++) {
          var p0 = all[i - 1], p1 = all[i], p2 = all[i + 1], p3 = all[i + 2];
          C(p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6, p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6, p2.x, p2.y);
        }
      }
      function loop(cx, cy, r) {                         // a small stitched loop around a point, entered from the top
        A(r, cx, cy + r, 1); A(r, cx, cy - r, 1); A(r, cx + r * 0.2, cy + r, 1);
      }

      /* 1 · a lotus stitched in the hoop: petal by petal, then the bowl, then down the stem */
      var hb = box($('hoop')), hr = hb.w / 2, R = hr * 0.66, hx = hb.cx, hy = hb.cy - hr * 0.08;
      function P(u, v) { return [hx + u * R, hy + v * R]; }
      var B = P(0, 0.42), fill = '';
      px = B[0]; py = B[1]; d = 'M' + f(px) + ' ' + f(py); dv = d;
      function petal(tu, tv, w) {                // out from the base to the tip and back again
        var T = P(tu, tv), ax = T[0] - B[0], ay = T[1] - B[1], al = Math.hypot(ax, ay);
        var nx = -ay / al * w * R, ny = ax / al * w * R;
        var a1 = [B[0] + ax * 0.25 - nx, B[1] + ay * 0.25 - ny], a2 = [T[0] - ax * 0.30 - nx * 0.75, T[1] - ay * 0.30 - ny * 0.75];
        var b1 = [T[0] - ax * 0.30 + nx * 0.75, T[1] - ay * 0.30 + ny * 0.75], b2 = [B[0] + ax * 0.25 + nx, B[1] + ay * 0.25 + ny];
        C(a1[0], a1[1], a2[0], a2[1], T[0], T[1]);
        C(b1[0], b1[1], b2[0], b2[1], B[0], B[1]);
        fill += 'M' + f(B[0]) + ' ' + f(B[1]) + 'C' + [a1, a2, T, b1, b2, B].map(function (q) { return f(q[0]) + ' ' + f(q[1]); }).join(' ') + 'Z';
      }
      petal(-0.92, -0.02, 0.24);                // outer left
      petal(-0.62, -0.42, 0.26);                 // inner left
      petal(0, -0.86, 0.30);                     // centre
      petal(0.62, -0.42, 0.26);                  // inner right
      petal(0.92, -0.02, 0.24);                 // outer right
      var L1 = P(-0.78, 0.40), R1 = P(0.78, 0.40), D1 = P(-0.45, 0.78), D2 = P(0.45, 0.78);
      C(B[0] - R * 0.3, B[1] + R * 0.02, L1[0] + R * 0.2, L1[1] - R * 0.02, L1[0], L1[1]);   // the bowl beneath the petals
      C(D1[0], D1[1], D2[0], D2[1], R1[0], R1[1]);
      C(R1[0] - R * 0.2, R1[1] - R * 0.02, B[0] + R * 0.3, B[1] + R * 0.02, B[0], B[1]);
      fill += 'M' + f(B[0]) + ' ' + f(B[1]) + 'C' + [[B[0] - R * 0.3, B[1] + R * 0.02], [L1[0] + R * 0.2, L1[1] - R * 0.02], L1, D1, D2, R1, [R1[0] - R * 0.2, R1[1] - R * 0.02], [B[0] + R * 0.3, B[1] + R * 0.02], B].map(function (q) { return f(q[0]) + ' ' + f(q[1]); }).join(' ') + 'Z';
      $('hoopFill').setAttribute('d', fill);
      LR = len;                                  // the flower is done: its petals fill in
      var S1 = P(0, 0.70);
      jump(S1[0], S1[1]);                        // the stem starts under the bowl
      C(hx + R * 0.10, S1[1] + R * 0.25, hx - R * 0.08, hb.cy + hr * 0.75, hx, hb.cy + hr * 1.02);   // down the stem and out of the hoop
      L0 = len; mark(-1);

      /* 2 · down into the story and through the timeline */
      var head = box($('story').querySelector('.head h2'));
      var dots = [].slice.call(document.querySelectorAll('#story .t-dot')).map(box);
      var story = box($('story'));
      var r = 9;
      if (mobile) {
        var mx = 10;
        through([{ x: mx + 14, y: story.y + 10 }, { x: mx, y: head.y + head.h + 30 }, { x: mx, y: dots[0].cy - r - 60 }, { x: dots[0].cx, y: dots[0].cy - r }]);
      } else {
        through([{ x: Math.max(head.x + head.w + 60, px - 30), y: head.cy }, { x: dots[0].cx + 30, y: (head.cy + dots[0].cy) / 2 }, { x: dots[0].cx, y: dots[0].cy - r }]);
      }
      mark(dots[0].cy);
      dots.forEach(function (b, k) {
        loop(b.cx, b.cy, r);
        if (dots[k + 1]) { var n = dots[k + 1]; C(px - 18, py + (n.cy - b.cy) * 0.35, n.cx + 18, n.cy - r - (n.cy - b.cy) * 0.35, n.cx, n.cy - r); }
        mark(b.cy + r);
      });

      /* 3 · under the lookbook, like a needle passing under fabric */
      var cat = box($('catalogue'));
      var cx0 = mobile ? vw * 0.5 : vw * 0.5;
      through([{ x: (px + cx0) / 2 + (mobile ? 20 : -40), y: (py + cat.y) / 2 + 30 }, { x: cx0, y: cat.y + 30 }]);
      mark(cat.y);

      /* 4 · up through About and tied off into the monogram */
      var kb = box(knot), KR = kb.w / 2, kx = kb.cx, ky = kb.cy;
      var about = box($('about'));
      C(cx0, cat.y + cat.h * 0.6, kx, about.y - 160, kx, ky - KR);
      mark(ky - KR - vh * 0.08);
      A(KR, kx, ky + KR, 1); A(KR, kx, ky - KR, 1);      // outer ring
      var ir = KR * 0.86;
      C(kx + KR * 0.06, ky - KR + 2, kx + KR * 0.06, ky - ir - 2, kx, ky - ir);
      A(ir, kx, ky + ir, 0); A(ir, kx, ky - ir, 0);      // inner ring, the other way round
      C(kx - 8, ky - ir - 10, kx - 18, ky - KR - 14, kx - 26, ky - KR - 26);   // the tail of the knot
      mark(Infinity);

      svg.removeChild(meter);
      total = len;
      mask.setAttribute('d', d);
      [line, shade].forEach(function (p) { p.setAttribute('d', dv); });
      line.setAttribute('data-len', total);
      built = true;
    }

    function drawnLength() {
      var vh = viewport().h, maxS = Math.max(1, document.documentElement.scrollHeight - vh);
      var y = window.scrollY, t = startT === null ? 0 : Math.min(1, (performance.now() - startT) / LOAD_MS);
      if (REDUCED) return total;
      var ease = 1 - Math.pow(1 - t, 3);
      var intro = L0 * ease;
      // scroll position at which the needle reaches each mark
      var at = marks.map(function (m) { return m.y === -1 ? 0 : (m.y === Infinity ? maxS : Math.min(maxS - 1, m.y - vh * 0.62)); });
      for (var k = 1; k < at.length; k++) if (at[k] <= at[k - 1]) at[k] = at[k - 1] + 0.5;
      var L = L0;
      for (k = 1; k < marks.length; k++) {
        if (y <= at[k]) { L = marks[k - 1].len + (marks[k].len - marks[k - 1].len) * Math.max(0, (y - at[k - 1]) / (at[k] - at[k - 1])); break; }
        L = marks[k].len;
      }
      if (y > 0 && t < 1) intro = L0;                     // scrolling straight away finishes the lettering
      return Math.max(Math.min(intro, L0), y > 0 ? L : 0) || 0;
    }

    var ticking = false;
    frame = function () {
      ticking = false;
      markMenu();
      if (!built) return;
      var L = Math.min(total, drawnLength());
      mask.style.strokeDasharray = f(L) + ' ' + f(total + 10);
      var done = L >= total - 1;
      knot.classList.toggle('tied', done);
      svg.classList.toggle('lotus-done', L >= LR - 1);
      if (L < 1 || done) { needle.style.opacity = '0'; }
      else {
        var p = mask.getPointAtLength(L), q = mask.getPointAtLength(Math.max(0, L - 3));
        var a = Math.atan2(p.y - q.y, p.x - q.x) * 180 / Math.PI;
        needle.setAttribute('transform', 'translate(' + f(p.x) + ' ' + f(p.y) + ') rotate(' + f(a) + ')');
        needle.style.opacity = '1';
      }
      if (startT !== null && performance.now() - startT < LOAD_MS + 50) { ticking = true; requestAnimationFrame(frame); }
    };
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }

    var rebuildTimer = null;
    function rebuild() { clearTimeout(rebuildTimer); rebuildTimer = setTimeout(function () { build(); req(); }, 120); }
    build();
    startT = performance.now();
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', rebuild);
    window.addEventListener('load', rebuild);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(rebuild);
    if ('ResizeObserver' in window) new ResizeObserver(rebuild).observe(main);
  } catch (err) {
    if (window.console) console.error('Deedazaib thread could not start:', err);
    var th = $('thread'); if (th) th.style.display = 'none';
    var kn = $('knot'); if (kn) kn.classList.add('tied');
    frame = markMenu;
    window.addEventListener('scroll', function () { requestAnimationFrame(markMenu); }, { passive: true });
  }

  /* ---------- 4 · favourites (saved on this device, sent as one WhatsApp message) ---------- */
  var HEART = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.3l-1.2-1.1C5.4 14.4 2 11.3 2 7.6 2 4.6 4.4 2.3 7.4 2.3c1.7 0 3.4.8 4.6 2.1 1.2-1.3 2.9-2.1 4.6-2.1 3 0 5.4 2.3 5.4 5.3 0 3.7-3.4 6.8-8.8 11.6z"/></svg>';
  var FAV_KEY = 'deedazaib-favourites', favs = [];
  try { favs = JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch (e) { favs = []; }
  favs = favs.filter(function (no) { return LOOKS.some(function (l) { return l.no === no; }); });
  function isFav(no) { return favs.indexOf(no) !== -1; }
  function lookName(l) { return l.name || ('Look ' + l.no); }
  function toggleFav(no) {
    if (isFav(no)) favs = favs.filter(function (x) { return x !== no; }); else favs.push(no);
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) { /* private mode: keep for this visit */ }
    renderFavs();
  }
  function renderFavs() {
    document.querySelectorAll('.fav[data-no]').forEach(function (b) {
      var on = isFav(b.getAttribute('data-no'));
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var l = LOOKS[cur];
    if (l) {
      var on = isFav(l.no);
      $('pvFav').setAttribute('aria-pressed', on ? 'true' : 'false');
      $('pvFavText').textContent = on ? 'SAVED TO FAVOURITES' : 'SAVE TO FAVOURITES';
    }
    $('savedTab').hidden = !favs.length;
    var bar = $('favbar');
    bar.hidden = !favs.length;
    $('favCount').textContent = favs.length;
    $('favWord').textContent = favs.length === 1 ? 'favourite' : 'favourites';
    var list = LOOKS.filter(function (x) { return isFav(x.no); }).map(function (x) { return '• ' + lookName(x) + ' — Look ' + x.no; });
    $('favSend').href = waLink('Hi Deedazaib! These are my favourites:\n' + list.join('\n') + '\nCould you tell me more about them?');
    if (filter === 'saved' && !favs.length) applyFilter('all');
  }

  /* ---------- 5 · the lookbook grid ---------- */
  var grid = $('grid'), filter = 'all', cur = 0;
  LOOKS.forEach(function (l, k) {
    var t = document.createElement('div');
    t.className = 'tile'; t.setAttribute('data-col', l.collection);
    var tag = l.soldOut ? '<span class="tag sold">SOLD OUT</span>' : (l.isNew ? '<span class="tag">NEW</span>' : '');
    t.innerHTML = '<button class="tile-open" aria-label="' + esc(lookName(l) + ', look ' + l.no + ', ' + label(l.collection) + ', ' + priceText(l) + (l.soldOut ? ', sold out' : '')) + '">' +
      shot(l) + tag + '<span class="cap"><b>' + esc(lookName(l)) + '</b><span>' + esc(priceText(l)) + '</span></span></button>' +
      '<button class="fav" data-no="' + esc(l.no) + '" aria-pressed="false" aria-label="Save ' + esc(lookName(l)) + ' to favourites">' + HEART + '</button>';
    t.querySelector('.tile-open').addEventListener('click', function () { openPV(k); });
    t.querySelector('.fav').addEventListener('click', function (e) { e.stopPropagation(); toggleFav(l.no); });
    grid.appendChild(t);
  });
  var tiles = [].slice.call(grid.children);
  var io = ('IntersectionObserver' in window) && !REDUCED ? new IntersectionObserver(function (entries) {
    var n = 0;
    entries.forEach(function (en) {
      if (en.isIntersecting) { var t = en.target; setTimeout(function () { t.classList.add('in'); }, (n++) * 90); io.unobserve(t); }
    });
  }, { threshold: 0.15 }) : null;
  tiles.forEach(function (t) { if (io) io.observe(t); else t.classList.add('in'); });
  function applyFilter(f) {
    filter = f;
    document.querySelectorAll('.tabs button').forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-filter') === f ? 'true' : 'false'); });
    tiles.forEach(function (t, k) {
      var l = LOOKS[k];
      t.hidden = !(f === 'all' || (f === 'saved' ? isFav(l.no) : l.collection === f));
      t.classList.remove('in');
    });
    tiles.filter(function (t) { return !t.hidden; }).forEach(function (t, k) { setTimeout(function () { t.classList.add('in'); }, 60 + k * 80); });
    frame();
  }
  document.querySelectorAll('.tabs button').forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.getAttribute('data-filter')); });
  });
  $('favList').addEventListener('click', function () {
    applyFilter('saved');
    $('catalogue').scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
  });
  $('favClear').addEventListener('click', function () {
    favs = []; try { localStorage.removeItem(FAV_KEY); } catch (e) {}
    renderFavs();
  });

  /* ---------- 6 · product view ---------- */
  var pv = $('pv'), pvPhoto = $('pvPhoto'), size = 'M', lastTile = null, pushed = false;
  function setText(id, v) { $(id).textContent = v || ''; }
  function setPV(k) {
    cur = (k + LOOKS.length) % LOOKS.length;
    var l = LOOKS[cur];
    [].slice.call(pvPhoto.querySelectorAll('.gal, .gal-btn, .gal-count, .zoom-hint')).forEach(function (n) { n.remove(); });
    pvPhoto.insertAdjacentHTML('beforeend', gallery(l));
    wireGallery();
    setText('pvKick', label(l.collection).toUpperCase());
    setText('pvName', lookName(l));
    setText('pvCrumb', 'Look ' + l.no);
    setText('pvPrice', priceText(l));
    setText('pvTime', l.makingTime); $('pvTime').parentNode.hidden = !l.makingTime;
    setText('pvFabric', l.fabric); $('pvFabric').parentNode.hidden = !l.fabric;
    var det = [];
    if (l.colour) det.push('Colour · ' + esc(l.colour));
    if (l.shirt) det.push('Shirt · ' + esc(l.shirt));
    if (l.dupatta) det.push('Dupatta · ' + esc(l.dupatta));
    if (l.trouser) det.push('Trouser · ' + esc(l.trouser));
    $('pvDetails').innerHTML = det.join('<br>');
    setText('pvCraft', l.craft); setText('pvFit', l.fit); setText('pvCare', l.care); setText('pvDelivery', C.delivery);
    ['pvCraft', 'pvDetails', 'pvFit', 'pvCare', 'pvDelivery'].forEach(function (id) { $(id).closest('details').hidden = !$(id).textContent.trim(); });
    var pl = LOOKS[(cur - 1 + LOOKS.length) % LOOKS.length], nl = LOOKS[(cur + 1) % LOOKS.length];
    setText('pvPrevName', lookName(pl));
    setText('pvNextName', lookName(nl));
    updateOrder();
    renderFavs();
    pv.scrollTop = 0;
  }

  /* gallery: swipe or arrows between photos; tap a photo to zoom into the embroidery */
  function wireGallery() {
    var g = pvPhoto.querySelector('.gal'); if (!g) return;
    var n = g.children.length, count = pvPhoto.querySelector('.gal-count');
    var zoomed = null;
    function at() { return Math.round(g.scrollLeft / g.clientWidth); }
    function unzoom() {
      if (!zoomed) return;
      zoomed.classList.remove('zoomed'); g.classList.remove('zooming'); zoomed = null;
    }
    function go(i) { unzoom(); g.scrollTo({ left: Math.max(0, Math.min(n - 1, i)) * g.clientWidth, behavior: REDUCED ? 'auto' : 'smooth' }); }
    function aim(slide, e) {
      var r = slide.getBoundingClientRect(), img = slide.querySelector('img');
      var x = Math.max(0, Math.min(100, (e.clientX - r.left) / r.width * 100));
      var y = Math.max(0, Math.min(100, (e.clientY - r.top) / r.height * 100));
      img.style.transformOrigin = x + '% ' + y + '%';
    }
    g.addEventListener('scroll', function () { if (count) count.textContent = (at() + 1) + ' / ' + n; }, { passive: true });
    var p = pvPhoto.querySelector('.gal-btn.prev'), x = pvPhoto.querySelector('.gal-btn.next');
    if (p) p.addEventListener('click', function () { go(at() - 1); });
    if (x) x.addEventListener('click', function () { go(at() + 1); });
    g.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') go(at() + 1);
      if (e.key === 'ArrowLeft') go(at() - 1);
      if (e.key === 'Escape' && zoomed) { e.stopPropagation(); unzoom(); }
    });
    [].slice.call(g.querySelectorAll('.slide')).forEach(function (slide) {
      if (!slide.querySelector('img')) return;
      slide.addEventListener('click', function (e) {
        if (zoomed === slide) { unzoom(); return; }
        unzoom(); aim(slide, e);
        zoomed = slide; slide.classList.add('zoomed'); g.classList.add('zooming');
        var hint = pvPhoto.querySelector('.zoom-hint'); if (hint) hint.remove();
      });
      slide.addEventListener('pointermove', function (e) { if (zoomed === slide) aim(slide, e); });
    });
    pv._unzoom = unzoom;
    if (g.querySelector('.slide img')) {
      pvPhoto.insertAdjacentHTML('beforeend', '<span class="zoom-hint" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 8v6M8 11h6"/></svg>Tap the photo to see the embroidery</span>');
    }
  }
  function updateOrder() {
    var l = LOOKS[cur], what = (l.name ? l.name + ' — ' : '') + 'Look ' + l.no + ' (' + label(l.collection) + ')';
    if (l.soldOut) {
      $('pvOrder').href = waLink('Hi Deedazaib! Is ' + what + ' coming back? I’d like it in size ' + size + '.');
      setText('pvOrderText', 'SOLD OUT · ASK ON WHATSAPP');
    } else {
      $('pvOrder').href = waLink('Hi Deedazaib! I’d like to order ' + what + '. Size: ' + size + (size === 'Custom' ? ' — please take my measurements.' : '.'));
      setText('pvOrderText', 'ORDER ON WHATSAPP');
    }
    $('pvHelp').href = waLink('Hi Beenish! I need help choosing — I’m looking at ' + lookName(l) + ' (Look ' + l.no + ').');
    $('pvSizeNote').style.visibility = size === 'Custom' ? 'visible' : 'hidden';
  }
  document.querySelectorAll('.sz button').forEach(function (b) {
    b.addEventListener('click', function () {
      size = b.textContent;
      document.querySelectorAll('.sz button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      updateOrder();
    });
  });
  $('pvFav').addEventListener('click', function () { toggleFav(LOOKS[cur].no); });

  /* every look has its own link (…/#look-02), and the phone's back button closes the look */
  function hashFor(k) { return '#look-' + LOOKS[k].no; }
  function lookFromHash() {
    var m = /^#look-(.+)$/.exec(location.hash || '');
    if (!m) return -1;
    for (var k = 0; k < LOOKS.length; k++) if (LOOKS[k].no === decodeURIComponent(m[1])) return k;
    return -1;
  }
  var canHistory = !!(window.history && history.pushState);
  function openPV(k, fromHistory) {
    lastTile = tiles[k] && tiles[k].querySelector('.tile-open'); setPV(k);
    var wasOpen = pv.classList.contains('open');
    pv.classList.add('open'); document.body.classList.add('pv-open');
    if (canHistory && !fromHistory && !wasOpen) { history.pushState({ pv: cur }, '', hashFor(cur)); pushed = true; }
    $('pvClose').focus({ preventScroll: true });
  }
  function showLook(k) {                       // previous / next inside the open view
    setPV(k);
    if (canHistory) history.replaceState({ pv: cur }, '', hashFor(cur));
  }
  function closePV(silent, fromHistory) {
    if (!pv.classList.contains('open')) return;
    if (pv._unzoom) pv._unzoom();
    pv.classList.remove('open'); document.body.classList.remove('pv-open');
    if (canHistory && !fromHistory) {
      if (pushed) { pushed = false; history.back(); }
      else history.replaceState(null, '', location.pathname + location.search);
    }
    if (!silent && lastTile) lastTile.focus({ preventScroll: true });
  }
  window.addEventListener('popstate', function (e) {
    var k = e.state && typeof e.state.pv === 'number' ? e.state.pv : lookFromHash();
    if (k >= 0) { openPV(k, true); pushed = true; }
    else { pushed = false; closePV(false, true); }
  });
  $('pvClose').addEventListener('click', function () { closePV(); });
  $('pvBack').addEventListener('click', function () { closePV(); });
  $('pvHome').addEventListener('click', function () { closePV(true); window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); });
  $('pvPrev').addEventListener('click', function () { showLook(cur - 1); });
  $('pvNext').addEventListener('click', function () { showLook(cur + 1); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pv.classList.contains('open')) closePV(); });

  renderFavs();
  var start = lookFromHash();                  // opened from a shared link
  if (start >= 0) {
    if (canHistory) history.replaceState({ pv: start }, '', hashFor(start));
    openPV(start, true);
  }
  frame();
})();
