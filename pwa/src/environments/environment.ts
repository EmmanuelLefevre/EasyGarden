// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apis: {
    login: {
      url: 'http://localhost:8000/api/login_check'
    },
    checkAccountActivation: {
      url: 'http://localhost:8000/api/check_account_validation'
    },
    register: {
      url: 'http://localhost:8000/api/account_creation'
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
