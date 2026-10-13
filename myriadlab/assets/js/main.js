(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  ['hero-graphic', 'motif-graphic', 'splash-mark'].forEach(function(cls){
    var svg = document.querySelector('.' + cls);
    if(!svg) return;
    var i = 0;
    Array.prototype.forEach.call(svg.children, function(child){
      var tag = child.tagName.toLowerCase();
      if(tag === 'line'){ child.setAttribute('pathLength', '100'); child.style.setProperty('--i', i++); }
      else if(tag === 'circle'){ child.style.setProperty('--i', i++); }
    });
  });

  var splash = document.getElementById('splash');
  var alreadyShown = true;
  try{ alreadyShown = !!sessionStorage.getItem('myrialab-splash-shown'); }catch(e){}
  var showSplash = splash && !reduced && !alreadyShown;

  if(showSplash){
    try{ sessionStorage.setItem('myrialab-splash-shown', '1'); }catch(e){}
    document.body.classList.add('splash-active');
    splash.hidden = false;
    setTimeout(function(){
      splash.classList.add('splash-hide');
      setTimeout(function(){
        splash.hidden = true;
        document.body.classList.remove('splash-active');
        document.body.classList.add('splash-done');
      }, 450);
    }, 1400);
  } else {
    document.body.classList.add('splash-done');
  }

  var items = document.querySelectorAll('.reveal, .motif-graphic');
  if(reduced || !('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach(function(el){ observer.observe(el); });
})();
