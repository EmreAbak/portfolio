// Canlı depo: depocular raflar ile asansör arasında forklift yollarından gidip gelir.
// Raf seçimi gerçek hareket sayısına göre ağırlıklı; süreler saha ölçümüyle kalibre edilmiş modelden.
(function(){
  const veri=document.getElementById('depo-data'); const svg=document.getElementById('depo-plan');
  if(!veri||!svg) return;
  const D=JSON.parse(veri.textContent), R=D.raflar, ids=Object.keys(R);
  const az=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rafEl={}; svg.querySelectorAll('.raf').forEach(e=>rafEl[e.dataset.id]=e);
  const heat=v=>{for(const [lim,n] of D.bins) if(v>=lim) return `var(--heat${n})`};
  const konum={mevcut:Object.fromEntries(ids.map(k=>[k,k])),yeni:D.yeni,hedef:D.hedef};
  let mod='mevcut';
  // raf renkleri: o yerleşimde rafta duran ürünün hareket sayısı
  function boya(m,gecikme){
    const yer={}; for(const k of ids) yer[konum[m][k]]=R[k].c;
    ids.forEach(L=>{const e=rafEl[L]; const f=()=>{e.style.fill=heat(yer[L]||0); e.classList.toggle('tasindi',m!=='mevcut'&&konum[m][L]!==L)};
      gecikme?setTimeout(f,gecikme(L)):f()});
  }
  // açılış: raflar asansöre yakından uzağa sırayla yanar
  ids.forEach(k=>rafEl[k].style.fill='var(--lane)');
  let basladi=false;
  new IntersectionObserver((en,ob)=>{if(en[0].isIntersecting&&!basladi){basladi=true;ob.disconnect();
    boya('mevcut',az?null:L=>R[L].t*4); if(!az) setTimeout(calis,900)}},{threshold:.25}).observe(svg);
  // yerleşim düğmeleri
  document.querySelectorAll('[data-yerlesim]').forEach(b=>b.addEventListener('click',()=>{
    mod=b.dataset.yerlesim; document.querySelectorAll('[data-yerlesim]').forEach(x=>x.classList.toggle('on',x===b));
    boya(mod,az?null:L=>Math.random()*500); sifirla();
  }));
  // sayaçlar
  const el=id=>document.getElementById(id);
  let n=0,tMod=0,tMev=0;
  function sifirla(){n=0;tMod=0;tMev=0;yaz()}
  const dk=s=>Math.round(s/60).toLocaleString('tr-TR');
  function yaz(){ if(!el('sy-n')) return;
    el('sy-n').textContent=n.toLocaleString('tr-TR'); el('sy-mod').textContent=dk(tMod)+' dk'; el('sy-mev').textContent=dk(tMev)+' dk';
    const f=tMev?Math.round(100*(tMev-tMod)/tMev):0; el('sy-fark').textContent=mod==='mevcut'?'–':'%'+f+' daha az'; }
  // ağırlıklı rastgele seçim
  const top=ids.reduce((a,k)=>a+R[k].c,0);
  function sec(){let x=Math.random()*top; for(const k of ids){x-=R[k].c; if(x<=0) return k} return ids[0]}
  const g=svg.querySelector('#depocular'); const NS='http://www.w3.org/2000/svg';
  const aktif=[]; const OLCEK=0.022; // 1 sn gerçek yürüme = 0,022 sn animasyon
  function yolUzunlugu(p){let L=0;for(let i=1;i<p.length;i++)L+=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);return L}
  function nokta(p,d){for(let i=1;i<p.length;i++){const s=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]); if(d<=s){const k=s?d/s:0;return [p[i-1][0]+(p[i][0]-p[i-1][0])*k,p[i-1][1]+(p[i][1]-p[i-1][1])*k]} d-=s} return p[p.length-1]}
  function gonder(){
    const k=sec(), L=konum[mod][k], r=R[L].rota.slice().reverse(), yol=r.concat(R[L].rota.slice(1));
    n++; tMod+=R[L].t; tMev+=R[k].t; yaz();
    if(aktif.length>45) return;
    const c=document.createElementNS(NS,'circle'); c.setAttribute('r','3.6'); c.setAttribute('class','depocu'); g.appendChild(c);
    aktif.push({c,yol,L,uz:yolUzunlugu(yol),sure:R[L].t*OLCEK*1000,bas:performance.now(),varildi:false});
  }
  function kare(now){
    for(let i=aktif.length-1;i>=0;i--){const a=aktif[i], q=(now-a.bas)/a.sure;
      if(q>=1){a.c.remove();aktif.splice(i,1);continue}
      const [x,y]=nokta(a.yol,a.uz*q); a.c.setAttribute('cx',x); a.c.setAttribute('cy',y);
      if(!a.varildi&&q>=.5){a.varildi=true; const e=rafEl[a.L]; e.classList.add('cekildi'); setTimeout(()=>e.classList.remove('cekildi'),450)}
    }
    requestAnimationFrame(kare);
  }
  let zam=null;
  function calis(){ if(zam) return; zam=setInterval(()=>{ if(!document.hidden) gonder() },180); requestAnimationFrame(kare) }
})();
