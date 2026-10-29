/* Home: typed roles, filters, Index/Grid layouts, hover preview, hero reveal. Needs projects.js. */
(function(){
  "use strict";
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* rotate the systems being built, not job titles */
  var roles=['intelligent agents','creative AI tools','interactive systems','spatial experiences'],tp=document.getElementById('typed');
  if(tp&&!reduce){
    var r=0,c=0,del=false;
    (function t(){
      var w=roles[r];
      c+=del?-1:1;
      tp.textContent=w.slice(0,c);
      var d=del?35:75;
      if(!del&&c===w.length){d=2400;del=true}
      else if(del&&c===0){del=false;r=(r+1)%roles.length;d=400}
      setTimeout(t,d);
    })();
  }else if(tp){tp.textContent=roles[0]}

  var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')};
  var pad=function(n){return String(n).padStart(2,'0')};
  var host=document.getElementById('render');
  var layout='index',filter='selected',cur=[];

  function pubHTML(p){
    if(!p.pub)return '';
    var c='pub'+(/under review/i.test(p.pub)?' pub--review':'');
    return p.paper?'<a class="'+c+'" href="'+esc(p.paper)+'" target="_blank" rel="noopener">'+esc(p.pub)+' ↗</a>':'<span class="'+c+'">'+esc(p.pub)+'</span>';
  }

  var PIN='<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="12" x2="12" y2="22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".55"/><circle cx="12" cy="8" r="5.5" fill="currentColor"/><circle cx="10.3" cy="6.3" r="1.5" fill="#fff" opacity=".55"/></svg>';

  var R={
    grid:function(list){
      return '<div class="lay-grid">'+list.map(function(p,i){return (
        '<article class="g-card rv" style="animation-delay:'+(i*45)+'ms">'+
          '<a class="g-card__media" href="'+esc(p.href)+'"><span class="g-card__idx">'+pad(i+1)+'</span><span class="ph">'+esc(p.title)+'</span><img src="'+esc(p.img)+'" alt="'+esc(p.title)+'" loading="lazy"></a>'+
          '<div class="g-card__body">'+pubHTML(p)+'<p class="g-card__tags">'+p.tags.map(function(t){return '<span>'+esc(t)+'</span>'}).join('')+'</p>'+
          '<h3 class="g-card__title"><a href="'+esc(p.href)+'">'+esc(p.title)+'</a></h3>'+
          '<p class="g-card__desc">'+esc(p.desc)+'</p></div>'+
        '</article>');}).join('')+'</div>';
    },
    index:function(list){
      return '<ol class="lay-index">'+list.map(function(p,i){return (
        '<li class="i-row rv" data-i="'+i+'" style="animation-delay:'+(i*40)+'ms">'+
          (filter==='selected'?'<span class="i-num i-pin" aria-label="Pinned">'+PIN+'</span>':'<span class="i-num">'+pad(i+1)+'</span>')+
          '<div class="i-main"><a class="i-title" href="'+esc(p.href)+'">'+esc(p.title)+'</a><span class="i-desc">'+esc(p.desc)+'</span></div>'+
          '<div class="i-side">'+pubHTML(p)+'<span class="i-meta">'+p.tags.map(esc).join(' · ')+'</span></div>'+
          '<span class="i-arrow" aria-hidden="true">↗</span>'+
        '</li>');}).join('')+'</ol>';
    }
  };

  function render(){
    cur=PROJECTS.category(filter);
    host.innerHTML=cur.length?R[layout](cur):'<p class="eyebrow">Projects coming soon.</p>';
    host.querySelectorAll('img').forEach(function(img){
      img.addEventListener('error',function(){var m=img.closest('.g-card__media');if(m)m.classList.add('is-missing')});
    });
    if(layout==='index')bindPreview();
  }

  /* cursor-following preview for Index layout */
  var pv=document.getElementById('preview'),pvImg=pv.querySelector('img'),
    pvNum=pv.querySelector('.pv__num'),pvTitle=pv.querySelector('.pv__title'),pvDesc=pv.querySelector('.pv__desc'),pvTags=pv.querySelector('.pv__tags'),pvPub=pv.querySelector('.pv__pub'),
    tx=0,ty=0,cx=0,cy=0,raf=null;
  function loop(){
    cx+=(tx-cx)*.18;cy+=(ty-cy)*.18;
    var w=pv.offsetWidth,h=pv.offsetHeight,x=cx+32;
    if(x+w>window.innerWidth-16)x=cx-32-w;
    var y=Math.min(Math.max(cy,h/2+8),window.innerHeight-h/2-8);
    pv.style.left=x+'px';pv.style.top=y+'px';
    raf=requestAnimationFrame(loop);
  }
  function bindPreview(){
    var rows=host.querySelectorAll('.i-row');
    rows.forEach(function(row){row.addEventListener('click',function(e){if(e.target.closest('a'))return;var a=row.querySelector('.i-title');if(a)location.href=a.getAttribute('href')})});
    if(reduce||!matchMedia('(pointer:fine)').matches)return;
    rows.forEach(function(row){
      row.addEventListener('mouseenter',function(e){
        var p=cur[+row.dataset.i];if(!p)return;
        pvImg.style.visibility='';pvImg.onerror=function(){this.style.visibility='hidden'};pvImg.src=p.img;pvNum.textContent=pad(+row.dataset.i+1)+' / '+pad(cur.length);
        pvTitle.textContent=p.title;pvPub.textContent=p.pub||'';pvPub.classList.toggle('pub--review',/under review/i.test(p.pub||''));pvDesc.textContent=p.desc;pvTags.textContent=p.tags.join(' · ');
        if(!raf){tx=cx=e.clientX;ty=cy=e.clientY;loop()}
        pv.classList.add('on');
      });
      row.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY});
      row.addEventListener('mouseleave',function(){pv.classList.remove('on')});
    });
  }

  /* layout switcher + filters */
  function setLayout(l){
    if(l===layout)return;
    layout=l;
    document.querySelectorAll('[data-layout]').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.layout===l)});
    pv.classList.remove('on');render();
  }
  document.querySelectorAll('[data-layout]').forEach(function(b){b.addEventListener('click',function(){setLayout(b.dataset.layout)})});
  document.querySelectorAll('.filter').forEach(function(b){
    b.addEventListener('click',function(){
      document.querySelectorAll('.filter').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
      filter=b.dataset.filter;pv.classList.remove('on');render();
    });
  });

  /* hero reveal */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}})},{threshold:.12});
    document.querySelectorAll('[data-reveal]').forEach(function(n){io.observe(n)});
  }else{document.querySelectorAll('[data-reveal]').forEach(function(n){n.classList.add('is-in')})}

  /* phones open in Grid by default; desktop opens in Index */
  if(matchMedia('(max-width:720px)').matches)setLayout('grid');else render();
})();
