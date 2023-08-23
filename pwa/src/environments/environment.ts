// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
