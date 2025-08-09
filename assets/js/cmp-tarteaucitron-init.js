// /assets/js/cmp-tarteaucitron-init.js
// Tries tarteaucitron at /tarteaucitron.js/tarteaucitron.js; if missing, falls back to a minimal CMP.
// GA4 ID is injected: G-075RK8EJ9K

(function(){
  var GA_ID = 'G-075RK8EJ9K';

  function loadGA4() {
    if (window._gaLoaded) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window._gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  function consentUpdate(vAnalytics) {
    if (typeof gtag === 'function') {
      gtag('consent','update', {
        analytics_storage: vAnalytics ? 'granted' : 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
    if (vAnalytics) loadGA4();
  }

  function hasTarte() { return typeof window.tarteaucitron !== 'undefined'; }

  // ===== Path A: tarteaucitron present =====
  function initTarte() {
    tarteaucitron.init({
      privacyUrl: '/mentions.html#cookies',
      hashtag: '#cookies',
      cookieName: 'lm_cookies',
      orientation: 'bottom',
      showIcon: false,
      cookieslist: true,
      highPrivacy: true,
      AcceptAllCta: true,
      DenyAllCta: true,
      useExternalCss: false,
      readmoreLink: '/mentions.html#cookies',
      handleBrowserDNTRequest: false
    });
    tarteaucitron.user.gtagUa = GA_ID;
    (tarteaucitron.job = tarteaucitron.job || []).push('gtag');

    function syncConsent () {
      try {
        var analyticsGranted = !!(tarteaucitron.state && tarteaucitron.state.gtag);
        consentUpdate(analyticsGranted);
      } catch(e) { console.warn('Consent sync error:', e); }
    }
    document.addEventListener('tac.consentsReady', syncConsent);
    document.addEventListener('tac.service_allowed', syncConsent);
    document.addEventListener('tac.service_disallowed', syncConsent);

    window.showCmp = function(){ tarteaucitron.userInterface.openPanel(); };
  }

  // ===== Path B: Fallback mini CMP =====
  function initMiniCMP() {
    var KEY='lmConsent';
    function save(c){ try{localStorage.setItem(KEY, JSON.stringify(c));}catch(e){} }
    function load(){ try{return JSON.parse(localStorage.getItem(KEY))||null;}catch(e){return null;} }

    // Banner
    var banner = document.createElement('div');
    banner.id='cmp-banner';
    banner.setAttribute('style','position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#f3f4f6;border-top:1px solid #e5e7eb;padding:12px;font:14px/1.4 system-ui,Segoe UI,Roboto,Arial');
    banner.innerHTML = '<div style="max-width:1100px;margin:0 auto;display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap">'
      + '<div>Nous utilisons des cookies pour la mesure d’audience (GA4), avec votre accord. <a href="/mentions.html#cookies">En savoir plus</a>.</div>'
      + '<div style="display:flex;gap:8px"><button id="cmp-deny" style="padding:8px 12px;border:1px solid #111;background:#fff;cursor:pointer">Tout refuser</button>'
      + '<button id="cmp-accept" style="padding:8px 12px;border:0;background:#111;color:#fff;cursor:pointer">Tout accepter</button></div></div>';
    document.body.appendChild(banner);

    function apply(c){ consentUpdate(!!c.analytics); if(banner) banner.remove(); }
    document.getElementById('cmp-accept').onclick = function(){ var c={analytics:true,ts:Date.now()}; save(c); apply(c); };
    document.getElementById('cmp-deny').onclick = function(){ var c={analytics:false,ts:Date.now()}; save(c); apply(c); };

    // Footer hook
    window.showCmp = function(){ localStorage.removeItem(KEY); location.reload(); };

    var existing = load();
    if (existing) { apply(existing); } // re-apply on load
  }

  document.addEventListener('DOMContentLoaded', function(){
    if (hasTarte()) initTarte(); else initMiniCMP();
  });
})();
