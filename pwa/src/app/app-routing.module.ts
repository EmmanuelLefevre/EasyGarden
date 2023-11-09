import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
// Service
import { AuthGuardService } from './_services/guard/auth.guard';
// Component
import { Error404Component } from './_services/utils/error/error404/error404.component';
import { ActivatedAccountComponent } from './_services/utils/activated-account/activated-account.component';

const name = environment.application.name;

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./public/public.module')
      .then(module => module.PublicModule)
  },
  {
    path: 'easygarden', loadChildren: () => import('./easygarden/easygarden.module')
      .then(module => module.EasygardenModule), canActivate:[AuthGuardService]
  },
  { path: '404', component: Error404Component,
    data: {
      ogTitle: `Page d'erreur 404 de l\'application ${name}`
    },
  },
  { path: 'activated-account', component: ActivatedAccountComponent,
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
