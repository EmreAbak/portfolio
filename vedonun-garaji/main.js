const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// preloader: hide only once per session so page-to-page navigation stays snappy
const seen = sessionStorage.getItem('vg-seen');
// main.js is loaded at the end of body, so the DOM is ready; don't wait for fonts/images (window.load can hang)
setTimeout(() => {
  document.body.classList.add('ready');
  sessionStorage.setItem('vg-seen', 1);
}, seen || reduce ? 0 : 1300);
if (seen) document.querySelector('.loader')?.style.setProperty('transition', 'transform .7s cubic-bezier(.22,1,.36,1)');

// split headings into words for the mask reveal
$$('.split').forEach(el => {
  el.innerHTML = el.innerHTML.split(/(<br>|<[^>]+>[^<]*<\/[^>]+>|\s+)/).map(p => {
    if (!p.trim() || p === '<br>') return p;
    return `<span class="w"><span>${p}</span></span>`;
  }).join('');
  $$('.w>span', el).forEach((s, i) => s.style.transitionDelay = (+(el.dataset.delay || 0) + i * .07) + 's');
});

// scroll reveals
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  io.unobserve(e.target);
  if (e.target.dataset.count) count(e.target);
}), { threshold: .2 });
const startReveals = () => $$('.rv,.split,.img-frame,[data-count]').forEach(el => io.observe(el));
setTimeout(startReveals, seen || reduce ? 100 : 1400);

function count(el) {
  const end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), d = 1800;
  const fmt = n => n.toLocaleString('tr-TR');
  const tick = t => {
    const p = Math.min((t - t0) / d, 1), e = 1 - Math.pow(1 - p, 4);
    el.textContent = fmt(Math.round(end * e)) + suf;
    if (p < 1) requestAnimationFrame(tick);
  };
  reduce ? el.textContent = fmt(end) + suf : requestAnimationFrame(tick);
}

// header + parallax + quote highlight on scroll
const header = document.querySelector('header');
const heroImg = document.querySelector('.hero-bg img');
const frames = $$('.img-frame img');
$$('.big-quote').forEach(q => q.innerHTML = q.textContent.trim().split(/\s+/).map(w => `<span class="w2 dim">${w}</span>`).join(' '));
const quoteWords = $$('.big-quote .w2');
function onScroll() {
  const y = scrollY;
  header.classList.toggle('scrolled', y > 40);
  if (reduce) return quoteWords.forEach(w => w.classList.remove('dim'));
  quoteWords.forEach(w => w.classList.toggle('dim', w.getBoundingClientRect().top > innerHeight * .62));
  if (heroImg && y < innerHeight) heroImg.style.translate = `0 ${y * .25}px`;
  frames.forEach(img => {
    const r = img.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    img.style.transform = `translateY(${-((r.top + r.height / 2 - innerHeight / 2) / innerHeight) * 8 - 8}%)`;
  });
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// page transition curtain
$$('a[href$=".html"]').forEach(a => a.addEventListener('click', e => {
  if (e.metaKey || e.ctrlKey || a.target) return;
  e.preventDefault();
  document.body.classList.add('leaving');
  setTimeout(() => location.href = a.href, reduce ? 0 : 750);
}));
addEventListener('pageshow', e => e.persisted && document.body.classList.remove('leaving'));

// mobile menu
document.querySelector('.burger')?.addEventListener('click', () => document.body.classList.toggle('menu-open'));

// soft petrol glow following the cursor
const glow = document.querySelector('.glow');
if (glow && matchMedia('(pointer:fine)').matches && !reduce)
  addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
