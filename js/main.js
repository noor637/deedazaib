/* ==========================================================================
   DEEDAZAIB — website behaviour
   You shouldn't need to edit this file: content lives in js/config.js.
   Sections: 1 helpers · 2 WhatsApp links · 3 the gold thread
             4 lookbook grid · 5 product view
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
     it embroiders the D ز monogram in the hoop (intro), runs through the story timeline,
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
  /* the D ز monogram (Cinzel D + Gulzar ز, as in the logo), as stitch outlines: [start, segments...], ring radius = 1 */
  var DZ = [[[-0.1349,-0.252],[-0.0818,-0.252,-0.0355,-0.2417,0.004,-0.221],[0.0435,-0.2003,0.0743,-0.171,0.0963,-0.1331],[0.1184,-0.0953,0.1294,-0.0509,0.1294,0.0],[0.1294,0.0509,0.1184,0.0952,0.0963,0.1328],[0.0743,0.1705,0.0435,0.1998,0.004,0.2207],[-0.0355,0.2416,-0.0818,0.252,-0.1349,0.252],[-0.2948,0.252],[-0.2956,0.2275],[-0.2909,0.2275,-0.2826,0.2275,-0.2707,0.2275],[-0.2588,0.2275,-0.2452,0.2275,-0.2301,0.2275],[-0.2149,0.2275,-0.2003,0.2275,-0.1862,0.2275],[-0.1722,0.2275,-0.1606,0.2275,-0.1515,0.2275],[-0.1424,0.2275,-0.1379,0.2275,-0.1379,0.2275],[-0.0988,0.2275,-0.065,0.2181,-0.0363,0.1993],[-0.0077,0.1805,0.0146,0.154,0.0304,0.1199],[0.0463,0.0859,0.0542,0.0459,0.0542,0.0],[0.0542,-0.0459,0.0463,-0.0859,0.0304,-0.1199],[0.0146,-0.154,-0.0078,-0.1805,-0.0366,-0.1993],[-0.0654,-0.2181,-0.0992,-0.2275,-0.1379,-0.2275],[-0.1379,-0.2275,-0.1426,-0.2275,-0.1522,-0.2275],[-0.1617,-0.2275,-0.1738,-0.2275,-0.1885,-0.2275],[-0.2033,-0.2275,-0.2184,-0.2275,-0.2341,-0.2275],[-0.2497,-0.2275,-0.2639,-0.2275,-0.2765,-0.2275],[-0.2892,-0.2275,-0.2979,-0.2275,-0.3028,-0.2275],[-0.3028,-0.252],[-0.1349,-0.252]],[[-0.2622,-0.252],[-0.2622,0.252],[-0.3294,0.252],[-0.3294,-0.252],[-0.2622,-0.252]],[[-0.3272,0.1994],[-0.3272,0.252],[-0.3848,0.252],[-0.3848,0.2448],[-0.3848,0.2448,-0.3833,0.2448,-0.3802,0.2448],[-0.377,0.2448,-0.3755,0.2448,-0.3755,0.2448],[-0.363,0.2448,-0.3523,0.2404,-0.3434,0.2315],[-0.3346,0.2226,-0.3299,0.2119,-0.3294,0.1994],[-0.3272,0.1994]],[[-0.3272,-0.1994],[-0.3294,-0.1994],[-0.3294,-0.2119,-0.334,-0.2226,-0.3431,-0.2315],[-0.3522,-0.2404,-0.363,-0.2448,-0.3755,-0.2448],[-0.3755,-0.2448,-0.3769,-0.2448,-0.3798,-0.2448],[-0.3827,-0.2448,-0.3841,-0.2448,-0.3841,-0.2448],[-0.3848,-0.252],[-0.3272,-0.252],[-0.3272,-0.1994]],[[0.1937,0.3301],[0.1894,0.316],[0.2239,0.2961],[0.2401,0.2867,0.2536,0.2781,0.2644,0.2701],[0.2752,0.2622,0.284,0.2548,0.2909,0.248],[0.302,0.2365,0.3098,0.2251,0.3141,0.214],[0.3184,0.2028,0.3224,0.1904,0.326,0.1767],[0.3389,0.1292],[0.3546,0.1324],[0.34,0.2043],[0.3332,0.237,0.326,0.2611,0.3184,0.2766],[0.3109,0.2921,0.3029,0.3034,0.2947,0.3106],[0.29,0.315,0.2856,0.3179,0.2814,0.3196],[0.2773,0.3212,0.2722,0.3223,0.266,0.3231],[0.1937,0.3301]],[[0.3422,0.0487],[0.3407,0.0487,0.3392,0.0487,0.3376,0.0485],[0.336,0.0483,0.3343,0.048,0.3325,0.0477],[0.3181,0.0437,0.3074,0.0377,0.3003,0.0296],[0.2933,0.0215,0.2898,0.0136,0.2898,0.0061],[0.2898,-0.0004,0.2915,-0.0062,0.2949,-0.0115],[0.2984,-0.0167,0.3013,-0.0209,0.3038,-0.0242],[0.3238,-0.0501],[0.3265,-0.0501],[0.3319,-0.0407,0.3384,-0.0332,0.346,-0.0274],[0.3535,-0.0216,0.3632,-0.0175,0.3751,-0.015],[0.3816,-0.0139,0.3848,-0.0112,0.3848,-0.0069],[0.3848,-0.0044,0.3834,-0.0011,0.3805,0.0028],[0.3535,0.0423],[0.3517,0.0448,0.35,0.0465,0.3484,0.0474],[0.3468,0.0483,0.3447,0.0487,0.3422,0.0487]]];
  try {
    var NS = 'http://www.w3.org/2000/svg';
    var svg = $('thread'), main = svg.parentNode;
    var mask = $('threadMaskPath'), line = $('threadLine'), shade = $('threadShade'), needle = $('needle');
    var knot = $('knot');
    var total = 0, marks = [], L0 = 0, built = false;
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

      /* 1 · the D ز monogram stitched in the hoop: the double ring, then the letters */
      var hb = box($('hoop')), hr = hb.w / 2, rr = hr * 0.8, R = rr * 1.3, hx = hb.cx, hy = hb.cy;
      function P(u, v) { return [hx + u * R, hy + v * R]; }
      px = hx; py = hy - rr; d = 'M' + f(px) + ' ' + f(py); dv = d;
      A(rr, hx, hy + rr, 1); A(rr, hx, hy - rr, 1);                     // outer ring
      var ri = rr * 0.9;
      C(hx + 6, hy - rr + 2, hx + 6, hy - ri - 2, hx, hy - ri);
      A(ri, hx, hy + ri, 0); A(ri, hx, hy - ri, 0);                     // inner ring, the other way round
      var fill = '';
      DZ.forEach(function (c) {
        var s0 = P(c[0][0], c[0][1]);
        jump(s0[0], s0[1]);
        fill += 'M' + f(s0[0]) + ' ' + f(s0[1]);
        c.slice(1).forEach(function (g) {
          var a = [];
          for (var i = 0; i < g.length; i += 2) { var q = P(g[i], g[i + 1]); a.push(q[0], q[1]); }
          if (a.length === 2) seg('L' + f(a[0]) + ' ' + f(a[1]), a[0], a[1]);
          else C(a[0], a[1], a[2], a[3], a[4], a[5]);
          fill += (a.length === 2 ? 'L' : 'C') + a.map(f).join(' ');
        });
        fill += 'Z';
      });
      $('hoopFill').setAttribute('d', fill);
      jump(hx, hy + ri);                                                // back down to the ring
      C(hx, hy + ri + 10, hx, hy + hr * 0.95, hx, hy + hr * 1.02);   // out through the bottom of the hoop
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
      svg.classList.toggle('zaib-done', L >= L0 - 1);
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

  /* ---------- 4 · the lookbook grid ---------- */
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

  /* ---------- 5 · product view ---------- */
  var pv = $('pv'), pvPhoto = $('pvPhoto'), cur = 0, size = 'M', lastTile = null;
  function setText(id, v) { $(id).textContent = v || ''; }
  function setPV(k) {
    cur = (k + LOOKS.length) % LOOKS.length;
    var l = LOOKS[cur];
    [].slice.call(pvPhoto.querySelectorAll('.gal, .gal-btn, .gal-count')).forEach(function (n) { n.remove(); });
    pvPhoto.insertAdjacentHTML('beforeend', gallery(l));
    wireGallery();
    setText('pvKick', label(l.collection).toUpperCase());
    setText('pvName', l.name ? l.name : 'LOOK ' + l.no);
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
    setText('pvPrevName', pl.name || 'Look ' + pl.no);
    setText('pvNextName', nl.name || 'Look ' + nl.no);
    updateOrder();
    pv.scrollTop = 0;
  }
  function wireGallery() {
    var g = pvPhoto.querySelector('.gal'); if (!g) return;
    var n = g.children.length, count = pvPhoto.querySelector('.gal-count');
    function at() { return Math.round(g.scrollLeft / g.clientWidth); }
    function go(i) { g.scrollTo({ left: Math.max(0, Math.min(n - 1, i)) * g.clientWidth, behavior: REDUCED ? 'auto' : 'smooth' }); }
    g.addEventListener('scroll', function () { if (count) count.textContent = (at() + 1) + ' / ' + n; }, { passive: true });
    var p = pvPhoto.querySelector('.gal-btn.prev'), x = pvPhoto.querySelector('.gal-btn.next');
    if (p) p.addEventListener('click', function () { go(at() - 1); });
    if (x) x.addEventListener('click', function () { go(at() + 1); });
    g.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go(at() + 1); if (e.key === 'ArrowLeft') go(at() - 1); });
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
