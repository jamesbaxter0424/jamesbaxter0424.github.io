/* Work overview: masonry of all published projects. Needs projects.js. */
(function(){
  "use strict";
  var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')};
  var list=PROJECTS.all();
  var host=document.getElementById('overview');
  host.innerHTML='<div class="lay-mason">'+list.map(function(p,i){return (
    '<article class="m-card rv" style="animation-delay:'+(i*45)+'ms">'+
      '<a class="m-card__media" href="'+esc(p.href)+'"><span class="m-card__idx">'+String(i+1).padStart(2,'0')+'</span><span class="ph">'+esc(p.title)+'</span><img src="'+esc(p.img)+'" alt="'+esc(p.title)+'" loading="lazy"></a>'+
      '<div class="m-card__body"><p class="m-card__tags">'+esc(p.tags.join(' · '))+'</p>'+
      '<h3 class="m-card__title"><a href="'+esc(p.href)+'">'+esc(p.title)+'</a></h3></div>'+
    '</article>');}).join('')+'</div>';
  host.querySelectorAll('img').forEach(function(img){
    img.addEventListener('error',function(){var m=img.closest('.m-card__media');if(m)m.classList.add('is-missing')});
  });
  var countEl=document.getElementById('workCount');if(countEl)countEl.textContent=list.length;
})();
