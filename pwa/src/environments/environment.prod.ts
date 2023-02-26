export const environment = {
  production: true,
  apis: {
    login: {
      url: 'http://localhost:8000/api/login_check'
    },
    user: {
      url: 'http://localhost:8000/api/users'
    },
    garden: {
      url: 'http://localhost:8000/api/gardens'
    },
    lawnmower: {
      url: 'http://localhost:8000/api/lawnmowers'
    },
    lightning: {
      url: 'http://localhost:8000/api/lightnings'
    },
    pool: {
      url: 'http://localhost:8000/api/pools'
    },
    portal: {
      url: 'http://localhost:8000/api/portals'
    },
    watering: {
      url: 'http://localhost:8000/api/waterings'
    },
    mailing: {
      url: 'https://formspree.io/f/xjvdwjee'
    }
  },
  application: {
    name: 'Easy Garden',
    colorTheme: '#95cb11',
    mainDescription: "Easy Garden Application de Gestion d'Equipements de Parcs et Jardins",
    keywords: "Application Arrosage Eclairage Bassin Tondeuse Portail",
    author: "LEFEVRE Emmanuel"
  }
};
