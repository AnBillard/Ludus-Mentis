
(function(){
  const STORAGE_KEY = "lm_cookie_consent_v1";
  const CATEGORIES = {
    essential: { required:true, label:"Essentiels (toujours actifs)" },
    analytics: { required:false, label:"Analytics" },
    marketing: { required:false, label:"Marketing" }
  };
  function getConsent(){ try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) } catch(e){} return null; }
  function setConsent(c){ localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); }
  function applyConsent(consent){
    const allowed = Object.entries(consent).filter(([k,v])=>v).map(([k])=>k);
    document.querySelectorAll('script[type="text/plain"][data-cookie-category]').forEach(scr=>{
      const cat = scr.getAttribute('data-cookie-category');
      if (allowed.includes(cat) || CATEGORIES[cat]?.required){
        const clone = document.createElement('script');
        const src = scr.getAttribute('src') || scr.getAttribute('data-src');
        if (src){ clone.src = src; }
        clone.textContent = scr.textContent || "";
        for (const {name, value} of Array.from(scr.attributes)){
          if (name==="type" || name==="data-src") continue;
          clone.setAttribute(name, value);
        }
        scr.replaceWith(clone);
      }
    });
    document.dispatchEvent(new CustomEvent("cookie-consent-applied", {detail:{consent}}));
  }
  function buildBanner(){
    if (document.getElementById("cookie-banner")) return;
    const wrapper = document.createElement("div");
    wrapper.id = "cookie-banner";
    wrapper.className = "fixed inset-x-0 bottom-0 z-50";
    wrapper.innerHTML = `
      <div class="mx-auto max-w-4xl m-3 rounded-box bg-base-100 shadow-lg border border-base-200">
        <div class="p-4 md:p-6">
          <div class="flex items-start gap-4">
            <div class="flex-1">
              <h2 class="text-lg font-semibold">Cookies</h2>
              <p class="mt-2 text-sm opacity-80">Nous utilisons des cookies essentiels pour faire fonctionner le site et, avec votre accord, des cookies d'analyse et de marketing.</p>
              <details class="mt-3">
                <summary class="cursor-pointer underline">Choisir les catégories</summary>
                <form id="cookie-form" class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label class="label cursor-pointer flex items-center gap-2 p-2 rounded-lg border border-base-200">
                    <input type="checkbox" class="checkbox" name="essential" checked disabled />
                    <span class="label-text">Essentiels (toujours actifs)</span>
                  </label>
                  <label class="label cursor-pointer flex items-center gap-2 p-2 rounded-lg border border-base-200">
                    <input type="checkbox" class="checkbox" name="analytics" />
                    <span class="label-text">Analytics</span>
                  </label>
                  <label class="label cursor-pointer flex items-center gap-2 p-2 rounded-lg border border-base-200">
                    <input type="checkbox" class="checkbox" name="marketing" />
                    <span class="label-text">Marketing</span>
                  </label>
                </form>
              </details>
            </div>
            <button class="btn btn-sm btn-ghost" aria-label="Fermer" id="cookie-close">✕</button>
          </div>
          <div class="mt-4 flex flex-wrap gap-2 justify-end">
            <a href="politique-de-confidentialite.html" class="link" target="_blank" rel="noopener">Politique de confidentialité</a>
            <button class="btn" id="cookie-decline">Tout refuser</button>
            <button class="btn btn-primary" id="cookie-accept">Tout accepter</button>
            <button class="btn btn-outline" id="cookie-save">Sauvegarder mes choix</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(wrapper);
    const form = wrapper.querySelector("#cookie-form");
    const close = () => { wrapper.remove(); };
    wrapper.querySelector("#cookie-close").addEventListener("click", close);
    wrapper.querySelector("#cookie-accept").addEventListener("click", () => {
      const consent = { essential:true, analytics:true, marketing:true };
      setConsent(consent); applyConsent(consent); close();
    });
    wrapper.querySelector("#cookie-decline").addEventListener("click", () => {
      const consent = { essential:true, analytics:false, marketing:false };
      setConsent(consent); applyConsent(consent); close();
    });
    wrapper.querySelector("#cookie-save").addEventListener("click", () => {
      const consent = {
        essential: true,
        analytics: form.querySelector('input[name="analytics"]').checked,
        marketing: form.querySelector('input[name="marketing"]').checked,
      };
      setConsent(consent); applyConsent(consent); close();
    });
  }
  const existing = getConsent();
  if (existing){ applyConsent(existing); } else { window.addEventListener("load", buildBanner); }
})();
