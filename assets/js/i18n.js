
(function(){
  const DEFAULT_LANG = (localStorage.getItem("lm_lang") || document.documentElement.lang || "fr").split("-")[0];
  let current = DEFAULT_LANG;
  async function load(lang){
    try{
      const res = await fetch(`assets/i18n/${lang}.json`);
      if(!res.ok) return;
      const dict = await res.json();
      document.querySelectorAll("[data-i18n]").forEach(el=>{
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.innerHTML = dict[key];
      });
      document.documentElement.lang = lang;
      localStorage.setItem("lm_lang", lang);
      current = lang;
      document.dispatchEvent(new CustomEvent("i18n-changed",{detail:{lang}}));
    }catch(e){console.warn("i18n load failed", e);}
  }
  document.addEventListener("click", (e)=>{
    const btn = e.target.closest("[data-switch-lang]");
    if (btn){
      e.preventDefault();
      const lang = btn.getAttribute("data-switch-lang");
      load(lang);
    }
  });
  window.LMI18N = { load, get lang(){return current;} };
  document.addEventListener("DOMContentLoaded", ()=>load(DEFAULT_LANG));
})();
