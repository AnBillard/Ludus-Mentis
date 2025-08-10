// assets/js/config.js
// Configuration centralisée pour Ludus Mentis
window.LudusConfig = {
  // Analytics
  analytics: {
    GA_ID: 'G-075RK8EJ9K',
    GTM_ID: 'GTM-WMCMP74V',
    enableTracking: true
  },
  
  // Contact
  contact: {
    email: 'info@ludusmentis.be',
    // Pas de téléphone visible comme demandé
    address: {
      city: 'Walhain',
      region: 'Brabant wallon',
      country: 'Belgique',
      note: 'Lieu exact à définir'
    }
  },
  
  // Organisation
  organization: {
    name: 'Ludus Mentis',
    legalStatus: 'ASBL en cours de création',
    foundingYear: 2025,
    openingDate: 'Septembre 2026',
    founder: 'Antoine Billard'
  },
  
  // Programme
  program: {
    targetAge: '10-15 ans',
    moduleDuration: '7 semaines',
    sessionDuration: '2 heures',
    groupSize: '8-10 participants maximum',
    schedule: [
      { day: 'Mercredi', time: '14h00-16h00' },
      { day: 'Mercredi', time: '17h00-19h00' }
    ]
  },
  
  // Tarifs
  pricing: {
    modulePrice: 230,
    currency: 'EUR',
    discounts: [
      { type: 'resident', location: 'Walhain', percentage: 15 },
      { type: 'family', description: 'Fratries', percentage: 10 }
    ]
  },
  
  // Formulaires
  forms: {
    formspreeId: 'mdkdwzoy'
  },
  
  // Status
  status: {
    registrationOpen: false,
    preRegistrationOpen: true,
    currentPhase: 'préinscription'
  },
  
  // Partenaires
  partners: [
    {
      name: 'Commune de Walhain',
      logo: 'assets/images/logo_walhain.png',
      url: 'https://www.walhain.be/'
    },
    {
      name: 'Fédération belge d\'esport',
      logo: 'assets/images/logo_besf.png',
      url: 'https://besf.be/'
    }
  ],
  
  // Jeux utilisés
  games: [
    { name: 'Overcooked! 2', pegi: 3, players: '2-4', type: 'coop' },
    { name: 'Portal 2 Co-op', pegi: 12, players: '2', type: 'puzzle' },
    { name: 'Keep Talking and Nobody Explodes', pegi: 3, players: '2-4', type: 'communication' },
    { name: 'Lovers in a Dangerous Spacetime', pegi: 7, players: '2-4', type: 'coop' },
    { name: 'Moving Out', pegi: 3, players: '2-4', type: 'coop' },
    { name: 'Snipperclips', pegi: 3, players: '2-4', type: 'puzzle' },
    { name: 'Unravel Two', pegi: 7, players: '2', type: 'platformer' },
    { name: 'Trine 4', pegi: 12, players: '2-4', type: 'adventure' }
  ],
  
  // Messages
  messages: {
    preRegistration: 'Préinscriptions ouvertes pour septembre 2026',
    noPhone: 'Contact uniquement par email pour le moment',
    locationPending: 'Lieu exact à Walhain à confirmer'
  }
};
