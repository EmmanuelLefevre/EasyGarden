import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { AuthGuard } from './_services/guard/auth.guard';

import { Error404Component } from './_services/utils/error/error404.component';
import { VerifiedAccountComponent } from './_services/utils/verified-account/verified-account.component';

const name = environment.application.name;

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./public/public.module')
      .then(module => module.PublicModule)
  },
  {
    path: 'easygarden', loadChildren: () => import('./easygarden/easygarden.module')
      .then(module => module.EasygardenModule), canActivate:[AuthGuard]
  },
  { path: '404', component: Error404Component,
    data: {
      ogTitle: `Page d'erreur 404 de l\'application ${name}`
    }, 
  },
  { path: 'verified-account', component: VerifiedAccountComponent,
    data: {
      ogTitle: `Page de confirmation de validation de compte utilisateur de l\'application ${name}`
    }, 
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
