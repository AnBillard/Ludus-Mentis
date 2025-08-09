// /assets/js/consent-default.js
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
window.gtag = gtag;
// Default: deny everything (EEA) before any Google script
gtag('consent','default',{
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  ad_storage: 'denied',
  analytics_storage: 'denied'
});
