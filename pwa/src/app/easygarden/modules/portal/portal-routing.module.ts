import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { PortalComponent } from './portal.component';
import { EditNameComponent } from '../../components/editName/edit-name.component';
import { AddComponent } from '../../components/add/add.component';

import { PortalResolver } from './portal.resolver';

const name = environment.application.name;

const routes: Routes = [
  { path: '', component: PortalComponent,
    data: {
      ogTitle: `Page portail de l\'application ${name}`
    }, 
    resolve: {
      portal: PortalResolver
      }
    },
  { path: 'edit/:id', component: EditNameComponent,
    data: {
      ogTitle: `Page modifier portail de l\'application ${name}`
    }, 
  },
  { path: 'add', component: AddComponent,
    data: {
      ogTitle: `Page ajouter portail de l\'application ${name}`
    }, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PortalRoutingModule { }
