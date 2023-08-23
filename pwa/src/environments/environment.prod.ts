export const environment = {
  production: true,
  // API
  apis: {
    // Login
    login: {
      url: '/api/login_check'
    },
    checkIfEmailExist: {
      url: '/api/check_if_email_exist'
    },
    checkAccountActivation: {
      url: '/api/check_account_activation'
    },
    forgottenPassword: {
      url: '/api/forgotten_password'
    },
    // Register
    register: {
      url: '/api/account_creation'
    },
    // User
    user: {
      url: '/api/users'
    },
    // Garden
    garden: {
      url: '/api/gardens'
    },
    // Lawnmower
    lawnmower: {
      url: '/api/lawnmowers'
    },
    // Lightning
    lightning: {
      url: '/api/lightnings'
    },
    // Pool
    pool: {
      url: '/api/pools'
    },
    // Portal
    portal: {
      url: '/api/portals'
    },
    // Watering
    watering: {
      url: '/api/waterings'
    }
  },
  // Application
  application: {
    name: 'Easy Garden',
    colorTheme: '#95cb11',
    mainDescription: "Easy Garden Application de Gestion d'Equipements de Parcs et Jardins",
    keywords: "Application Arrosage Eclairage Bassin Tondeuse Portail",
    author: "LEFEVRE Emmanuel"
  }
};
