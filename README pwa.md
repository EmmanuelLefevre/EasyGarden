# DÉMARRAGE
1. &nbsp;&nbsp;*/EasyGardenCDA*
\
Installer Angular =>
```
ng new pwa
```
2. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Lancer serveur local =>
```
ng serve -o
```
```
ng serve -o --port 4200
```
# ENVIRONNEMENT
1. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Installer FontAwesome
```
npm install @fortawesome/fontawesome-svg-core
```
```
npm install @fortawesome/free-solid-svg-icons
```
```
npm install @fortawesome/free-brands-svg-icons
```
```
npm install @fortawesome/angular-fontawesome@0.10.x
```
2. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Installer Angular Material
```
ng add @angular/material
```
3. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Installer animate.css
```
npm i animate.css
```
4. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Installer Compodoc
```
npm install -g @compodoc/compodoc
```
- Créer un fichier tsconfig.doc.json à la racine
\
- Copier/Coller dans ce fichier
```
{
  "include": ["src/**/*.ts"],
  "exclude": ["src/test.ts", "src/**/*.spec.ts", "src/app/file-to-exclude.ts"]
}
```
- Se rendre dans le fichier package.json et ajouter à "scripts"
```
"compodoc": "npx compodoc -p tsconfig.doc.json"
```
- Générer doc
```
npm run compodoc
```
- Lancer doc en mode serveur
```
npm run compodoc:serve
```
Url: localhost:8080
- Lancer doc en mode serveur watch
```
npm run compodoc:serve:watch
```
5. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Installer JWT Decode
```
npm i jwt-decode
```
6. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Installer ngx-pagination
```
npm i ngx-pagination
```
7. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Installer order-pipe
```
npm i ngx-order-pipe
```
7. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Installer filter-pipe
```
npm i ngx-filter-pipe
```
# COMMANDES
1. &nbsp;&nbsp;*/EasyGardenCDA/pwa*
\
Créer component
```
ng g c componentName --skipTests=true
```
\
Créer un service dans un dossier services
```
ng g s services\registerFormValidation --skipTests=true
```
\
Créer module
```
ng g m moduleName --skipTests=true
```
\
Créer routing
```
ng g m moduleName --skipTests=true
```