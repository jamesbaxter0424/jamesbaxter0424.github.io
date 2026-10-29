/* Project detail: contents scroll-spy, lightbox, copy-link */
(function(){
  "use strict";
  var links=document.querySelectorAll('.b-nav a');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('is-on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-40% 0px -55% 0px'});
    document.querySelectorAll('.b-sec').forEach(function(s){io.observe(s)});
  }

  var lb=document.getElementById('lb'),lbImg=document.getElementById('lbImg');
  document.addEventListener('click',function(e){
    var b=e.target.closest('.fig__img');if(!b)return;
    var im=b.querySelector('img');lbImg.src=im.currentSrc||im.src;lbImg.alt=im.alt;
    if(lb.showModal)lb.showModal();
  });
  document.getElementById('lbClose').onclick=function(){lb.close()};
  lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});

  document.querySelectorAll('.js-copy-page-link').forEach(function(btn){
    btn.addEventListener('click',function(){
      var tip=btn.querySelector('.share__tip');
      var done=function(){if(tip){tip.classList.add('is-visible');setTimeout(function(){tip.classList.remove('is-visible')},1200)}};
      var url=window.location.href;
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(done).catch(done)}
      else{try{var t=document.createElement('textarea');t.value=url;t.style.position='absolute';t.style.left='-9999px';document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);done()}catch(err){done()}}
    });
  });
})();
