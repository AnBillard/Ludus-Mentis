
/* Simple EU consent banner + Consent Mode v2 bootstrap */
(function(){
  var KEY='lm-consent-v1';
  var state = { analytics:false, ads:false, decided:false };
  try { var saved = JSON.parse(localStorage.getItem(KEY)||'{}'); Object.assign(state, saved); } catch(e){}
  function gtag(){ window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  // default denied
  gtag('consent', 'default', {
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
  });

  function applyConsent(){
    var a = state.analytics ? 'granted':'denied';
    var d = state.ads ? 'granted':'denied';
    gtag('consent', 'update', {
      'ad_user_data': d,
      'ad_personalization': d,
      'ad_storage': d,
      'analytics_storage': a
    });
    // Load GTM only if any consent given (analytics or ads)
    if (state.analytics || state.ads) {
      if (!window.__gtmLoaded && window.__GTM_ID) {
        var s=document.createElement('script');
        s.async=true; s.src='https://www.googletagmanager.com/gtm.js?id=' + window.__GTM_ID;
        document.head.appendChild(s);
        window.__gtmLoaded = true;
      }
    }
  }

  function saveAndApply(){
    localStorage.setItem(KEY, JSON.stringify(state));
    applyConsent();
    var b=document.getElementById('lm-consent');
    if (b) b.remove();
  }

  if (!state.decided){
    // build banner
    var bar = document.createElement('div');
    bar.id='lm-consent';
    bar.setAttribute('role','region');
    bar.setAttribute('aria-label','Bandeau cookies');
    bar.style.position='fixed';
    bar.style.inset='auto 0 0 0';
    bar.style.zIndex='9999';
    bar.style.background='rgba(0,0,0,.9)';
    bar.style.color='white';
    bar.style.padding='16px';
    bar.style.display='flex';
    bar.style.flexDirection='column';
    bar.style.gap='12px';

    var title=document.createElement('strong');
    title.textContent='Cookies & confidentialité';
    bar.appendChild(title);

    var p=document.createElement('p');
    p.textContent = 'Nous utilisons des cookies pour mesurer l’audience et, avec votre accord, pour du marketing. Vous pouvez accepter, refuser ou personnaliser.';
    p.style.maxWidth='72ch';
    bar.appendChild(p);

    var btnWrap=document.createElement('div');
    btnWrap.style.display='flex';
    btnWrap.style.gap='8px';
    btnWrap.style.flexWrap='wrap';

    function mkBtn(label){
      var b=document.createElement('button');
      b.type='button';
      b.textContent=label;
      b.style.padding='10px 14px';
      b.style.borderRadius='10px';
      b.style.border='1px solid #fff';
      b.style.background='transparent';
      b.style.color='white';
      b.style.cursor='pointer';
      b.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' ') { e.preventDefault(); b.click(); }});
      return b;
    }

    var accept=mkBtn('Tout accepter');
    accept.style.background='#ea580c';
    accept.addEventListener('click', function(){
      state.analytics=true; state.ads=true; state.decided=true; saveAndApply();
    });

    var refuse=mkBtn('Tout refuser');
    refuse.addEventListener('click', function(){
      state.analytics=false; state.ads=false; state.decided=true; saveAndApply();
    });

    var personalize=mkBtn('Personnaliser');
    personalize.addEventListener('click', function(){
      var a=confirm('Autoriser la mesure d’audience (analytics) ?'); 
      var d=confirm('Autoriser la publicité/personnalisation (ads) ?');
      state.analytics=!!a; state.ads=!!d; state.decided=true; saveAndApply();
    });

    btnWrap.appendChild(accept);
    btnWrap.appendChild(refuse);
    btnWrap.appendChild(personalize);
    bar.appendChild(btnWrap);
    document.body.appendChild(bar);
  } else {
    applyConsent();
  }
})();
