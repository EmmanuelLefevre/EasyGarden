export const environment = {
  production: true,
  // API
  apis: {
    // Login
    login: {
      url: 'http://localhost:8000/api/login_check'
    },
    checkIfEmailExist: {
      url: 'http://localhost:8000/api/check_if_email_exist'
    },
    checkAccountActivation: {
      url: 'http://localhost:8000/api/check_account_validation'
    },
    // Register
    register: {
      url: 'http://localhost:8000/api/account_creation'
    },
    // User
    user: {
      url: 'http://localhost:8000/api/users'
    },
    // Garden
    garden: {
      url: 'http://localhost:8000/api/gardens'
    },
    // Lawnmower
    lawnmower: {
      url: 'http://localhost:8000/api/lawnmowers'
    },
    // Lightning
    lightning: {
      url: 'http://localhost:8000/api/lightnings'
    },
    // Pool
    pool: {
      url: 'http://localhost:8000/api/pools'
    },
    // Portal
    portal: {
      url: 'http://localhost:8000/api/portals'
    },
    // Watering
    watering: {
      url: 'http://localhost:8000/api/waterings'
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
