/* Shared: header scroll state + fullscreen overlay menu */
(function(){
  "use strict";
  var header=document.getElementById('header');
  var setHdr=function(){header.classList.toggle('is-scrolled',window.scrollY>20)};setHdr();
  window.addEventListener('scroll',setHdr,{passive:true});
  var ov=document.getElementById('overlay'),ob=document.getElementById('menuOpen'),cb=document.getElementById('menuClose');
  function menu(o){ov.classList.toggle('is-open',o);ob.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''}
  ob.onclick=function(){menu(true)};cb.onclick=function(){menu(false)};
  ov.addEventListener('click',function(e){if(e.target===ov)menu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
})();
