// /assets/js/master-config.js
// Configuration centralisée pour Ludus Mentis

window.LudusConfig = {
  // Analytics
  analytics: {
    GA_ID: 'G-075RK8EJ9K',
    GTM_ID: 'GTM-WMCMP74V',
    enableTracking: true
  },
  
  // Organisation - CLARIFIÉ
  organization: {
    name: 'Ludus Mentis',
    type: 'Club de jeu vidéo éducatif',
    tagline: 'On joue ensemble, on progresse ensemble',
    legalStatus: 'ASBL en cours de création',
    foundingYear: 2025,
    openingDate: 'Septembre 2026',
    founder: 'Antoine Billard'
  },
  
  // Positionnement - CLARIFIÉ
  positioning: {
    what: 'Club de jeu vidéo coopératif',
    how: 'Sessions structurées hors domicile avec méthode pédagogique',
    why: 'Pratique responsable du gaming et développement de compétences sociales',
    notWhat: 'Ni thérapie, ni centre de traitement, ni compétition esport'
  },
  
  // Public cible - CLARIFIÉ
  targetAudience: {
    primary: {
      name: 'Adolescents',
      age: '10-15 ans',
      need: 'Cadre social pour leur passion gaming'
    },
    secondary: {
      name: 'Parents',
      need: 'Solution équilibrée pour gérer le temps d\'écran'
    },
    tertiary: {
      name: 'Éducateurs',
      need: 'Outil pédagogique innovant'
    }
  },
  
  // Programme
  program: {
    format: 'Modules de 7 semaines',
    sessionDuration: '2 heures',
    frequency: 'Hebdomadaire (mercredi)',
    groupSize: '8-10 participants maximum',
    location: 'Walhain, Brabant wallon',
    schedule: [
      { day: 'Mercredi', time: '14h00-16h00', target: 'Jeunes collégiens' },
      { day: 'Mercredi', time: '17h00-19h00', target: 'Lycéens' }
    ]
  },
  
  // Tarifs TRANSPARENTS
  pricing: {
    modulePrice: 230,
    currency: 'EUR',
    perSession: 32.86,
    included: [
      'Matériel gaming fourni',
      'Encadrement professionnel',
      'Assurance',
      'Bilan personnalisé'
    ],
    discounts: [
      { type: 'resident', location: 'Walhain', percentage: 15 },
      { type: 'family', description: 'Fratries', percentage: 10 }
    ],
    paymentOptions: [
      'Paiement comptant',
      '2x sans frais',
      'Arrangement personnalisé sur demande'
    ]
  },
  
  // Contact
  contact: {
    email: 'info@ludusmentis.be',
    address: {
      city: 'Walhain',
      region: 'Brabant wallon',
      country: 'Belgique',
      note: 'Lieu exact communiqué à l\'inscription'
    }
  },
  
  // Formulaires
  forms: {
    formspreeId: 'mdkdwzoy',
    privacyNotice: 'Vos données sont traitées conformément au RGPD. Aucun transfert hors UE sans votre consentement explicite.'
  },
  
  // Partenaires
  partners: [
    {
      name: 'Commune de Walhain',
      logo: '/assets/images/logo_walhain.png',
      url: 'https://www.walhain.be/',
      type: 'Soutien institutionnel'
    },
    {
      name: 'Fédération belge d\'esport',
      logo: '/assets/images/logo_besf.png',
      url: 'https://besf.be/',
      type: 'Partenaire technique'
    }
  ],
  
  // Jeux utilisés - PÉDAGOGIQUES UNIQUEMENT
  games: [
    { 
      name: 'Overcooked! 2', 
      pegi: 3, 
      players: '2-4', 
      type: 'coop',
      skills: 'Communication, gestion du stress'
    },
    { 
      name: 'Portal 2 Co-op', 
      pegi: 12, 
      players: '2', 
      type: 'puzzle',
      skills: 'Résolution de problèmes, synchronisation'
    },
    { 
      name: 'Keep Talking and Nobody Explodes', 
      pegi: 3, 
      players: '2-4', 
      type: 'communication',
      skills: 'Écoute active, précision verbale'
    },
    { 
      name: 'Lovers in a Dangerous Spacetime', 
      pegi: 7, 
      players: '2-4', 
      type: 'coop',
      skills: 'Coordination, leadership rotatif'
    },
    { 
      name: 'Moving Out', 
      pegi: 3, 
      players: '2-4', 
      type: 'coop',
      skills: 'Planification, travail d\'équipe'
    }
  ],
  
  // Messages clés - CLARIFIÉS
  messages: {
    hero: 'Le club où le jeu vidéo devient un sport d\'équipe',
    value: 'Transformez la passion gaming en compétences sociales',
    safety: 'Cadre sécurisé, horaires limités, parents impliqués',
    method: 'Méthode Kolb validée, mesure des progrès, bilan personnalisé',
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
