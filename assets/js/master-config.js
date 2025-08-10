// /assets/js/master-config.js
// Configuration centralisée pour Ludus Mentis - VERSION SIMPLIFIÉE

window.LudusConfig = {
  // Analytics
  analytics: {
    GA_ID: 'G-075RK8EJ9K',
    GTM_ID: 'GTM-WMCMP74V',
    enableTracking: true
  },
  
  // Organisation
  organization: {
    name: 'Ludus Mentis',
    type: 'Club de jeu vidéo éducatif',
    tagline: 'On joue ensemble, on progresse ensemble',
    legalStatus: 'ASBL en cours de création',
    foundingYear: 2025,
    openingDate: 'Septembre 2026',
    founder: 'Antoine Billard'
  },
  
  // Contact UNIQUE
  contact: {
    email: 'info@ludusmentis.be', // UNE SEULE ADRESSE
    address: {
      city: 'Walhain',
      region: 'Brabant wallon',
      country: 'Belgique'
    }
  },
  
  // Public cible
  targetAudience: {
    ageRange: '10-15 ans',
    groupSize: '8-10 participants',
    level: 'Tous niveaux acceptés'
  },
  
  // Programme
  program: {
    format: 'Modules de 7 semaines',
    sessionDuration: '2 heures',
    frequency: 'Hebdomadaire',
    day: 'Mercredi',
    slots: [
      { time: '14h00-16h00', target: 'Idéal collégiens' },
      { time: '17h00-19h00', target: 'Idéal lycéens' }
    ]
  },
  
  // Tarifs TRANSPARENTS
  pricing: {
    modulePrice: 230,
    currency: 'EUR',
    perHour: 16.43,
    duration: '7 semaines',
    included: 'Tout compris (matériel, encadrement, assurance, bilan)',
    discounts: [
      { type: 'resident', location: 'Walhain', percentage: 15, finalPrice: 195.50 },
      { type: 'family', description: 'Fratries', percentage: 10, finalPrice: 207 }
    ],
    paymentOptions: ['Comptant', '2x sans frais', 'Arrangement personnalisé']
  },
  
  // Pages du site (nouvelle architecture)
  sitemap: {
    pages: [
      { url: '/', title: 'Accueil', priority: 1.0 },
      { url: '/notre-approche.html', title: 'Notre approche', priority: 0.9 },
      { url: '/programmes.html', title: 'Programme', priority: 0.9 },
      { url: '/jeux.html', title: 'Les jeux', priority: 0.7 },
      { url: '/infos-pratiques.html', title: 'Infos pratiques', priority: 0.8 },
      { url: '/contact.html', title: 'Contact', priority: 0.9 },
      { url: '/a-propos.html', title: 'À propos', priority: 0.6 },
      { url: '/recherche.html', title: 'Recherche', priority: 0.5 },
      { url: '/charte.html', title: 'Charte', priority: 0.5 },
      { url: '/mentions.html', title: 'Mentions légales', priority: 0.3 }
    ]
  },
  
  // Formulaires
  forms: {
    formspreeId: 'mdkdwzoy',
    privacyNotice: 'Données traitées conformément au RGPD, conservation jusqu\'à septembre 2026'
  },
  
  // Partenaires
  partners: [
    {
      name: 'Commune de Walhain',
      logo: '/assets/images/logo_walhain.png',
      type: 'Soutien institutionnel'
    },
    {
      name: 'Fédération belge d\'esport',
      logo: '/assets/images/logo_besf.png',
      type: 'Partenaire technique'
    }
  ],
  
  // Jeux principaux
  games: {
    stars: [
      { name: 'Overcooked! 2', pegi: 3, players: '2-4', skill: 'Communication' },
      { name: 'Portal 2 Co-op', pegi: 12, players: '2', skill: 'Synchronisation' },
      { name: 'Keep Talking', pegi: 3, players: '2-4', skill: 'Écoute active' },
      { name: 'Lovers Spacetime', pegi: 7, players: '2-4', skill: 'Leadership' },
      { name: 'Moving Out', pegi: 3, players: '2-4', skill: 'Planification' }
    ],
    banned: ['Fortnite', 'Roblox', 'FIFA/FC', 'Call of Duty', 'GTA', 'League of Legends']
  },
  
  // Messages clés
  messages: {
    hero: 'Le club où le gaming devient social et éducatif',
    value: 'Transformez la passion gaming en compétences sociales',
    safety: 'Cadre sécurisé, horaires limités, parents impliqués',
    notTherapy: 'Club de loisir éducatif, pas un centre thérapeutique'
  },
  
  // SEO
  seo: {
    defaultTitle: 'Ludus Mentis | Club de jeu vidéo coopératif à Walhain',
    defaultDescription: 'Club gaming pour ados 10-15 ans. Sessions encadrées de 2h, jeux coopératifs, développement des soft skills. Walhain, Brabant wallon.',
    keywords: 'club jeu vidéo, gaming responsable, adolescents, Walhain, coopération, soft skills'
  }
};

// Fonction helper pour obtenir une config
window.getConfig = function(path) {
  return path.split('.').reduce((obj, key) => obj?.[key], window.LudusConfig);
};

// Log de confirmation
console.log('Ludus Mentis Config loaded - Simplified version');
