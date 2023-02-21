import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_services/guard/auth.guard';

import { Error404Component } from './_services/utils/components/error/error404.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./public/public.module')
      .then(module => module.PublicModule)
  },
  {
    path: 'easygarden', loadChildren: () => import('./easygarden/easygarden.module')
      .then(module => module.EasygardenModule), canActivate:[AuthGuard]
  },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
