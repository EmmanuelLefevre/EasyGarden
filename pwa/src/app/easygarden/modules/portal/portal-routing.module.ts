import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { PortalComponent } from './portal.component';
import { EditEntityNameComponent } from '../../components/editEntityName/edit-entity-name.component';
import { AddEntityComponent } from '../../components/addEntity/add-entity.component';

import { PortalResolver } from './portal.resolver';


const name = environment.application.name;

const routes: Routes = [
  { path: '', component: PortalComponent,
    data: {
      ogTitle: `Page portail de l\'application ${name}`
    },
    resolve: {
      data: PortalResolver
      }
    },
  { path: 'edit/:id', component: EditEntityNameComponent,
    data: {
      ogTitle: `Page modifier portail de l\'application ${name}`
    },
  },
  { path: 'add', component: AddEntityComponent,
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
