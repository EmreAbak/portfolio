// Portföy efektleri: parçacık ağı (hero), eğilen kartlar, mıknatıslı düğmeler, sayan rakamlar, kayarak gelen öğeler.
// "Hareketi azalt" ayarı açıksa hepsi kapanır.
document.addEventListener('DOMContentLoaded',()=>{
  const az=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  // ---- kayarak gelen öğeler
  const rv=document.querySelectorAll('.halka-kutu,.akis-kutu,.yigin-kutu,.oz,.alinti,.matris-kutu,.cizgi-kutu,.kadro-kutu,.sohbet-kutu,.huni-kutu,.pb-kutu,.pareto-kutu,.oncesonra,.deger,.terim,.point,.card,.result,.methods,.map,.step h2,.step .lead,.yerlesim-panel,.bars,.shot,.flow .col,.kanit,.tablo-kutu');
  if(!az){ rv.forEach((e,i)=>{e.classList.add('rv'); e.style.transitionDelay=((i%4)*90)+'ms'});
    const ob=new IntersectionObserver(en=>en.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');ob.unobserve(x.target)}}),{threshold:.15});
    rv.forEach(e=>ob.observe(e)); }

  // ---- sayan rakamlar (Türkçe biçim korunur: 1.100, %95, 26 sa → 12 sa)
  const say=el=>{
    const tw=document.createTreeWalker(el,NodeFilter.SHOW_TEXT); const ns=[]; while(tw.nextNode()) ns.push(tw.currentNode);
    ns.forEach(t=>{ const orj=t.textContent; const sayilar=[...orj.matchAll(/\d{1,3}(?:\.\d{3})+|\d+/g)]; if(!sayilar.length) return;
      const t0=performance.now(), d=1400;
      const kare=now=>{const q=Math.min(1,(now-t0)/d), e=1-Math.pow(1-q,3); let i=0;
        t.textContent=orj.replace(/\d{1,3}(?:\.\d{3})+|\d+/g,m=>{const v=parseInt(m.replace(/\./g,'')); i++; return Math.round(v*e).toLocaleString('tr-TR')});
        if(q<1) requestAnimationFrame(kare); else t.textContent=orj};
      requestAnimationFrame(kare); });
  };
  if(!az){ const ob=new IntersectionObserver(en=>en.forEach(x=>{if(x.isIntersecting){say(x.target);ob.unobserve(x.target)}}),{threshold:.6});
    document.querySelectorAll('.gain,.result b,.kpi b,.dagilim tfoot td:last-child').forEach(e=>ob.observe(e)); }

  if(az) return;
  const ince=matchMedia('(pointer:fine)').matches;

  // ---- eğilen kartlar
  if(ince) document.querySelectorAll('.card').forEach(c=>{
    c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
      c.style.transform=`perspective(900px) rotateY(${(x-.5)*10}deg) rotateX(${(.5-y)*8}deg) translateY(-4px)`;
      c.style.setProperty('--mx',(x*100)+'%'); c.style.setProperty('--my',(y*100)+'%')});
    c.addEventListener('mouseleave',()=>{c.style.transform=''});
  });

  // ---- mıknatıslı düğmeler
  if(ince) document.querySelectorAll('.pager a,.seg button').forEach(b=>{
    b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect(); b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});
    b.addEventListener('mouseleave',()=>{b.style.transform=''});
  });

  // ---- parçacık ağı (hero)
  const hero=document.querySelector('.hero'); if(!hero) return;
  const cv=document.createElement('canvas'); cv.className='agcanvas'; hero.prepend(cv); const ctx=cv.getContext('2d');
  let W,H,P=[],fare={x:-999,y:-999},gorunur=true;
  const boyut=()=>{const d=devicePixelRatio||1; W=hero.clientWidth; H=hero.clientHeight; cv.width=W*d; cv.height=H*d; cv.style.width=W+'px'; cv.style.height=H+'px'; ctx.setTransform(d,0,0,d,0,0);
    const n=Math.min(130,Math.round(W*H/11000)); P=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))};
  boyut(); addEventListener('resize',boyut);
  hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect(); fare={x:e.clientX-r.left,y:e.clientY-r.top}});
  hero.addEventListener('mouseleave',()=>fare={x:-999,y:-999});
  new IntersectionObserver(en=>gorunur=en[0].isIntersecting).observe(hero);
  const ciz=()=>{ if(gorunur&&!document.hidden){
      const mavi=css('--blue')||'#1F6EEA', neon=css('--neon')||'#00D4FF';
      ctx.clearRect(0,0,W,H);
      for(const p of P){ const dx=fare.x-p.x, dy=fare.y-p.y, d=Math.hypot(dx,dy);
        if(d<160){p.vx+=dx/d*.012; p.vy+=dy/d*.012}
        p.vx*=.985; p.vy*=.985; p.vx+=(Math.random()-.5)*.02; p.vy+=(Math.random()-.5)*.02;
        p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1; }
      for(let i=0;i<P.length;i++){ const a=P[i];
        for(let j=i+1;j<P.length;j++){const b=P[j], d=Math.hypot(a.x-b.x,a.y-b.y); if(d<130){ctx.strokeStyle=mavi; ctx.globalAlpha=(1-d/130)*.45; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke()}}
        const df=Math.hypot(a.x-fare.x,a.y-fare.y);
        if(df<170){ctx.strokeStyle=neon; ctx.globalAlpha=(1-df/170)*.8; ctx.lineWidth=1.4; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(fare.x,fare.y); ctx.stroke()}
        ctx.globalAlpha=.8; ctx.fillStyle=df<170?neon:mavi; ctx.beginPath(); ctx.arc(a.x,a.y,df<170?3:2.4,0,7); ctx.fill(); }
      ctx.globalAlpha=1; }
    requestAnimationFrame(ciz) };
  requestAnimationFrame(ciz);
});
