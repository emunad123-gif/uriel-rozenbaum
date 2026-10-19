/* Uriel Rozenbaum — interactions */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';

  /* ---------- wordmark injection ---------- */
  const WM = window.WORDMARK;
  $$('[data-wordmark]').forEach(svg => {
    if (!WM) return;
    svg.setAttribute('viewBox', `0 0 ${WM.w} ${WM.h}`);
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Uriel Rozenbaum');
    svg.innerHTML = `<path d="${WM.d}"/>`;
  });

  /* ---------- split words ---------- */
  $$('.split').forEach(el => {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('script')) {
          walk(n);
        } else if (n.nodeType === 1) {
          const w = document.createElement('span'); w.className = 'w';
          n.replaceWith(w); const i = document.createElement('span'); i.appendChild(n); w.appendChild(i);
        }
      });
    };
    walk(el);
  });

  /* manifesto words for scrub */
  $$('[data-words]').forEach(el => {
    [...el.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
          const s = document.createElement('span'); s.className = 'mw'; s.textContent = part; frag.appendChild(s);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) n.classList.add('mw');
    });
  });

  /* ---------- menu ---------- */
  const burger = $('.burger'), menu = $('.menu');
  const toggleMenu = open => {
    menu.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
  };
  burger.addEventListener('click', () => toggleMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- compare slider ---------- */
  const cmp = $('.compare');
  const range = $('input', cmp);
  const setPos = v => cmp.style.setProperty('--pos', v + '%');
  range.addEventListener('input', () => setPos(range.value));

  /* ---------- cursor ---------- */
  if (fine && !reduced) {
    document.body.classList.add('has-cursor');
    const c = $('.cursor'), h = $('.cursor__h'), v = $('.cursor__v'), dot = $('.cursor__dot'), xy = $('.cursor__xy'), label = $('span', dot);
    let mx = innerWidth / 2, my = innerHeight / 2, dx = mx, dy = my;
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const pad = n => String(Math.round(n)).padStart(4, '0');
    const loop = () => {
      dx += (mx - dx) * .2; dy += (my - dy) * .2;
      h.style.transform = `translateY(${my}px)`; v.style.transform = `translateX(${mx}px)`;
      dot.style.transform = `translate(${dx}px, ${dy}px)`;
      xy.style.transform = `translate(${mx + 14}px, ${my + 12}px)`;
      xy.textContent = `X ${pad(mx)} · Y ${pad(my + scrollY)}`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor], a, button');
      const txt = t && t.dataset.cursor;
      c.classList.toggle('is-hover', !!txt);
      if (txt) label.textContent = txt;
    });
  }

  /* ---------- header behaviour ---------- */
  const header = $('.header'), wa = $('.wa-float');
  let lastY = 0;
  const onScroll = y => {
    header.classList.toggle('is-scrolled', y > innerHeight * .85);
    header.classList.toggle('is-hidden', y > lastY && y > innerHeight && !menu.classList.contains('is-open'));
    wa.classList.toggle('is-visible', y > innerHeight * .6);
    lastY = y;
  };

  /* ---------- no GSAP fallback ---------- */
  const finishLoad = () => { document.body.classList.remove('is-loading'); const l = $('.loader'); l && l.remove(); };
  if (!hasGSAP || reduced) {
    finishLoad();
    addEventListener('scroll', () => onScroll(scrollY), { passive: true });
    $$('.mw').forEach(w => w.style.opacity = 1);
    $$('video').forEach(v => v.play && v.play().catch(() => {}));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', e => { ScrollTrigger.update(); onScroll(e.scroll); });
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  } else {
    addEventListener('scroll', () => onScroll(scrollY), { passive: true });
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); const t = id === '#top' ? 0 : $(id);
    if (t === null) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(t, { duration: 1.6 }) : (t === 0 ? scrollTo({ top: 0, behavior: 'smooth' }) : t.scrollIntoView({ behavior: 'smooth' }));
  }));

  /* ---------- preloader ---------- */
  const loader = $('.loader');
  const wmPath = $('.loader .wordmark path');
  const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
  const count = { v: 0 }, countEl = $('.loader__count');
  if (wmPath) {
    const len = 9000;
    gsap.set(wmPath, { strokeDasharray: len, strokeDashoffset: len });
    tl.to(wmPath, { strokeDashoffset: 0, duration: 2.1, ease: 'power2.inOut' }, 0.15)
      .to(wmPath, { fill: '#15120F', strokeWidth: 0, duration: .6 }, '-=.5');
  }
  $$('.loader__lines line').forEach((l, i) => {
    const horiz = l.getAttribute('y1') === l.getAttribute('y2');
    gsap.set(l, { scaleX: horiz ? 0 : 1, scaleY: horiz ? 1 : 0, transformOrigin: horiz ? '0% 50%' : '50% 0%' });
    tl.to(l, { scaleX: 1, scaleY: 1, duration: 1.1 }, .05 + i * .12);
  });
  tl.to(count, { v: 100, duration: 2.6, ease: 'power2.inOut', onUpdate: () => countEl.textContent = String(Math.round(count.v)).padStart(3, '0') }, 0)
    .to('.loader__inner', { scale: .94, opacity: 0, duration: .7, ease: 'power2.in' }, '+=.15')
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=.2')
    .add(() => { finishLoad(); lenis && lenis.start(); ScrollTrigger.refresh(); }, '-=.35')
    .add(heroIntro(), '-=.75');

  /* ---------- hero intro ---------- */
  function heroIntro() {
    const t = gsap.timeline();
    const script = $('.hero__script');
    // split script into chars for a handwriting-like cascade
    const txt = script.textContent; script.textContent = '';
    [...txt].forEach(ch => { const s = document.createElement('span'); s.className = 'char'; s.textContent = ch === ' ' ? ' ' : ch; script.appendChild(s); });
    t.from('.hero__media video', { scale: 1.35, duration: 2.4, ease: 'expo.out' }, 0)
     .from('.hero__script .char', { yPercent: 60, opacity: 0, filter: 'blur(12px)', duration: 1.4, stagger: .045, ease: 'expo.out' }, .1)
     .from('.hero__he .w > span', { yPercent: 110, duration: 1.1, stagger: .06, ease: 'expo.out' }, .6)
     .from('.hero__frame .hl', { scaleX: 0, transformOrigin: '50% 50%', duration: 1.6, ease: 'expo.inOut' }, .2)
     .from('.hero__frame .vl', { scaleY: 0, transformOrigin: '50% 50%', duration: 1.6, ease: 'expo.inOut' }, .3)
     .from('.hero__dim, .hero__bottom > *, .header', { opacity: 0, y: 16, duration: 1, stagger: .08, ease: 'power3.out' }, .9)
     .from('.hero__floating', { opacity: 0, scale: .8, duration: 1.2, stagger: .2, ease: 'expo.out' }, 1.1);
    return t;
  }

  /* hero scroll parallax */
  gsap.to('.hero__media video', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__content', { yPercent: -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__floating--1', { y: -160, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__floating--2', { y: -60, x: 60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ---------- split headline reveals ---------- */
  $$('.split').forEach(el => {
    if (el.closest('.hero')) return;
    gsap.from($$('.w > span', el), { yPercent: 115, rotate: 3, duration: 1.2, stagger: .06, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%' } });
  });
  $$('.eyebrow').forEach(el => gsap.from(el, { opacity: 0, x: 30, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

  /* ---------- manifesto word scrub ---------- */
  const mws = $$('.manifesto__text .mw');
  gsap.to(mws, { opacity: 1, stagger: .1, ease: 'none',
    scrollTrigger: { trigger: '.manifesto__text', start: 'top 78%', end: 'bottom 45%', scrub: .6 } });
  $$('.inline-img').forEach(el => gsap.from(el, { width: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 80%' } }));
  gsap.from('.manifesto__sig', { clipPath: 'inset(0 100% 0 0)', duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: '.manifesto__sig', start: 'top 90%' } });

  /* ---------- compare: auto sweep on enter ---------- */
  const sweep = { v: 92 };
  ScrollTrigger.create({
    trigger: cmp, start: 'top 70%', once: true,
    onEnter: () => {
      gsap.fromTo(sweep, { v: 92 }, { v: 50, duration: 2.2, ease: 'expo.inOut', onUpdate: () => { setPos(sweep.v); range.value = sweep.v; } });
    }
  });
  setPos(92); range.value = 92;
  gsap.from('.compare__overlay > *', { opacity: 0, duration: .8, stagger: .08, scrollTrigger: { trigger: cmp, start: 'top 70%' } });
  gsap.from(cmp, { clipPath: 'inset(12% 12% 12% 12% round 24px)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: cmp, start: 'top 85%' } });

  /* ---------- projects horizontal ---------- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 861px)', () => {
    const track = $('.projects__track');
    const dist = () => track.scrollWidth - innerWidth;
    const st = gsap.to(track, {
      x: () => dist(), ease: 'none',
      scrollTrigger: { trigger: '.projects', pin: '.projects__pin', start: 'top top', end: () => '+=' + dist(), scrub: 1, invalidateOnRefresh: true }
    });
    gsap.to('.projects__bar i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.projects', start: 'top top', end: () => '+=' + dist(), scrub: true } });
    $$('.pcard__media img').forEach(img => gsap.fromTo(img, { xPercent: 8 }, { xPercent: -8, ease: 'none',
      scrollTrigger: { trigger: img.closest('.pcard'), containerAnimation: st, start: 'right right', end: 'left left', scrub: true } }));
    return () => {};
  });
  mm.add('(max-width: 860px)', () => {
    $$('.pcard').forEach(p => gsap.from(p, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 85%' } }));
  });

  /* ---------- services: draw icons ---------- */
  $$('.svc').forEach(svc => {
    const shapes = $$('.svc__icon *', svc);
    shapes.forEach(s => { const L = (s.getTotalLength ? s.getTotalLength() : 300) || 300; gsap.set(s, { strokeDasharray: L, strokeDashoffset: L }); });
    gsap.to(shapes, { strokeDashoffset: 0, duration: 1.6, stagger: .08, ease: 'power2.inOut', scrollTrigger: { trigger: svc, start: 'top 75%' } });
    gsap.from(svc.children, { y: 40, opacity: 0, duration: 1.1, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: svc, start: 'top 85%' } });
  });

  /* ---------- film scale ---------- */
  const film = $('.film'), fv = $('.film video');
  gsap.to('.film__frame', { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
    scrollTrigger: { trigger: film, start: 'top top', end: 'center center', scrub: true } });
  gsap.fromTo('.film__words span:first-child', { x: 0 }, { x: () => -innerWidth * .18, ease: 'none', scrollTrigger: { trigger: film, start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.film__words span:last-child', { x: 0 }, { x: () => innerWidth * .18, ease: 'none', scrollTrigger: { trigger: film, start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.film__caption', { opacity: 0, y: 30, scrollTrigger: { trigger: film, start: 'center center', end: 'center 30%', scrub: true } });
  ScrollTrigger.create({ trigger: film, start: 'top bottom', end: 'bottom top', onToggle: s => s.isActive ? fv.play().catch(() => {}) : fv.pause() });

  /* ---------- process line ---------- */
  mm.add('(min-width: 861px)', () => {
    gsap.to('.process__line i', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.process__rail', start: 'top 75%', end: 'bottom 45%', scrub: true } });
  });
  mm.add('(max-width: 860px)', () => {
    gsap.to('.process__line i', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process__rail', start: 'top 75%', end: 'bottom 60%', scrub: true } });
  });
  gsap.from('.step', { y: 50, opacity: 0, duration: 1.2, stagger: .14, ease: 'expo.out', scrollTrigger: { trigger: '.process__rail', start: 'top 80%' } });

  /* ---------- about ---------- */
  gsap.from('.about__img--a', { clipPath: 'inset(100% 0 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '.about', start: 'top 75%' } });
  gsap.from('.about__img--b', { clipPath: 'inset(0 0 100% 0)', y: 60, duration: 1.6, delay: .3, ease: 'expo.inOut', scrollTrigger: { trigger: '.about', start: 'top 75%' } });
  gsap.fromTo('[data-parallax]', { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.15, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.about__text p', { y: 30, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.about__text', start: 'top 70%' } });
  gsap.from('.about__sign .script', { clipPath: 'inset(0 100% 0 0)', duration: 2.2, ease: 'power2.inOut', scrollTrigger: { trigger: '.about__sign', start: 'top 90%' } });

  /* ---------- materials drift ---------- */
  const row = $('[data-drift]');
  gsap.fromTo(row, { x: () => -(row.scrollWidth - innerWidth) * .1 }, { x: () => -(row.scrollWidth - innerWidth) * .9 - 0, ease: 'none',
    scrollTrigger: { trigger: '.materials', start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
  gsap.from('.mat', { y: 80, opacity: 0, duration: 1.2, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: row, start: 'top 85%' } });

  /* ---------- contact ---------- */
  gsap.from('.contact__big', { yPercent: 40, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.contact', start: 'top 70%' } });
  gsap.fromTo('.contact__big span', { x: -40 }, { x: 40, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.titleblock > div', { opacity: 0, y: 20, duration: 1, stagger: .08, scrollTrigger: { trigger: '.titleblock', start: 'top 92%' } });

  /* magnetic pills */
  if (fine) $$('.pill, .wa-float').forEach(b => {
    b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .5, ease: 'power3.out' }); });
    b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: .8, ease: 'elastic.out(1,.4)' }));
  });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
