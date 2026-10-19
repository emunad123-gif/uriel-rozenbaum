/* Rozenbaum — interactions */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const G = window.gsap;
  const PHONE = '972542059860';
  const WA_DEFAULT = 'שלום אוריאל, הגעתי דרך האתר ואשמח לקבל פרטים';
  const waLink = text => `https://wa.me/${PHONE}?text=${encodeURIComponent(text || WA_DEFAULT)}`;
  if (G) G.ticker.lagSmoothing(0);

  /* ---------- projects (from the studio's portfolio) ---------- */
  const PROJECTS = [
    { name: 'מרכז מלכתא | נשי חב״ד צפת', short: 'מרכז מלכתא', type: 'Community Center', kind: 'מרכז קהילתי', scope: 'תכנון ועיצוב פנים · פיקוח וניהול הפרויקט',
      desc: 'מרכז רב־תכליתי המשלב חללי אירוח, התכנסות, פעילות, משרדים וחדר כושר. שפה עיצובית אלגנטית, חומרים בהירים ופרטי תאורה עשירים.',
      ratio: 1.5, light: [50, 18], images: ['1000499986', '1000509378', '1000500028', '1000499978', '1000509382', '1000500033', '1000500029'],
      pins: [[30, 6, 'תאורה שקועה', 'Recessed light'], [24, 47, 'דלת זכוכית ופליז', 'Brass & glass'], [93, 34, 'חיפוי עץ', 'Oak slats'], [64, 64, 'סידור שולחן', 'Table setting']] },
    { name: 'בית חב״ד נאות פרס | חיפה', short: 'נאות פרס', type: 'Community Space', kind: 'חלל קהילתי', scope: 'תכנון ועיצוב פנים · פיקוח עליון',
      desc: 'תכנון חללי התכנסות ולימוד, מטבח ומשרד בסביבה חמימה, שימושית ומזמינה. שילוב קשתות, גוונים טבעיים וחיפויי עץ.',
      ratio: 1.5, light: [45, 15], images: ['1000429748', '1000429875', '1000429874', '1000431507'],
      pins: [[33, 40, 'קשתות', 'Arches'], [9, 42, 'קיר אבן', 'Stone wall'], [88, 36, 'חיפוי עץ', 'Wood cladding'], [56, 70, 'כיסאות לימוד', 'Study seating']] },
    { name: 'מועדונית נוער', short: 'מועדונית נוער', type: 'Leisure & Community', kind: 'פנאי וקהילה', scope: 'תכנון ועיצוב פנים בלבד',
      desc: 'מרחב נוער צבעוני וגמיש הכולל אזורי ישיבה, פעילות חברתית ומשחק, תוך שילוב חומרים חמים ופלטת צבעים צעירה.',
      ratio: 2.4, light: [62, 22], images: ['1000661922', '1000661732', '1000661792', '1000661845', '1000661868', '1000661870', '1000661873', '1000661920', '1000661925', '1000661927'],
      pins: [[88, 24, 'מנורה תלויה', 'Pendant'], [40, 28, 'קיר פסי עץ', 'Slat wall'], [52, 74, 'ספה מודולרית', 'Modular sofa'], [9, 32, 'צמחייה', 'Greenery']] },
    { name: 'מעבדת אלקטרוניקה', short: 'מעבדה', type: 'Workspace', kind: 'סביבת עבודה', scope: 'תכנון ועיצוב פנים בלבד',
      desc: 'סביבת עבודה טכנולוגית מוקפדת עם עמדות עבודה מרובות, אזור משרדי נפרד ושילוב של גוונים כהים, כחול עמוק ותאורה פונקציונלית.',
      ratio: 1.873, light: [50, 12], images: ['1000640605', '1000640601', '1000640604', '1000640656'],
      pins: [[30, 30, 'מסך הדרכה', 'Training screen'], [59, 22, 'חיפוי כחול עמוק', 'Deep blue'], [80, 60, 'עמדת עבודה', 'Workstation']] },
    { name: 'דירת יוקרה', short: 'דירת יוקרה', type: 'Residential', kind: 'מגורים', scope: 'תכנון ועיצוב פנים · פיקוח עליון',
      desc: 'חללי מגורים בהירים עם דגש על פרופורציות, נגרות מותאמת, תאורה רכה וחומרים טבעיים.',
      ratio: 1.86, light: [55, 30], images: ['1000796498', '1000796844', '1000796532', '1000796533', '1000796595', '1000796670', '1000796843'],
      pins: [[30, 30, 'גוף תאורה גלי', 'Wave light'], [31, 64, 'כיסאות בר', 'Bar stools'], [21, 42, 'תנורים מובנים', 'Built-in ovens'], [83, 60, 'צמח בעציץ', 'Planter']] },
  ];
  const img = id => `assets/img/p/${id}.webp`;

  /* ---------- wordmark ---------- */
  const WM = window.WORDMARK;
  $$('[data-wordmark]').forEach(svg => {
    if (!WM) return;
    svg.setAttribute('viewBox', WM.vb); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Rozenbaum');
    svg.innerHTML = `<g stroke-width="${WM.sw}">${WM.paths.map(d => `<path d="${d}"/>`).join('')}</g><path class="cord" d="${WM.cord}" stroke-width="${WM.sw * .45}"/><circle class="dot" cx="${WM.dot[0]}" cy="${WM.dot[1]}" r="${WM.sw * 1.9}"/>`;
  });

  /* ---------- WhatsApp links ---------- */
  $$('[data-wa]').forEach(a => { a.href = waLink(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
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

  /* ---------- screens: header theme, active nav, side dots ---------- */
  const screens = $$('main > section[data-title]');
  const header = $('.header'), dots = $('.dots');
  screens.forEach(s => {
    const a = document.createElement('a'); a.href = '#' + s.id; a.setAttribute('aria-label', s.dataset.title);
    a.innerHTML = `<span>${s.dataset.title}</span>`; dots.appendChild(a);
  });
  const setActive = s => {
    $$('.nav a, .dots a').forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + s.id));
    header.classList.toggle('is-dark', s.dataset.theme === 'dark' && s.id !== 'home');
    header.classList.toggle('is-light', s.dataset.theme === 'light');
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { setActive(e.target); e.target.dispatchEvent(new CustomEvent('screen:enter')); }
  }), { rootMargin: '-45% 0px -50% 0px' });
  screens.forEach(s => io.observe(s));
  const vio = new IntersectionObserver(es => es.forEach(e => {
    $$('video', e.target).forEach(v => e.isIntersecting ? v.play().catch(() => {}) : v.pause());
  }), { threshold: .2 });
  screens.forEach(s => $('video', s) && vio.observe(s));

  /* ---------- cursor: just an orange dot ---------- */
  if (fine && !reduced) {
    const c = $('.cursor');
    let mx = -100, my = -100, dx = mx, dy = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() { dx += (mx - dx) * .3; dy += (my - dy) * .3; c.style.transform = `translate(${dx}px, ${dy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', e => c.classList.toggle('is-link', !!e.target.closest('a, button, input, .pin__dot')));
  } else { const c = $('.cursor'); c && c.remove(); }

  /* ==========================================================
     HERO — the lights come on
     ========================================================== */
  const hero = $('.hero'), scene = $('.scene'), lit = $('.scene__lit'), flare = $('.scene__flare');
  const sw = $('.switch'), swLbl = $('.switch__lbl');
  let heroOn = false;
  const setLight = (on, x = 48, y = 25) => {
    heroOn = on;
    hero.classList.toggle('is-lit', on);
    sw.classList.toggle('is-on', on); sw.setAttribute('aria-pressed', on);
    swLbl.textContent = on ? 'Lights on' : 'Lights off';
    $$('.hot').forEach(h => { h.classList.toggle('is-on', on); $('span', h).textContent = on ? 'OFF' : 'ON'; });
    if (G && !reduced) {
      G.to(lit, { clipPath: `circle(${on ? 150 : 0}% at ${x}% ${y}%)`, duration: on ? 1.8 : 1, ease: on ? 'expo.inOut' : 'power3.inOut' });
      if (on) { scene.style.setProperty('--lx', x + '%'); scene.style.setProperty('--ly', y + '%'); G.fromTo(flare, { opacity: .9, scale: .2 }, { opacity: 0, scale: 2.4, duration: 1.6, ease: 'expo.out' }); }
    } else lit.style.clipPath = on ? 'none' : `circle(0% at ${x}% ${y}%)`;
  };
  $$('.hot').forEach(h => h.addEventListener('click', () => { const [x, y] = h.dataset.light.split(',').map(Number); setLight(!heroOn, x, y); }));
  sw.addEventListener('click', () => setLight(!heroOn));

  /* ---------- object-fit:cover mapping (image % → box px) ---------- */
  const coverMap = (box, ratio, x, y) => {
    const W = box.clientWidth, H = box.clientHeight;
    let w = W, h = W / ratio; if (h < H) { h = H; w = H * ratio; }
    return [(W - w) / 2 + w * x / 100, (H - h) / 2 + h * y / 100];
  };

  /* ---------- product detail: only the object, cropped out of the render ---------- */
  const detail = $('.detail'), dImg = $('.detail__img');
  const openDetail = (src, ratio, x, y, he, en, anchor) => {
    const S = 244, zoomW = S / .2, zoomH = zoomW / ratio;
    dImg.style.backgroundImage = `url(${src})`;
    dImg.style.backgroundSize = `${zoomW}px ${zoomH}px`;
    dImg.style.backgroundPosition = `${-(x / 100 * zoomW - S / 2)}px ${-(y / 100 * zoomH - S / 2)}px`;
    $('b', detail).textContent = he; $('.lbl', detail).textContent = en;
    detail.hidden = false;
    const r = anchor.getBoundingClientRect();
    const left = Math.min(Math.max(12, r.left + r.width / 2 - 140), innerWidth - 292);
    const top = r.top > 380 ? r.top - 360 : Math.min(r.bottom + 12, innerHeight - 380);
    detail.style.left = left + 'px'; detail.style.top = Math.max(12, top) + 'px';
    if (G && !reduced) G.fromTo(detail, { opacity: 0, scale: .85, y: 14 }, { opacity: 1, scale: 1, y: 0, duration: .55, ease: 'back.out(1.6)' });
  };
  const closeDetail = () => { detail.hidden = true; };
  $('.detail__close').addEventListener('click', closeDetail);
  document.addEventListener('click', e => { if (!detail.hidden && !e.target.closest('.detail, .pin')) closeDetail(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeDetail(); });

  /* spec pins: glowing dot + drawn leader line + label */
  const buildPins = (layer, box, ratio, list, src) => {
    layer.innerHTML = '';
    const W = box.clientWidth, H = box.clientHeight;
    list.forEach(([x, y, he, en]) => {
      const [px, py] = coverMap(box, ratio, x, y);
      if (px < 20 || py < 20 || px > W - 20 || py > H - 20) return;
      const left = px > W * .62, up = py > H * .35;
      const dx = (left ? -1 : 1) * Math.min(80, W * .08), dy = (up ? -1 : 1) * Math.min(42, H * .08);
      const el = document.createElement('div'); el.className = 'pin';
      el.style.left = px + 'px'; el.style.top = py + 'px';
      el.style.setProperty('--dx', dx + 'px'); el.style.setProperty('--dy', dy + 'px');
      el.style.setProperty('--len', Math.hypot(dx, dy) + 'px'); el.style.setProperty('--ang', Math.atan2(dy, dx) + 'rad');
      el.style.setProperty('--tx', left ? '-100%' : '0');
      el.innerHTML = `<div class="pin__dot" role="button" aria-label="${he}"></div><div class="pin__line"></div><div class="pin__card"><b>${he}</b><span>${en}</span></div>`;
      const open = e => { e.stopPropagation(); openDetail(src, ratio, x, y, he, en, $('.pin__dot', el)); };
      $('.pin__dot', el).addEventListener('click', open); $('.pin__card', el).addEventListener('click', open);
      layer.appendChild(el);
    });
    return $$('.pin', layer);
  };
  const animatePins = (els, delay = 0) => {
    if (!G || reduced) return;
    els.forEach((p, k) => {
      const d = delay + k * .22;
      G.fromTo($('.pin__dot', p), { scale: 0 }, { scale: 1, duration: .5, delay: d, ease: 'back.out(3)' });
      G.fromTo($('.pin__line', p), { scaleX: 0 }, { scaleX: 1, duration: .5, delay: d + .15, ease: 'power2.out' });
      G.fromTo($('.pin__card', p), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .5, delay: d + .45, ease: 'power3.out' });
    });
  };

  /* ==========================================================
     PROJECTS — light-up slider, clear navigation, gallery
     ========================================================== */
  const stage = $('.stage'), tabs = $('.pnav__tabs'), info = $('.works__info');
  stage.innerHTML = PROJECTS.map((p, i) => `
    <div class="slide">
      <img class="slide__dark" src="${img(p.images[0])}" alt="" loading="${i ? 'lazy' : 'eager'}">
      <img class="slide__lit" src="${img(p.images[0])}" alt="${p.name}" loading="${i ? 'lazy' : 'eager'}">
      <div class="pins"></div>
      <div class="slide__tag"><span class="lbl">${p.type}</span></div>
      <span class="slide__num">0${i + 1}</span>
    </div>`).join('') + `<div class="stage__bulb"><i></i><span class="bulb__txt">האור כבוי</span></div>`;
  tabs.innerHTML = PROJECTS.map((p, i) => `<button aria-label="${p.name}"><img src="${img(p.images[0])}" alt="" loading="lazy"><b>0${i + 1}</b><span>${p.short}</span><i></i></button>`).join('');
  const slides = $$('.slide', stage), tbtns = $$('button', tabs);
  let cur = -1, timer = null, worksVisible = false;
  const fill = p => {
    $('[data-p="type"]', info).innerHTML = `${p.kind} <span class="lbl">· ${p.type}</span>`;
    $('[data-p="name"]', info).textContent = p.name;
    $('[data-p="desc"]', info).textContent = p.desc;
    $('[data-p="scope"]', info).textContent = p.scope;
    $('[data-p="count"]', info).textContent = p.images.length + ' הדמיות';
  };
  const go = i => {
    i = (i + PROJECTS.length) % PROJECTS.length;
    if (i === cur) return;
    const prev = slides[cur]; cur = i; closeDetail();
    const s = slides[i], p = PROJECTS[i];
    slides.forEach(x => x.classList.toggle('is-active', x === s));
    tbtns.forEach((b, k) => b.classList.toggle('is-active', k === i));
    stage.classList.remove('is-lit'); $('.bulb__txt').textContent = 'האור כבוי';
    const litImg = $('.slide__lit', s), darkImg = $('.slide__dark', s);
    const pinEls = buildPins($('.pins', s), stage, p.ratio, p.pins, img(p.images[0]));
    if (G && !reduced) {
      G.killTweensOf([litImg, darkImg, info]);
      G.set($$('.pin__dot, .pin__line, .pin__card', s), { opacity: 0 });
      G.set(litImg, { clipPath: `circle(0% at ${p.light[0]}% ${p.light[1]}%)` });
      G.fromTo([darkImg, litImg], { scale: 1.1 }, { scale: 1, duration: 2.4, ease: 'expo.out' });
      G.to(litImg, { clipPath: `circle(150% at ${p.light[0]}% ${p.light[1]}%)`, duration: 1.7, delay: .5, ease: 'expo.inOut',
        onStart: () => { stage.classList.add('is-lit'); $('.bulb__txt').textContent = 'האור דלוק'; } });
      G.set($$('.pin__dot, .pin__line, .pin__card', s), { opacity: 1, delay: 1.5 });
      animatePins(pinEls, 1.55);
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
    requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = 'transform 9s linear'; bar.style.transform = 'scaleX(1)'; }));
    timer = setTimeout(() => go(cur + 1), 9000);
  };
  tbtns.forEach((b, i) => b.addEventListener('click', () => go(i)));
  $('.works__next').addEventListener('click', () => go(cur + 1));
  $('.works__prev').addEventListener('click', () => go(cur - 1));
  stage.addEventListener('mouseenter', () => clearTimeout(timer));
  stage.addEventListener('mouseleave', restartAuto);
  go(0);
  new IntersectionObserver(es => es.forEach(e => { worksVisible = e.isIntersecting; restartAuto(); }), { threshold: .5 }).observe($('#projects'));
  addEventListener('resize', () => { const p = PROJECTS[cur]; buildPins($('.pins', slides[cur]), stage, p.ratio, p.pins, img(p.images[0])); });

  /* lightbox */
  const lb = $('.lightbox'), lbImg = $('.lightbox__main img'), lbStrip = $('.lightbox__strip');
  let lbI = 0;
  const lbShow = i => {
    const p = PROJECTS[cur]; lbI = (i + p.images.length) % p.images.length;
    lbImg.src = img(p.images[lbI]); lbImg.alt = `${p.name} — הדמיה ${lbI + 1}`;
    $$('button', lbStrip).forEach((b, k) => b.classList.toggle('is-active', k === lbI));
    if (G && !reduced) G.fromTo(lbImg, { opacity: 0, scale: .98 }, { opacity: 1, scale: 1, duration: .6, ease: 'expo.out' });
  };
  const lbOpen = () => {
    const p = PROJECTS[cur]; closeDetail();
    $('.lightbox__title').textContent = p.name; $('.lightbox__type').textContent = p.type;
    lbStrip.innerHTML = p.images.map(id => `<button><img src="${img(id)}" alt="" loading="lazy"></button>`).join('');
    $$('button', lbStrip).forEach((b, k) => b.addEventListener('click', () => lbShow(k)));
    lb.hidden = false; document.body.style.overflow = 'hidden'; clearTimeout(timer); lbShow(0);
    $('.lightbox__close').focus();
  };
  const lbClose = () => { lb.hidden = true; document.body.style.overflow = ''; restartAuto(); };
  stage.addEventListener('click', e => { if (!e.target.closest('.pin')) lbOpen(); });
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

  /* ---------- sketch ↔ reality, built in stages ---------- */
  const cmp = $('.compare'), range = $('input', cmp);
  const stepBtns = $$('.build__steps button');
  const setPos = v => cmp.style.setProperty('--pos', v + '%');
  range.addEventListener('input', () => { setPos(range.value); cmp.dataset.step = 3; stepBtns.forEach(b => b.setAttribute('aria-pressed', b.dataset.step === '3')); });
  const cmpSrc = 'assets/img/p/1000796844.webp';
  const cmpPinsData = [[16, 74, 'ספה פינתית', 'Linen sofa'], [30, 36, 'וילון פשתן', 'Linen drapes'], [84, 76, 'כורסת בוקלה', 'Boucle chair'], [57, 62, 'צמח בעציץ', 'Planter']];
  const cmpPinsLayer = $('.compare__pins');
  const setStep = n => {
    cmp.dataset.step = n;
    stepBtns.forEach(b => b.setAttribute('aria-pressed', +b.dataset.step === n));
    const target = n === 0 ? 0 : 100;
    if (G && !reduced) { const o = { v: parseFloat(range.value) }; G.to(o, { v: target, duration: 1.4, ease: 'expo.inOut', onUpdate: () => { setPos(o.v); range.value = o.v; } }); }
    else { setPos(target); range.value = target; }
    const els = n >= 2 ? buildPins(cmpPinsLayer, cmp, 1536 / 826, cmpPinsData, cmpSrc) : (cmpPinsLayer.innerHTML = '', []);
    if (n === 2) animatePins(els, .6);
  };
  stepBtns.forEach(b => b.addEventListener('click', () => setStep(+b.dataset.step)));

  /* ---------- testimonials deck ---------- */
  const cards = $$('.card'), ddots = $('.deck__dots');
  ddots.innerHTML = cards.map(() => '<b></b>').join('');
  let front = 0, deckTimer = null;
  const layoutDeck = (animate = true) => {
    cards.forEach((c, k) => {
      const pos = (k - front + cards.length) % cards.length;
      const t = { y: pos * -16, x: pos * 18, rotate: pos * -3, scale: 1 - pos * .05, opacity: pos > 2 ? 0 : 1 - pos * .25, zIndex: 10 - pos };
      if (G && animate && !reduced) G.to(c, { ...t, duration: .9, ease: 'expo.out' });
      else if (G) G.set(c, t);
      else Object.assign(c.style, { zIndex: t.zIndex, transform: `translate(${t.x}px, ${t.y}px) rotate(${t.rotate}deg) scale(${t.scale})`, opacity: t.opacity });
    });
    $$('b', ddots).forEach((d, k) => d.classList.toggle('is-on', k === front));
  };
  const nextCard = () => {
    const c = cards[front];
    if (G && !reduced) G.to(c, { x: -420, rotate: -14, opacity: 0, duration: .5, ease: 'power2.in', onComplete: () => { front = (front + 1) % cards.length; layoutDeck(); } });
    else { front = (front + 1) % cards.length; layoutDeck(false); }
  };
  layoutDeck(false);
  $('.deck__btn').addEventListener('click', () => { nextCard(); clearInterval(deckTimer); deckTimer = setInterval(nextCard, 6500); });

  /* ---------- clients: duplicate rows for a seamless loop ---------- */
  $$('.names__track').forEach(t => { t.innerHTML += t.innerHTML; });

  /* ---------- contact brief → WhatsApp ---------- */
  const form = $('.note');
  $$('.chip', form).forEach(ch => ch.addEventListener('click', () => $$('.chip', form).forEach(x => x.setAttribute('aria-pressed', x === ch))));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#c-name').value.trim();
    const kind = $('.chip[aria-pressed="true"]', form).textContent.trim();
    window.open(waLink(`שלום אוריאל, ${name ? 'אני ' + name + ', ' : ''}הגעתי דרך האתר ואשמח לקבל פרטים על פרויקט: ${kind}`), '_blank', 'noopener');
  });

  /* ==========================================================
     ANIMATIONS
     ========================================================== */
  const finishLoad = () => { document.body.classList.remove('is-loading'); const l = $('.loader'); l && l.remove(); };
  const countUp = (n, delay = 0) => {
    const target = +n.dataset.count;
    if (!G || reduced) { n.textContent = target.toLocaleString('en-US'); return; }
    const o = { v: 0 };
    G.to(o, { v: target, duration: 2.4, delay, ease: 'power4.out', onUpdate: () => n.textContent = Math.round(o.v).toLocaleString('en-US') });
  };
  if (!G || reduced) {
    finishLoad(); setPos(50); setLight(true);
    $$('.odo').forEach(n => countUp(n));
    $$('.step').forEach(s => s.classList.add('is-on'));
    $('.film__frame').style.clipPath = 'none';
    return;
  }

  /* preloader: strokes draw, the lamp drops, then it lights up */
  const lcord = $('.loader .wordmark .cord'), lpaths = $$('.loader .wordmark g path'), ldot = $('.loader .wordmark .dot'), glow = $('.loader__glow');
  lpaths.forEach(p => { const L = p.getTotalLength(); G.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
  G.set(lcord, { scaleY: 0, transformOrigin: '50% 0%' });
  G.set(ldot, { scale: 0, transformOrigin: '50% 50%', fill: '#3a302a' });
  const count = { v: 0 }, cEl = $('.loader__count');
  G.timeline()
    .to(lpaths, { strokeDashoffset: 0, duration: 1.3, stagger: .05, ease: 'power2.inOut' }, .1)
    .to(count, { v: 100, duration: 2.1, ease: 'power2.inOut', onUpdate: () => cEl.textContent = String(Math.round(count.v)).padStart(3, '0') }, 0)
    .to(lcord, { scaleY: 1, duration: .45, ease: 'power2.out' }, 1.25)
    .fromTo(ldot, { scale: 0, y: -40 }, { scale: 1, y: 0, duration: .7, ease: 'bounce.out' }, 1.35)
    .to(ldot, { fill: '#FFB070', duration: .25 }, 1.95)
    .add(() => { const r = ldot.getBoundingClientRect(); G.set(glow, { left: r.left + r.width / 2, top: r.top + r.height / 2 }); ldot.style.filter = 'drop-shadow(0 0 12px rgba(255,170,90,.95))'; }, 1.95)
    .fromTo(glow, { opacity: 0, scale: .2 }, { opacity: 1, scale: 1, duration: .8, ease: 'expo.out' }, 1.95)
    .to('.loader', { clipPath: 'circle(0% at 50% 50%)', duration: 1.1, ease: 'expo.inOut' }, 2.55)
    .add(() => { finishLoad(); setTimeout(() => setLight(true, 48, 25), 50); }, 3.2)
    .add(heroIntro(), 2.9);

  function heroIntro() {
    const t = G.timeline();
    t.from('.hero h1 .w > span', { yPercent: 115, duration: 1.1, stagger: .06, ease: 'expo.out' }, .5)
     .from('.hero__eyebrow, .hero__lead, .hero__ctas > *, .switch', { opacity: 0, y: 20, duration: 1, stagger: .08, ease: 'power3.out' }, .7)
     .from('.header > *', { opacity: 0, y: -14, duration: .9, stagger: .08, ease: 'power3.out' }, .5)
     .from('.hot', { opacity: 0, duration: .8, stagger: .15 }, 1.6)
     .add(() => setTimeout(() => {
       $$('.hero__brand g path').forEach(p => { const L = p.getTotalLength(); G.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }); });
       G.from('.hero__brand .cord', { scaleY: 0, transformOrigin: '50% 0%', duration: .5, delay: 1.2 });
       G.from('.hero__brand .dot', { scale: 0, y: -30, transformOrigin: '50% 50%', duration: .8, delay: 1.4, ease: 'bounce.out' });
     }, 0), .6);
    return t;
  }

  /* per-screen reveals */
  const once = new Set();
  const onEnter = (sel, fn, repeat = false) => {
    const s = $(sel), key = sel + fn.length + (repeat ? 'r' : '');
    s && s.addEventListener('screen:enter', () => { if (!repeat && once.has(key)) return; once.add(key); fn(s); });
  };
  const baseIn = s => {
    G.from($$('.split .w > span', s), { yPercent: 115, duration: 1.1, stagger: .05, ease: 'expo.out' });
    G.from($$('.eyebrow, .screen__head > p, .screen__head > .cta', s), { opacity: 0, y: 20, duration: 1, stagger: .08, ease: 'power3.out' });
  };
  onEnter('#film', () => {
    G.fromTo('.film__frame', { clipPath: 'inset(22% 26% 22% 26% round 999px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 2, ease: 'expo.inOut' });
    G.from('.film__words span', { yPercent: 120, opacity: 0, duration: 1.2, stagger: .15, delay: .6, ease: 'expo.out' });
    G.from('.film__caption > *', { opacity: 0, y: 30, duration: 1, stagger: .12, delay: 1.2, ease: 'expo.out' });
  });
  onEnter('#projects', s => {
    baseIn(s);
    G.from('.stage', { clipPath: 'inset(12% 12% 12% 12% round 30px)', duration: 1.4, ease: 'expo.out' });
    G.from('.pnav > *', { y: 30, opacity: 0, duration: .8, stagger: .08, ease: 'expo.out', delay: .3 });
    G.from('.works__actions > *', { opacity: 0, y: 20, duration: 1, stagger: .1, ease: 'expo.out', delay: .4 });
  });
  onEnter('#about', s => {
    baseIn(s);
    G.from('.about__text p, .about__ctas', { opacity: 0, y: 24, duration: 1, stagger: .1, ease: 'power3.out', delay: .2 });
    G.from('.stat', { opacity: 0, y: 60, rotateX: -25, transformPerspective: 800, duration: 1.2, stagger: .12, ease: 'expo.out' });
  });
  onEnter('#about', s => {
    $$('.about__plan *', s).forEach((p, i) => { const L = (p.getTotalLength && p.getTotalLength()) || 400; G.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 2.2, delay: i * .08, ease: 'power2.inOut' }); });
    $$('.odo', s).forEach((n, i) => countUp(n, .3 + i * .15));
    $$('.stat__ring circle', s).forEach((c, i) => G.fromTo(c, { strokeDashoffset: 277 }, { strokeDashoffset: 277 * .12, duration: 2.4, delay: .3 + i * .15, ease: 'power4.out' }));
  }, true);
  onEnter('#services', s => {
    baseIn(s);
    G.from('.svc', { opacity: 0, y: 60, duration: 1.1, stagger: .12, ease: 'expo.out' });
  });
  onEnter('#services', s => {
    $$('.svc__icon *', s).forEach(p => { const L = (p.getTotalLength ? p.getTotalLength() : 300) || 300; G.fromTo(p, { strokeDasharray: L, strokeDashoffset: L }, { strokeDashoffset: 0, duration: 1.6, delay: .3, ease: 'power2.inOut' }); });
  }, true);
  setPos(94); range.value = 94;
  onEnter('#sketch', s => {
    baseIn(s);
    G.from(cmp, { clipPath: 'inset(10% 10% 10% 10% round 30px)', duration: 1.4, ease: 'expo.out' });
    const o = { v: 94 };
    G.to(o, { v: 50, duration: 2.2, delay: .4, ease: 'expo.inOut', onUpdate: () => { setPos(o.v); range.value = o.v; } });
    G.from('.compare__overlay > *', { opacity: 0, duration: .6, stagger: .06, delay: .3 });
  });
  onEnter('#reviews', s => {
    baseIn(s);
    const r = { v: 0 }, rn = $('.rating__num');
    G.to(r, { v: 5, duration: 1.6, ease: 'power2.out', onUpdate: () => rn.textContent = r.v.toFixed(1) });
    G.from('.deck', { y: 100, opacity: 0, duration: 1.2, ease: 'expo.out' });
    $$('.stars i', s).forEach((st, i) => G.fromTo(st, { '--f': 0 }, { '--f': 1, duration: .45, delay: .4 + (i % 5) * .12, ease: 'power2.out' }));
    clearInterval(deckTimer); deckTimer = setInterval(nextCard, 6500);
  });
  onEnter('#clients', s => {
    baseIn(s);
    G.from('.names__row', { opacity: 0, y: 40, duration: 1.2, stagger: .15, ease: 'expo.out' });
    G.from('.clients__foot > *', { opacity: 0, y: 20, duration: .9, delay: .5, stagger: .1 });
  });
  onEnter('#process', s => {
    baseIn(s);
    const vertical = innerWidth <= 860;
    G.fromTo('.process__line i', { [vertical ? 'scaleY' : 'scaleX']: 0 }, { [vertical ? 'scaleY' : 'scaleX']: 1, duration: 2.4, ease: 'power2.inOut', delay: .3 });
    $$('.step').forEach((st, i) => {
      G.from(st, { opacity: 0, y: 30, duration: .9, delay: .3 + i * .5, ease: 'expo.out' });
      setTimeout(() => st.classList.add('is-on'), 600 + i * 550);
    });
    G.from('.process__cta > *', { opacity: 0, y: 20, duration: .9, delay: 2.2 });
  });
  onEnter('#contact', s => {
    G.from('.contact__big', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out' });
    G.from($$('.split .w > span', s), { yPercent: 115, duration: 1.1, stagger: .05, ease: 'expo.out', delay: .2 });
    G.from('.contact__lead, .note, .contact__alt', { opacity: 0, y: 40, duration: 1.1, stagger: .12, ease: 'expo.out', delay: .3 });
  });

  /* clients rows drift (A → right, B → left); hover slows them */
  $$('.names__track').forEach(t => {
    const dir = +t.dataset.dir;
    const tw = G.fromTo(t, { xPercent: dir > 0 ? -50 : 0 }, { xPercent: dir > 0 ? 0 : -50, duration: 46, ease: 'none', repeat: -1 });
    t.addEventListener('mouseenter', () => G.to(tw, { timeScale: .2, duration: .6 }));
    t.addEventListener('mouseleave', () => G.to(tw, { timeScale: 1, duration: .6 }));
  });

  /* magnetic CTAs */
  if (fine) $$('.cta:not(.cta--ghost), .wa-float').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); G.to(b, { x: (e.clientX - r.left - r.width / 2) * .15, y: (e.clientY - r.top - r.height / 2) * .3, duration: .5, ease: 'power3.out' }); });
    b.addEventListener('mouseleave', () => G.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.4)' }));
  });
  /* 3D tilt on stat tiles */
  if (fine) $$('.stat').forEach(c => {
    c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(); G.to(c, { rotateY: ((e.clientX - r.left) / r.width - .5) * 10, rotateX: -((e.clientY - r.top) / r.height - .5) * 10, transformPerspective: 900, duration: .6, ease: 'power3.out' }); });
    c.addEventListener('mouseleave', () => G.to(c, { rotateX: 0, rotateY: 0, duration: .9, ease: 'expo.out' }));
  });
})();
