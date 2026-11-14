/* ==========================================================================
   DEEDAZAIB — the flowing dupatta (alternative to the gold thread)
   A sheer chiffon dupatta with a gota border floats beside the intro,
   sweeps across the screen to reveal the story, rests along the edge,
   slips away over the lookbook and drapes back in for About.
   Pure decoration: if anything fails, the site still works.
   ========================================================================== */
(function () {
  'use strict';
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cv = document.getElementById('dupatta');
  var knot = document.getElementById('knot');
  if (knot) {                                   // the About monogram fades in when it comes into view
    knot.classList.remove('tied');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) knot.classList.add('tied'); }); }, { threshold: 0.5 }).observe(knot);
    } else knot.classList.add('tied');
  }
  if (!cv || !cv.getContext) return;
  try {
    var ctx = cv.getContext('2d');
    var secs = [].slice.call(document.querySelectorAll('section[data-sec]'));
    var vw = 0, vh = 0, dpr = 1, mobile = false;

    function size() {
      vw = window.innerWidth || document.documentElement.clientWidth || 1024;
      vh = window.innerHeight || document.documentElement.clientHeight || 768;
      mobile = vw < 760;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr);
      cv.style.width = vw + 'px'; cv.style.height = vh + 'px';
    }

    /* where the dupatta lies in each part of the page: a curve (4 points, as fractions of the screen),
       its width (fraction of the shorter screen side), how sheer it is and how much it sways */
    function states() {
      if (mobile) return {
        intro: { p: [[1.15, 0.50], [0.75, 0.62], [0.35, 0.78], [-0.10, 1.02]], w: 0.36, a: 0.85, s: 1 },
        sweep: { p: [[1.30, -0.10], [0.70, 0.30], [0.30, 0.70], [-0.30, 1.10]], w: 1.70, a: 0.70, s: 0.6 },
        story: { p: [[1.06, -0.05], [0.99, 0.35], [1.03, 0.70], [0.98, 1.08]], w: 0.07, a: 0.75, s: 0.4 },
        away:  { p: [[1.30, -0.10], [1.25, 0.35], [1.30, 0.70], [1.25, 1.10]], w: 0.07, a: 0.00, s: 0.4 },
        about: { p: [[-0.10, -0.02], [0.30, 0.05], [0.75, 0.10], [1.15, 0.05]], w: 0.30, a: 0.70, s: 0.8 }
      };
      return {
        intro: { p: [[1.08, -0.08], [0.80, 0.22], [0.92, 0.62], [0.62, 1.08]], w: 0.30, a: 0.85, s: 1 },
        sweep: { p: [[1.25, -0.20], [0.70, 0.20], [0.35, 0.75], [-0.25, 1.20]], w: 1.60, a: 0.70, s: 0.6 },
        story: { p: [[1.04, -0.05], [0.95, 0.35], [0.99, 0.70], [0.93, 1.08]], w: 0.09, a: 0.75, s: 0.45 },
        away:  { p: [[1.30, -0.05], [1.22, 0.35], [1.28, 0.70], [1.22, 1.08]], w: 0.09, a: 0.00, s: 0.45 },
        about: { p: [[-0.06, -0.08], [0.22, 0.25], [0.10, 0.65], [0.38, 1.08]], w: 0.24, a: 0.75, s: 0.9 }
      };
    }
    var S;

    function mix(A, B, k) {
      return {
        p: A.p.map(function (q, i) { return [q[0] + (B.p[i][0] - q[0]) * k, q[1] + (B.p[i][1] - q[1]) * k]; }),
        w: A.w + (B.w - A.w) * k, a: A.a + (B.a - A.a) * k, s: A.s + (B.s - A.s) * k
      };
    }
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function clamp(x) { return Math.max(0, Math.min(1, x)); }

    function target() {                          // the dupatta's pose for the current scroll position
      var y = window.scrollY, tops = secs.map(function (s) { return s.offsetTop; });
      var i = 0; while (i < tops.length - 1 && y >= tops[i + 1]) i++;
      var frac = i < tops.length - 1 ? clamp((y - tops[i]) / (tops[i + 1] - tops[i])) : 0;
      if (i === 0) return frac < 0.5 ? mix(S.intro, S.sweep, ease(frac * 2)) : mix(S.sweep, S.story, ease((frac - 0.5) * 2));
      if (i === 1) return mix(S.story, S.away, ease(clamp((frac - 0.2) / 0.5)));
      if (i === 2) {                             // the lookbook can be long: come back only near its end
        var lbEnd = tops[3] - y;                 // px until About reaches the top
        return mix(S.away, S.about, ease(clamp(1 - (lbEnd - 0) / (vh * 0.9))));
      }
      return S.about;
    }

    var cur = null;
    function bez(p, u) {
      var m = 1 - u;
      return [m * m * m * p[0][0] + 3 * m * m * u * p[1][0] + 3 * m * u * u * p[2][0] + u * u * u * p[3][0],
              m * m * m * p[0][1] + 3 * m * m * u * p[1][1] + 3 * m * u * u * p[2][1] + u * u * u * p[3][1]];
    }

    var N = 90, M = 7, t0 = performance.now();
    function draw(now) {
      var t = REDUCED ? 0 : (now - t0) / 1000;
      var tg = target();
      cur = cur ? mix(cur, tg, REDUCED ? 1 : 0.12) : tg;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vw, vh);
      if (cur.a < 0.01) return;

      var p = cur.p.map(function (q) { return [q[0] * vw, q[1] * vh]; });
      var W = cur.w * Math.min(vw, vh), sway = cur.s;
      // build the cloth: for each step along its length, points across its width
      var rows = [], shades = [];
      for (var i = 0; i <= N; i++) {
        var u = i / N;
        var c = bez(p, u), c2 = bez(p, Math.min(1, u + 0.002)), c1 = bez(p, Math.max(0, u - 0.002));
        var tx = c2[0] - c1[0], ty = c2[1] - c1[1], tl = Math.hypot(tx, ty) || 1;
        var nx = -ty / tl, ny = tx / tl;
        var twist = Math.cos(u * 5.2 - t * 0.9);                 // the cloth turning in the breeze
        var half = W / 2 * (0.62 + 0.38 * Math.abs(twist)) * (0.92 + 0.08 * Math.sin(u * 11 - t * 2.3));
        var off = sway * W * 0.35 * Math.pow(u, 1.1) * Math.sin(u * 6.5 - t * 1.25);
        var row = [];
        for (var j = 0; j <= M; j++) {
          var v = -1 + 2 * j / M;
          var ripple = Math.sin(v * 3.1 + u * 17 - t * 2.4) * W * 0.025 * sway;
          row.push([c[0] + nx * (off + v * half + ripple * 0.3) + tx / tl * ripple, c[1] + ny * (off + v * half + ripple * 0.3) + ty / tl * ripple]);
        }
        rows.push(row);
        shades.push(0.45 + 0.55 * Math.abs(twist));
      }
      ctx.globalAlpha = cur.a;
      // chiffon: dusty rose, lighter where the cloth faces us, darker in the folds
      for (i = 0; i < N; i++) {
        for (j = 0; j < M; j++) {
          var v0 = -1 + 2 * (j + 0.5) / M;
          var f = shades[i] * (0.82 + 0.18 * Math.sin(v0 * 3.1 + i / N * 17 - t * 2.4));
          var r = Math.round(176 + 46 * f), g = Math.round(112 + 52 * f), b = Math.round(108 + 44 * f);
          ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + (0.18 + 0.20 * f).toFixed(3) + ')';
          ctx.beginPath();
          ctx.moveTo(rows[i][j][0], rows[i][j][1]); ctx.lineTo(rows[i][j + 1][0], rows[i][j + 1][1]);
          ctx.lineTo(rows[i + 1][j + 1][0], rows[i + 1][j + 1][1]); ctx.lineTo(rows[i + 1][j][0], rows[i + 1][j][1]);
          ctx.closePath(); ctx.fill();
        }
      }
      // buti: tiny gold dots scattered over the body
      ctx.fillStyle = 'rgba(196,158,92,.75)';
      for (i = 3; i < N - 2; i += (W > Math.min(vw, vh) * 0.6 ? 2 : 4)) {
        for (j = 1; j < M; j += 2) {
          var q = rows[i][(j + (i / 4 | 0)) % (M - 1) + 1] || rows[i][j];
          ctx.beginPath(); ctx.arc(q[0], q[1], Math.min(2.6, Math.max(1, W * 0.008)), 0, 6.283); ctx.fill();
        }
      }
      // gota border along both long edges
      [0, M].forEach(function (j, k) {
        var inner = k === 0 ? 1 : M - 1;
        ctx.strokeStyle = 'rgba(212,178,113,.95)'; ctx.lineWidth = Math.min(7, Math.max(2, W * 0.03));
        ctx.beginPath();
        for (var i2 = 0; i2 <= N; i2++) {
          var a = rows[i2][j], bq = rows[i2][inner];
          var e0 = Math.min(0.12, 6 / (Math.hypot(bq[0] - a[0], bq[1] - a[1]) || 1)); var x = a[0] + (bq[0] - a[0]) * e0, y = a[1] + (bq[1] - a[1]) * e0;
          if (i2) ctx.lineTo(x, y); else ctx.moveTo(x, y);
        }
        ctx.stroke();
        ctx.strokeStyle = 'rgba(140,100,50,.55)'; ctx.lineWidth = 1;
        ctx.beginPath();
        for (i2 = 0; i2 <= N; i2++) {
          var a2 = rows[i2][j], b2 = rows[i2][inner];
          var e2 = Math.min(0.32, 14 / (Math.hypot(b2[0] - a2[0], b2[1] - a2[1]) || 1)); var x2 = a2[0] + (b2[0] - a2[0]) * e2, y2 = a2[1] + (b2[1] - a2[1]) * e2;
          if (i2) ctx.lineTo(x2, y2); else ctx.moveTo(x2, y2);
        }
        ctx.stroke();
      });
      // tassels at the free end
      var last = rows[N], prev = rows[N - 3];
      ctx.strokeStyle = 'rgba(196,158,92,.9)'; ctx.lineWidth = 1.2;
      for (j = 0; j <= M; j++) {
        var e = last[j], dx = e[0] - prev[j][0], dy = e[1] - prev[j][1], dl = Math.hypot(dx, dy) || 1;
        var L = Math.max(8, W * 0.08);
        ctx.beginPath(); ctx.moveTo(e[0], e[1]); ctx.lineTo(e[0] + dx / dl * L, e[1] + dy / dl * L); ctx.stroke();
        ctx.beginPath(); ctx.arc(e[0] + dx / dl * L, e[1] + dy / dl * L, 2, 0, 6.283); ctx.fillStyle = 'rgba(196,158,92,.95)'; ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    var running = true;
    function loop(now) { if (running) { draw(now); requestAnimationFrame(loop); } }
    size(); S = states();
    window.addEventListener('resize', function () { size(); S = states(); cur = null; });
    document.addEventListener('visibilitychange', function () {
      var was = running; running = !document.hidden;
      if (running && !was) requestAnimationFrame(loop);
    });
    if (REDUCED) { draw(0); window.addEventListener('scroll', function () { draw(0); }, { passive: true }); running = false; }
    else requestAnimationFrame(loop);
  } catch (err) {
    if (window.console) console.error('Deedazaib dupatta could not start:', err);
    cv.style.display = 'none';
  }
})();
