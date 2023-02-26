import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { WateringComponent } from './components/watering/watering.component';
import { EditWateringComponent } from './components/editWatering/edit-watering.component';
import { AddWateringComponent } from './components/addWatering/add-watering.component';

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
  { path: 'edit/:id', component: EditWateringComponent,
    data: {
      ogTitle: `Page modifier arrosage de l\'application ${name}`
    }, 
  },
  { path: 'add', component: AddWateringComponent,
    data: {
      ogTitle: `Page ajouter arrosge de l\'application ${name}`
    }, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WateringRoutingModule { }
