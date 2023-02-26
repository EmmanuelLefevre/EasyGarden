import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ProfilComponent } from './components/profil/profil.component';

const name = environment.application.name;

const routes: Routes = [
  { path: '', component: ProfilComponent,
    data: {
      ogTitle: `Page de profil utilisateur de l\'application ${name}`
    }, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfilRoutingModule { }
