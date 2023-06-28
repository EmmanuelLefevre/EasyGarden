import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { WateringComponent } from './watering.component';
import { EditNameComponent } from '../../components/editName/edit-name.component';
import { AddComponent } from '../../components/add/add.component';

import { WateringResolver } from './watering.resolver';

const name = environment.application.name;

const routes: Routes = [
  { path: '', component: WateringComponent,
    data: {
      ogTitle: `Page arrosage de l\'application ${name}`
    }, 
    resolve: {
        watering: WateringResolver
      }
    },
  { path: 'edit/:id', component: EditNameComponent,
    data: {
      ogTitle: `Page modifier arrosage de l\'application ${name}`
    }, 
  },
  { path: 'add', component: AddComponent,
    data: {
      ogTitle: `Page ajouter arrosage de l\'application ${name}`
    }, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WateringRoutingModule { }
