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
     it embroiders زیب in the hoop (intro), runs through the story timeline,
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
  /* زیب in Gulzar (the logo lettering), as stitch outlines: [start, segments...] in -1..1 units */
  var ZAIB = [[[0.4881,0.2531],[0.4765,0.2155],[0.5691,0.162],[0.6124,0.1369,0.6486,0.1138,0.6775,0.0926],[0.7064,0.0713,0.7301,0.0516,0.7484,0.0333],[0.7783,0.0024,0.799,-0.028,0.8106,-0.0578],[0.8221,-0.0877,0.8327,-0.121,0.8424,-0.1576],[0.8771,-0.2849],[0.919,-0.2762],[0.88,-0.0839],[0.8617,0.0039,0.8424,0.0685,0.8221,0.1099],[0.8019,0.1514,0.7807,0.1817,0.7585,0.201],[0.746,0.2126,0.7342,0.2205,0.7231,0.2249],[0.712,0.2292,0.6982,0.2323,0.6819,0.2343],[0.4881,0.2531]],[[0.8858,-0.5004],[0.8819,-0.5004,0.8778,-0.5006,0.8735,-0.5011],[0.8691,-0.5016,0.8645,-0.5023,0.8597,-0.5033],[0.8212,-0.5139,0.7925,-0.53,0.7737,-0.5517],[0.7549,-0.5734,0.7455,-0.5944,0.7455,-0.6146],[0.7455,-0.632,0.7501,-0.6476,0.7592,-0.6616],[0.7684,-0.6756,0.7763,-0.6869,0.7831,-0.6956],[0.8366,-0.765],[0.8438,-0.765],[0.8583,-0.7399,0.8756,-0.7197,0.8959,-0.7043],[0.9161,-0.6888,0.9422,-0.6778,0.974,-0.671],[0.9913,-0.6681,1.0,-0.6609,1.0,-0.6493],[1.0,-0.6426,0.9961,-0.6339,0.9884,-0.6233],[0.9161,-0.5177],[0.9113,-0.511,0.9067,-0.5064,0.9024,-0.504],[0.898,-0.5016,0.8925,-0.5004,0.8858,-0.5004]],[[0.2292,-0.0434],[0.2167,-0.0434,0.2,-0.0468,0.1793,-0.0535],[0.1586,-0.0603,0.1405,-0.0699,0.1251,-0.0824],[0.1376,-0.1094,0.1494,-0.1311,0.1605,-0.1475],[0.1716,-0.1639,0.1878,-0.1827,0.209,-0.2039],[0.2176,-0.1952,0.2287,-0.1885,0.2422,-0.1837],[0.2557,-0.1788,0.2687,-0.1764,0.2813,-0.1764],[0.3044,-0.1764,0.3273,-0.1846,0.35,-0.201],[0.3726,-0.2174,0.3907,-0.243,0.4042,-0.2777],[0.4331,-0.2704],[0.4215,-0.1981,0.3972,-0.1422,0.3601,-0.1027],[0.323,-0.0631,0.2793,-0.0434,0.2292,-0.0434]],[[-0.6341,0.243],[-0.6833,0.243,-0.7298,0.2401,-0.7737,0.2343],[-0.8175,0.2285,-0.8564,0.2172,-0.8901,0.2003],[-0.9238,0.1834,-0.9506,0.1593,-0.9704,0.128],[-0.9901,0.0966,-1.0,0.0554,-1.0,0.0043],[-1.0,-0.0255,-0.9966,-0.0617,-0.9899,-0.1041],[-0.9831,-0.1465,-0.9773,-0.187,-0.9725,-0.2256],[-0.9277,-0.2256],[-0.9325,-0.1851,-0.9328,-0.1538,-0.9284,-0.1316],[-0.9241,-0.1094,-0.9152,-0.0882,-0.9017,-0.068],[-0.8814,-0.039,-0.8465,-0.0166,-0.7968,-0.0007],[-0.7472,0.0152,-0.6814,0.0231,-0.5994,0.0231],[-0.4914,0.0231,-0.3965,0.0183,-0.3145,0.0087],[-0.2326,-0.001,-0.1593,-0.0135,-0.0947,-0.0289],[-0.0417,-0.0424,-0.0005,-0.055,0.0289,-0.0665],[0.0583,-0.0781,0.0865,-0.0945,0.1135,-0.1157],[0.1309,-0.1302,0.1441,-0.1441,0.1533,-0.1576],[0.1624,-0.1711,0.1709,-0.1822,0.1786,-0.1909],[0.1863,-0.1996,0.1964,-0.2039,0.209,-0.2039],[0.2167,-0.2039,0.2193,-0.1984,0.2169,-0.1873],[0.2145,-0.1762,0.2092,-0.1624,0.201,-0.1461],[0.1928,-0.1297,0.1839,-0.1138,0.1743,-0.0983],[0.153,-0.028,0.121,0.0277,0.0781,0.0687],[0.0352,0.1097,-0.0239,0.1432,-0.0991,0.1692],[-0.1598,0.1904,-0.2232,0.2061,-0.2892,0.2162],[-0.3553,0.2263,-0.4184,0.2333,-0.4787,0.2372],[-0.5389,0.241,-0.5907,0.243,-0.6341,0.243]],[[0.2914,0.765],[0.2846,0.765,0.276,0.7636,0.2654,0.7607],[0.2355,0.751,0.2119,0.7363,0.1945,0.7166],[0.1772,0.6968,0.1685,0.6768,0.1685,0.6565],[0.1685,0.6402,0.1728,0.6252,0.1815,0.6117],[0.1902,0.5982,0.1979,0.5871,0.2046,0.5785],[0.2567,0.5105],[0.2654,0.5105],[0.2731,0.5365,0.2887,0.5572,0.3124,0.5727],[0.336,0.5881,0.3598,0.5982,0.3839,0.603],[0.4808,0.4729],[0.4895,0.4729],[0.4972,0.498,0.5117,0.5172,0.5329,0.5307],[0.5541,0.5442,0.5768,0.5534,0.6009,0.5582],[0.6173,0.5621,0.6255,0.5703,0.6255,0.5828],[0.6255,0.5905,0.6221,0.5992,0.6153,0.6088],[0.5445,0.7101],[0.5358,0.7216,0.5257,0.7274,0.5141,0.7274],[0.5074,0.7274,0.4987,0.726,0.4881,0.7231],[0.4649,0.7144,0.4447,0.7035,0.4273,0.6905],[0.41,0.6775,0.397,0.6647,0.3883,0.6522],[0.3218,0.7477],[0.3131,0.7592,0.303,0.765,0.2914,0.765]],[[-0.4027,0.7433],[-0.4066,0.7433,-0.4107,0.7431,-0.415,0.7426],[-0.4194,0.7421,-0.424,0.7414,-0.4288,0.7404],[-0.4673,0.7298,-0.496,0.7137,-0.5148,0.692],[-0.5336,0.6703,-0.543,0.6493,-0.543,0.6291],[-0.543,0.6117,-0.5384,0.596,-0.5293,0.5821],[-0.5201,0.5681,-0.5122,0.5568,-0.5054,0.5481],[-0.4519,0.4787],[-0.4447,0.4787],[-0.4302,0.5037,-0.4129,0.524,-0.3926,0.5394],[-0.3724,0.5548,-0.3463,0.5659,-0.3145,0.5727],[-0.2972,0.5756,-0.2885,0.5828,-0.2885,0.5944],[-0.2885,0.6011,-0.2924,0.6098,-0.3001,0.6204],[-0.3724,0.726],[-0.3772,0.7327,-0.3818,0.7373,-0.3861,0.7397],[-0.3905,0.7421,-0.396,0.7433,-0.4027,0.7433]]];
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

      /* 1 · زیب stitched in the hoop, letter by letter, right to left */
      var hb = box($('hoop')), hr = hb.w / 2, R = hr * 0.6, hx = hb.cx, hy = hb.cy;
      function P(u, v) { return [hx + u * R, hy + v * R]; }
      var fill = '';
      ZAIB.forEach(function (c, k) {
        var s0 = P(c[0][0], c[0][1]);
        if (k === 0) { px = s0[0]; py = s0[1]; d = 'M' + f(px) + ' ' + f(py); dv = d; }
        else jump(s0[0], s0[1]);
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
      C(px, py + R * 0.5, hx, hy + hr * 0.5, hx, hy + hr * 1.02);   // out through the bottom of the hoop
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
