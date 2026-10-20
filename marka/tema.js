// Gece/gündüz: Agile sitesiyle aynı mantık (varsayılan gündüz, seçim hatırlanır)
(function(){var h=document.documentElement,k='portfoy-tema',t='light';try{t=localStorage.getItem(k)||'light'}catch(e){}
h.setAttribute('data-theme',t);
document.addEventListener('DOMContentLoaded',function(){var b=document.getElementById('tema');if(!b)return;
 var s=function(){b.textContent=h.getAttribute('data-theme')==='dark'?'☀':'☾';b.setAttribute('aria-label',h.getAttribute('data-theme')==='dark'?'Gündüz moduna geç':'Gece moduna geç')};s();
 b.addEventListener('click',function(){var n=h.getAttribute('data-theme')==='dark'?'light':'dark';h.setAttribute('data-theme',n);try{localStorage.setItem(k,n)}catch(e){}s()})})})();
