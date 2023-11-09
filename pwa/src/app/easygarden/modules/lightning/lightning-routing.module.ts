import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LightningComponent } from './lightning.component';
import { EditEntityNameComponent } from '../../components/editEntityName/edit-entity-name.component';
import { AddEntityComponent } from '../../components/addEntity/add-entity.component';

import { LightningResolver } from './lightning.resolver';


const name = environment.application.name;

const routes: Routes = [
  { path: '', component: LightningComponent,
    data: {
      ogTitle: `Page éclairage de l\'application ${name}`
    },
   resolve: {
      data: LightningResolver
    }
  },
  { path: 'edit/:id', component: EditEntityNameComponent,
    data: {
      ogTitle: `Page modifier éclairage de l\'application ${name}`
    }
  },
  { path: 'add', component: AddEntityComponent,
    data: {
      ogTitle: `Page ajouter éclairage de l\'application ${name}`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LightningRoutingModule { }
