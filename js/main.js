/* Uriel Rozenbaum — interactions */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const G = window.gsap;
  const PHONE = '972542059860';
  const WA_DEFAULT = 'שלום אוריאל, הגעתי דרך האתר ואשמח לקבל פרטים';
  const waLink = text => `https://wa.me/${PHONE}?text=${encodeURIComponent(text || WA_DEFAULT)}`;

  /* ---------- projects (from the studio's portfolio) ---------- */
  const PROJECTS = [
    { name: 'מרכז מלכתא | נשי חב״ד צפת', type: 'Community Center', scope: 'תכנון ועיצוב פנים · פיקוח וניהול הפרויקט', kind: 'מרכז קהילתי',
      desc: 'מרכז רב־תכליתי המשלב חללי אירוח, התכנסות, פעילות, משרדים וחדר כושר. שפה עיצובית אלגנטית, חומרים בהירים ופרטי תאורה עשירים.',
      pins: [[30, 6, 'תאורה שקועה', 'Recessed light'], [24, 47, 'דלת זכוכית ופליז', 'Brass & glass'], [93, 34, 'חיפוי עץ', 'Oak slats'], [64, 64, 'עיצוב שולחנות', 'Table setting'], [16, 86, 'שיש מבריק', 'Polished marble']], ratio: 1.5, light: [50, 18], images: ['1000499986', '1000509378', '1000500028', '1000499978', '1000509382', '1000500033', '1000500029'] },
    { name: 'בית חב״ד נאות פרס | חיפה', type: 'Community Space', scope: 'תכנון ועיצוב פנים · פיקוח עליון', kind: 'חלל קהילתי',
      desc: 'תכנון חללי התכנסות ולימוד, מטבח ומשרד בסביבה חמימה, שימושית ומזמינה. שילוב קשתות, גוונים טבעיים וחיפויי עץ.',
      pins: [[33, 40, 'קשתות', 'Arches'], [9, 42, 'קיר אבן', 'Stone wall'], [88, 36, 'חיפוי עץ', 'Wood cladding'], [56, 70, 'עמדות לימוד', 'Study seating'], [57, 7, 'תאורה שקועה', 'Downlights']], ratio: 1.5, light: [45, 15], images: ['1000429748', '1000429875', '1000429874', '1000431507'] },
    { name: 'מועדונית נוער', type: 'Leisure & Community', scope: 'תכנון ועיצוב פנים בלבד', kind: 'פנאי וקהילה',
      desc: 'מרחב נוער צבעוני וגמיש הכולל אזורי ישיבה, פעילות חברתית ומשחק, תוך שילוב חומרים חמים ופלטת צבעים צעירה.',
      pins: [[88, 24, 'מנורות תלויות', 'Pendants'], [40, 28, 'קיר פסי עץ', 'Slat wall'], [52, 74, 'ספה מודולרית', 'Modular sofa'], [9, 32, 'צמחייה', 'Greenery'], [70, 92, 'פינת משחק', 'Play corner']], ratio: 2.4, light: [62, 22], images: ['1000661922', '1000661732', '1000661792', '1000661845', '1000661868', '1000661870', '1000661873', '1000661920', '1000661925', '1000661927'] },
    { name: 'מעבדת אלקטרוניקה', type: 'Workspace', scope: 'תכנון ועיצוב פנים בלבד', kind: 'סביבת עבודה',
      desc: 'סביבת עבודה טכנולוגית מוקפדת עם עמדות עבודה מרובות, אזור משרדי נפרד ושילוב של גוונים כהים, כחול עמוק ותאורה פונקציונלית.',
      pins: [[30, 30, 'מסך הדרכה', 'Training screen'], [59, 22, 'חיפוי כחול עמוק', 'Deep blue'], [60, 62, 'מחיצת זכוכית', 'Glass partition'], [80, 60, 'עמדות עבודה', 'Workstations'], [52, 8, 'תאורה פונקציונלית', 'Task light']], ratio: 1.873, light: [50, 12], images: ['1000640605', '1000640601', '1000640604', '1000640656'] },
    { name: 'דירת יוקרה', type: 'Residential', scope: 'תכנון ועיצוב פנים · פיקוח עליון', kind: 'מגורים',
      desc: 'חללי מגורים בהירים עם דגש על פרופורציות, נגרות מותאמת, תאורה רכה וחומרים טבעיים.',
      pins: [[30, 30, 'גוף תאורה גלי', 'Wave light'], [31, 64, 'בר ישיבה', 'Breakfast bar'], [21, 42, 'מטבח מובנה', 'Built-ins'], [86, 52, 'מסגרת אבן', 'Stone frame'], [37, 7, 'ספוטים שקועים', 'Spots']], ratio: 1.86, light: [55, 30], images: ['1000796498', '1000796844', '1000796532', '1000796533', '1000796595', '1000796670', '1000796843'] },
  ];
  const img = id => `assets/img/p/${id}.webp`;

  /* ---------- wordmark ---------- */
  const WM = window.WORDMARK;
  $$('[data-wordmark]').forEach(svg => {
    if (!WM) return;
    svg.setAttribute('viewBox', WM.vb);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Rozenbaum');
    svg.innerHTML = `<g stroke-width="${WM.sw}">${WM.paths.map(d => `<path d="${d}"/>`).join('')}</g><path class="cord" d="${WM.cord}" stroke-width="${WM.sw * .45}"/><circle class="dot" cx="${WM.dot[0]}" cy="${WM.dot[1]}" r="${WM.sw * 1.9}"/>`;
  });

  /* ---------- WhatsApp links ---------- */
  $$('[data-wa]').forEach(a => {
    a.href = waLink(a.dataset.wa);
    a.target = '_blank'; a.rel = 'noopener';
  });
  $$('.year').forEach(y => y.textContent = new Date().getFullYear());

  /* ---------- split words ---------- */
  $$('.split').forEach(el => {
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w';
          const i = document.createElement('span'); i.textContent = part; w.appendChild(i); frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
    });
    walk(el);
  });

  /* ---------- menu ---------- */
  const burger = $('.burger'), menu = $('.menu');
  const toggleMenu = open => { menu.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', open); };
  burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- sections: header theme, active nav, side dots ---------- */
  const screens = $$('main > section[data-title]');
  const header = $('.header'), dots = $('.dots'), waFloat = $('.wa-float');
  screens.forEach(s => {
    const a = document.createElement('a'); a.href = '#' + s.id; a.setAttribute('aria-label', s.dataset.title);
    a.innerHTML = `<span>${s.dataset.title}</span>`; dots.appendChild(a);
  });
  const setActive = s => {
    const id = s.id;
    $$('.nav a, .dots a').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id));
    header.classList.toggle('is-dark', s.dataset.theme === 'dark' && id !== 'home');
    header.classList.toggle('is-light', s.dataset.theme === 'light');
    waFloat.classList.toggle('is-visible', id !== 'home' && id !== 'contact');
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { setActive(e.target); e.target.dispatchEvent(new CustomEvent('screen:enter')); } });
  }, { rootMargin: '-45% 0px -50% 0px' });
  screens.forEach(s => io.observe(s));

  /* play videos only while their screen is visible */
  const vio = new IntersectionObserver(es => es.forEach(e => {
    $$('video', e.target).forEach(v => e.isIntersecting ? v.play().catch(() => {}) : v.pause());
  }), { threshold: .2 });
  screens.forEach(s => $('video', s) && vio.observe(s));

  /* ---------- cursor (quiet dot) ---------- */
  if (fine && !reduced) {
    const c = $('.cursor'), dot = $('.cursor__dot'), label = $('span', dot);
    let mx = -100, my = -100, dx = mx, dy = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() { dx += (mx - dx) * .22; dy += (my - dy) * .22; c.style.transform = `translate(${dx}px, ${dy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor], a, button, input');
      const txt = t && t.dataset.cursor;
      c.classList.toggle('is-hover', !!txt);
      c.classList.toggle('is-link', !!t && !txt);
      if (txt) label.textContent = txt;
    });
  }

  /* ==========================================================
     HERO — light switch
     ========================================================== */
  const hero = $('.hero'), scene = $('.scene'), lit = $('.scene__lit'), flare = $('.scene__flare');
  const sw = $('.switch'), swLbl = $('.switch__lbl');
  let heroOn = false, touched = false;
  const setLight = (on, x = 48, y = 25) => {
    heroOn = on;
    scene.style.setProperty('--lx', x + '%'); scene.style.setProperty('--ly', y + '%');
    hero.classList.toggle('is-lit', on);
    sw.classList.toggle('is-on', on); sw.setAttribute('aria-pressed', on);
    swLbl.textContent = on ? 'Lights on' : 'Lights off';
    $$('.hot').forEach(h => { h.classList.toggle('is-on', on); h.textContent = on ? 'OFF' : 'ON'; h.dataset.cursor = on ? 'OFF' : 'ON'; });
    if (G && !reduced) {
      G.to(lit, { clipPath: `circle(${on ? 150 : 0}% at ${x}% ${y}%)`, duration: on ? 1.8 : 1, ease: on ? 'expo.inOut' : 'power3.inOut' });
      if (on) G.fromTo(flare, { opacity: .9, scale: .2 }, { opacity: 0, scale: 2.4, duration: 1.6, ease: 'expo.out' });
    } else {
      lit.style.clipPath = on ? 'none' : `circle(0% at ${x}% ${y}%)`;
    }
  };
  $$('.hot').forEach(h => h.addEventListener('click', () => {
    touched = true; const [x, y] = h.dataset.light.split(',').map(Number); setLight(!heroOn, x, y);
  }));
  sw.addEventListener('click', () => { touched = true; setLight(!heroOn); });


  /* ---------- object-fit:cover mapping (image % → box px) ---------- */
  const coverMap = (box, ratio, x, y) => {
    const W = box.clientWidth, H = box.clientHeight;
    let w = W, h = W / ratio; if (h < H) { h = H; w = H * ratio; }
    return [(W - w) / 2 + w * x / 100, (H - h) / 2 + h * y / 100];
  };
  /* spec pins: dot + drawn leader line + label card */
  const buildPins = (layer, box, ratio, list) => {
    layer.innerHTML = '';
    const W = box.clientWidth, H = box.clientHeight;
    list.forEach(([x, y, he, en]) => {
      const [px, py] = coverMap(box, ratio, x, y);
      if (px < 10 || py < 10 || px > W - 10 || py > H - 10) return;
      const left = px > W * .62, up = py > H * .35;
      const dx = (left ? -1 : 1) * Math.min(90, W * .09), dy = (up ? -1 : 1) * Math.min(46, H * .08);
      const el = document.createElement('div'); el.className = 'pin';
      el.style.left = px + 'px'; el.style.top = py + 'px';
      el.style.setProperty('--dx', dx + 'px'); el.style.setProperty('--dy', dy + 'px');
      el.style.setProperty('--len', Math.hypot(dx, dy) + 'px');
      el.style.setProperty('--ang', Math.atan2(dy, dx) + 'rad');
      el.style.setProperty('--tx', left ? '-100%' : '0');
      el.innerHTML = `<div class="pin__dot"></div><div class="pin__line"></div><div class="pin__card"><b>${he}</b><span>${en}</span></div>`;
      layer.appendChild(el);
    });
    return $$('.pin', layer);
  };
  const animatePins = (pinsEls, delay = 0) => {
    if (!G || reduced) return;
    pinsEls.forEach((p, k) => {
      const d = delay + k * .22;
      G.fromTo($('.pin__dot', p), { scale: 0 }, { scale: 1, duration: .5, delay: d, ease: 'back.out(3)' });
      G.fromTo($('.pin__line', p), { scaleX: 0 }, { scaleX: 1, duration: .5, delay: d + .15, ease: 'power2.out' });
      G.fromTo($('.pin__card', p), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5, delay: d + .45, ease: 'power3.out' });
    });
  };
  /* ==========================================================
     PROJECTS — light-up slider + gallery
     ========================================================== */
  const stage = $('.stage'), thumbs = $('.thumbs'), info = $('.works__info');
  stage.innerHTML = PROJECTS.map((p, i) => `
    <div class="slide" style="--lx:${p.light[0]}%;--ly:${p.light[1]}%">
      <img class="slide__dark" src="${img(p.images[0])}" alt="" loading="${i ? 'lazy' : 'eager'}">
      <img class="slide__lit" src="${img(p.images[0])}" alt="${p.name}" loading="${i ? 'lazy' : 'eager'}">
      <img class="slide__sketch" src="${img(p.images[0])}" alt="" loading="lazy">
      <div class="pins"></div>
      <div class="slide__tag"><span class="lbl">${p.type}</span></div>
      <span class="slide__num">0${i + 1}</span>
    </div>`).join('') + `<div class="stage__bulb"><i></i><span class="bulb__txt">האור כבוי</span></div><div class="lens-ring"></div>`;
  thumbs.innerHTML = PROJECTS.map(p => `<button aria-label="${p.name}"><img src="${img(p.images[0])}" alt="" loading="lazy"><i></i></button>`).join('');
  const slides = $$('.slide', stage), tbtns = $$('button', thumbs);
  let cur = -1, timer = null, worksVisible = false;
  const fill = p => {
    $('[data-p="type"]', info).innerHTML = `<span class="he-s" style="font-size:14px;font-weight:700">${p.kind}</span> · ${p.type}`;
    $('[data-p="name"]', info).textContent = p.name;
    $('[data-p="desc"]', info).textContent = p.desc;
    $('[data-p="scope"]', info).textContent = p.scope;
    $('[data-p="count"]', info).textContent = p.images.length + ' הדמיות';
  };
  const go = i => {
    i = (i + PROJECTS.length) % PROJECTS.length;
    if (i === cur) return;
    const prev = slides[cur]; cur = i;
    const s = slides[i], p = PROJECTS[i];
    slides.forEach(x => x.classList.toggle('is-active', x === s));
    tbtns.forEach((b, k) => b.classList.toggle('is-active', k === i));
    $('.works__count').innerHTML = `<b>0${i + 1}</b> / 0${PROJECTS.length}`;
    stage.classList.remove('is-lit'); $('.bulb__txt').textContent = 'האור כבוי';
    const litImg = $('.slide__lit', s), darkImg = $('.slide__dark', s);
    const pinEls = buildPins($('.pins', s), stage, p.ratio, p.pins);
    pinEls.forEach(x => x.style.opacity = '');
    if (G && !reduced) G.set($$('.pin__dot, .pin__line, .pin__card', s), { opacity: 0 }), animatePins(pinEls, 1.6), G.set($$('.pin__dot, .pin__line, .pin__card', s), { opacity: 1, delay: 1.55 });
    if (G && !reduced) {
      G.killTweensOf([litImg, darkImg, info]);
      G.set(litImg, { clipPath: `circle(0% at ${p.light[0]}% ${p.light[1]}%)` });
      G.fromTo([darkImg, litImg], { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'expo.out' });
      G.to(litImg, { clipPath: `circle(150% at ${p.light[0]}% ${p.light[1]}%)`, duration: 1.7, delay: .55, ease: 'expo.inOut',
        onStart: () => { stage.classList.add('is-lit'); $('.bulb__txt').textContent = 'האור דלוק'; } });
      if (prev) G.fromTo(s, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1, ease: 'expo.inOut' });
      G.timeline().to(info, { opacity: 0, y: 14, duration: .25 }).add(() => fill(p)).to(info, { opacity: 1, y: 0, duration: .6, ease: 'expo.out' });
    } else { fill(p); litImg.style.clipPath = 'none'; stage.classList.add('is-lit'); }
    restartAuto();
  };
  const restartAuto = () => {
    clearTimeout(timer);
    tbtns.forEach(b => { const bar = $('i', b); bar.style.transition = 'none'; bar.style.transform = 'scaleX(0)'; });
    if (!worksVisible || reduced || cur < 0) return;
    const bar = $('i', tbtns[cur]);
    requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = 'transform 7s linear'; bar.style.transform = 'scaleX(1)'; }));
    timer = setTimeout(() => go(cur + 1), 7000);
  };
  tbtns.forEach((b, i) => b.addEventListener('click', () => go(i)));
  $('.works__next').addEventListener('click', () => go(cur + 1));
  $('.works__prev').addEventListener('click', () => go(cur - 1));
  go(0);
  new IntersectionObserver(es => es.forEach(e => { worksVisible = e.isIntersecting; restartAuto(); }), { threshold: .5 }).observe($('#projects'));

  /* lightbox */
  const lb = $('.lightbox'), lbImg = $('.lightbox__main img'), lbStrip = $('.lightbox__strip');
  let lbP = 0, lbI = 0;
  const lbShow = i => {
    const p = PROJECTS[lbP]; lbI = (i + p.images.length) % p.images.length;
    lbImg.src = img(p.images[lbI]); lbImg.alt = `${p.name} — הדמיה ${lbI + 1}`;
    $$('button', lbStrip).forEach((b, k) => b.classList.toggle('is-active', k === lbI));
    if (G && !reduced) G.fromTo(lbImg, { opacity: 0, scale: .98 }, { opacity: 1, scale: 1, duration: .6, ease: 'expo.out' });
  };
  const lbOpen = () => {
    lbP = cur; const p = PROJECTS[lbP];
    $('.lightbox__title').textContent = p.name; $('.lightbox__type').textContent = p.type;
    lbStrip.innerHTML = p.images.map(id => `<button><img src="${img(id)}" alt="" loading="lazy"></button>`).join('');
    $$('button', lbStrip).forEach((b, k) => b.addEventListener('click', () => lbShow(k)));
    lb.hidden = false; document.body.style.overflow = 'hidden'; clearTimeout(timer); lbShow(0);
    $('.lightbox__close').focus();
  };
  const lbClose = () => { lb.hidden = true; document.body.style.overflow = ''; restartAuto(); };
  const ring = $('.lens-ring');
  stage.addEventListener('mousemove', e => {
    const r = stage.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    stage.style.setProperty('--mx', x + 'px'); stage.style.setProperty('--my', y + 'px');
    $$('.slide__sketch', stage).forEach(im => { im.style.setProperty('--mx', x + 'px'); im.style.setProperty('--my', y + 'px'); });
    ring.style.left = x + 'px'; ring.style.top = y + 'px';
  });
  addEventListener('resize', () => { const p = PROJECTS[cur]; buildPins($('.pins', slides[cur]), stage, p.ratio, p.pins); });
  stage.addEventListener('click', lbOpen);
  $('.works__open').addEventListener('click', lbOpen);
  $('.lightbox__close').addEventListener('click', lbClose);
  $('.lightbox__nav--next').addEventListener('click', () => lbShow(lbI + 1));
  $('.lightbox__nav--prev').addEventListener('click', () => lbShow(lbI - 1));
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbShow(lbI + 1);
    if (e.key === 'ArrowRight') lbShow(lbI - 1);
  });

  /* ---------- compare slider ---------- */
  const cmp = $('.compare'), range = $('input', cmp);
  const setPos = v => cmp.style.setProperty('--pos', v + '%');
  range.addEventListener('input', () => setPos(range.value));

  /* ---------- build the room in stages ---------- */
  const cmpPinsData = [[16, 74, 'ספה פינתית', 'Linen sofa'], [30, 36, 'וילון פשתן', 'Linen drapes'], [52, 12, 'תאורה עקיפה', 'Cove light'], [84, 76, 'כורסת בוקלה', 'Boucle chair'], [57, 62, 'צמחייה', 'Greenery']];
  const cmpPinsLayer = $('.compare__pins');
  const stepBtns = $$('.build__steps button');
  const setStep = n => {
    cmp.dataset.step = n;
    stepBtns.forEach(b => b.setAttribute('aria-pressed', +b.dataset.step === n));
    const target = n === 0 ? 0 : 100;
    if (G && !reduced) { const o = { v: parseFloat(range.value) }; G.to(o, { v: target, duration: 1.4, ease: 'expo.inOut', onUpdate: () => { setPos(o.v); range.value = o.v; } }); }
    else { setPos(target); range.value = target; }
    const els = n >= 2 ? buildPins(cmpPinsLayer, cmp, 1536 / 826, cmpPinsData) : (cmpPinsLayer.innerHTML = '', []);
    if (n === 2) animatePins(els, .6);
  };
  stepBtns.forEach(b => b.addEventListener('click', () => setStep(+b.dataset.step)));
  range.addEventListener('input', () => { cmp.dataset.step = 3; stepBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.step === '3')); });

  /* ---------- flashlight grid + live dimension lines on every screen ---------- */
  screens.forEach((s, i) => {
    if (s.id !== 'home') { const f = document.createElement('div'); f.className = 'flash'; s.prepend(f); }
    const d = document.createElement('div'); d.className = 'dim'; d.setAttribute('aria-hidden', 'true');
    d.innerHTML = `<i></i><span>A-0${i + 1} · <b class="dim__w">0</b> × <b class="dim__h">0</b></span><i></i>`;
    s.appendChild(d);
    ['a', 'b'].forEach(k => { const r = document.createElement('span'); r.className = 'reg reg--' + k; r.setAttribute('aria-hidden', 'true'); s.appendChild(r); });
  });
  const setDims = () => { $$('.dim__w').forEach(e => e.textContent = innerWidth); $$('.dim__h').forEach(e => e.textContent = innerHeight); };
  setDims(); addEventListener('resize', setDims);
  if (fine) addEventListener('mousemove', e => {
    const s = e.target.closest && e.target.closest('.screen'); if (!s) return;
    const r = s.getBoundingClientRect();
    s.style.setProperty('--mx', e.clientX - r.left + 'px'); s.style.setProperty('--my', e.clientY - r.top + 'px');
  });

  /* ---------- composer → WhatsApp ---------- */
  const form = $('.composer');
  $$('.chip', form).forEach(ch => ch.addEventListener('click', () => $$('.chip', form).forEach(x => x.setAttribute('aria-pressed', x === ch))));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#c-name').value.trim();
    const kind = $('.chip[aria-pressed="true"]', form).textContent.trim();
    const text = `שלום אוריאל, ${name ? 'אני ' + name + ', ' : ''}הגעתי דרך האתר ואשמח לקבל פרטים על פרויקט: ${kind}`;
    window.open(waLink(text), '_blank', 'noopener');
  });

  /* ==========================================================
     ANIMATIONS
     ========================================================== */
  const finishLoad = () => { document.body.classList.remove('is-loading'); const l = $('.loader'); l && l.remove(); };
  if (!G || reduced) {
    finishLoad(); setPos(50);
    $$('[data-count]').forEach(n => n.textContent = Number(n.dataset.count).toLocaleString('en-US'));
    $$('.step').forEach(s => s.classList.add('is-on'));
    setTimeout(() => setLight(true), 600);
    return;
  }

  G.ticker.lagSmoothing(0);

  /* preloader: strokes draw, the lamp drops, then it lights up */
  const lcord = $('.loader .wordmark .cord');
  G.set(lcord, { scaleY: 0, transformOrigin: '50% 0%' });
  const lpaths = $$('.loader .wordmark g path'), ldot = $('.loader .wordmark .dot'), glow = $('.loader__glow');
  lpaths.forEach(p => { const L = p.getTotalLength(); G.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
  G.set(ldot, { scale: 0, transformOrigin: '50% 50%', fill: '#3a302a' });
  const count = { v: 0 }, cEl = $('.loader__count');
  const tl = G.timeline();
  tl.to(lpaths, { strokeDashoffset: 0, duration: 1.3, stagger: .05, ease: 'power2.inOut' }, .1)
    .to(count, { v: 100, duration: 2.1, ease: 'power2.inOut', onUpdate: () => cEl.textContent = String(Math.round(count.v)).padStart(3, '0') }, 0)
    .to(lcord, { scaleY: 1, duration: .45, ease: 'power2.out' }, 1.25)
    .fromTo(ldot, { scale: 0, y: -40 }, { scale: 1, y: 0, duration: .7, ease: 'bounce.out' }, 1.35)
    .to(ldot, { fill: '#FFB070', duration: .25, ease: 'power1.in' }, 1.95)
    .add(() => {
      const r = ldot.getBoundingClientRect();
      G.set(glow, { left: r.left + r.width / 2, top: r.top + r.height / 2 });
      ldot.style.filter = 'drop-shadow(0 0 12px rgba(255,170,90,.95))';
    }, 1.95)
    .fromTo(glow, { opacity: 0, scale: .2 }, { opacity: 1, scale: 1, duration: .8, ease: 'expo.out' }, 1.95)
    .to('.loader', { clipPath: 'circle(0% at 50% 50%)', duration: 1.1, ease: 'expo.inOut' }, 2.55)
    .add(() => finishLoad(), 3.4)
    .add(heroIntro(), 2.9);

  function heroIntro() {
    const t = G.timeline();
    t.from('.hero h1 .w > span', { yPercent: 115, duration: 1.1, stagger: .06, ease: 'expo.out' }, .2)
     .from('.hero__eyebrow, .hero__lead, .hero__ctas > *, .switch', { opacity: 0, y: 20, duration: 1, stagger: .08, ease: 'power3.out' }, .5)
     .from('.header > *', { opacity: 0, y: -14, duration: .9, stagger: .08, ease: 'power3.out' }, .4)
     .from('.hot', { opacity: 0, duration: .8, stagger: .15 }, .9)
     .from('.hero__hint', { opacity: 0, duration: 1 }, 1)
     .add(() => setTimeout(() => { if (!touched && !heroOn) setLight(true, 48, 25); }, 2400));
    return t;
  }

  /* per-screen reveal — each screen animates once when it arrives */
  const revealed = new Set();
  const reveal = (sel, fn) => { const s = $(sel); s && s.addEventListener('screen:enter', () => { if (revealed.has(sel)) return; revealed.add(sel); fn(s); }); };
  const baseIn = s => {
    G.from($$('.split .w > span', s), { yPercent: 115, duration: 1.1, stagger: .05, ease: 'expo.out' });
    G.from($$('.eyebrow, .screen__head p', s), { opacity: 0, y: 20, duration: 1, stagger: .08, ease: 'power3.out' });
  };
  reveal('#projects', s => {
    baseIn(s);
    G.from('.stage', { clipPath: 'inset(12% 12% 12% 12% round 30px)', duration: 1.4, ease: 'expo.out' });
    G.from('.thumbs button', { y: 30, opacity: 0, duration: .8, stagger: .06, ease: 'expo.out', delay: .3 });
    G.from('.works__ctrl, .works__text .btn', { opacity: 0, x: 30, duration: 1, stagger: .1, ease: 'expo.out', delay: .2 });
  });
  reveal('#about', s => {
    baseIn(s);
    G.from('.about__text p, .about__ctas', { opacity: 0, y: 24, duration: 1, stagger: .1, ease: 'power3.out', delay: .2 });
    $$('.about__sign g path').forEach(p => { const L = p.getTotalLength(); G.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.4, delay: .4, ease: 'power2.inOut' }); });
    G.from('.about__sign .dot', { scale: 0, transformOrigin: '50% 50%', duration: .6, delay: 1.6, ease: 'back.out(3)' });
    G.from('.stat', { opacity: 0, y: 50, duration: 1.1, stagger: .1, ease: 'expo.out' });
    $$('[data-count]').forEach(n => { const o = { v: 0 }; G.to(o, { v: +n.dataset.count, duration: 2.2, delay: .3, ease: 'power3.out', onUpdate: () => n.textContent = Math.round(o.v).toLocaleString('en-US') }); });
  });
  reveal('#services', s => {
    baseIn(s);
    G.from('.svc', { opacity: 0, y: 60, duration: 1.1, stagger: .12, ease: 'expo.out' });
    $$('.svc__icon *', s).forEach(p => { const L = (p.getTotalLength ? p.getTotalLength() : 300) || 300; G.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.6, delay: .4, ease: 'power2.inOut' }); });
  });
  setPos(94); range.value = 94;
  reveal('#sketch', s => {
    baseIn(s);
    G.from(cmp, { clipPath: 'inset(10% 10% 10% 10% round 30px)', duration: 1.4, ease: 'expo.out' });
    const o = { v: 94 };
    G.to(o, { v: 50, duration: 2.2, delay: .4, ease: 'expo.inOut', onUpdate: () => { setPos(o.v); range.value = o.v; } });
    G.from('.compare__overlay > *', { opacity: 0, duration: .6, stagger: .06, delay: .3 });
  });
  reveal('#reviews', s => {
    baseIn(s);
    G.from('.review', { opacity: 0, y: 60, rotate: i => [-2, 0, 2][i], duration: 1.1, stagger: .12, ease: 'expo.out' });
    G.from('.reviews__foot > *', { opacity: 0, y: 20, duration: .9, delay: .5, stagger: .1 });
  });
  reveal('#clients', s => {
    baseIn(s);
    G.from('.band--a', { xPercent: 100, duration: 1.4, ease: 'expo.out' });
    G.from('.band--b', { xPercent: -100, duration: 1.4, ease: 'expo.out', delay: .1 });
    G.from('.clients__foot > *', { opacity: 0, y: 20, duration: .9, delay: .5, stagger: .1 });
  });
  reveal('#process', s => {
    baseIn(s);
    const vertical = innerWidth <= 860;
    G.to('.process__line i', { [vertical ? 'scaleY' : 'scaleX']: 1, duration: 2.4, ease: 'power2.inOut', delay: .3 });
    $$('.step').forEach((st, i) => {
      G.from(st, { opacity: 0, y: 30, duration: .9, delay: .3 + i * .5, ease: 'expo.out' });
      setTimeout(() => st.classList.add('is-on'), 600 + i * 550);
    });
    G.from('.process__cta > *', { opacity: 0, y: 20, duration: .9, delay: 2.2, stagger: .1 });
  });
  reveal('#contact', s => {
    G.from('.contact__big', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out' });
    G.from($$('.split .w > span', s), { yPercent: 115, duration: 1.1, stagger: .05, ease: 'expo.out', delay: .2 });
    G.from('.contact__grid p, .contact__wa, .contact__alt, .composer', { opacity: 0, y: 30, duration: 1, stagger: .1, ease: 'expo.out', delay: .3 });
  });

  /* clients bands — row A drifts right, row B drifts left; hover slows them */
  $$('.band__track').forEach(t => {
    const dir = +t.dataset.dir;
    const tw = G.fromTo(t, { xPercent: dir > 0 ? -50 : 0 }, { xPercent: dir > 0 ? 0 : -50, duration: 38, ease: 'none', repeat: -1 });
    t.addEventListener('mouseenter', () => G.to(tw, { timeScale: .15, duration: .6 }));
    t.addEventListener('mouseleave', () => G.to(tw, { timeScale: 1, duration: .6 }));
  });

  /* magnetic buttons */
  if (fine) $$('.btn, .wa-float__btn, .contact__wa').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); G.to(b, { x: (e.clientX - r.left - r.width / 2) * .18, y: (e.clientY - r.top - r.height / 2) * .3, duration: .5, ease: 'power3.out' }); });
    b.addEventListener('mouseleave', () => G.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.4)' }));
  });

  /* 3D tilt on cards */
  if (fine) $$('.review, .stat').forEach(c => {
    c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(); G.to(c, { rotateY: ((e.clientX - r.left) / r.width - .5) * 8, rotateX: -((e.clientY - r.top) / r.height - .5) * 8, transformPerspective: 900, duration: .6, ease: 'power3.out' }); });
    c.addEventListener('mouseleave', () => G.to(c, { rotateX: 0, rotateY: 0, duration: .9, ease: 'expo.out' }));
  });
})();
