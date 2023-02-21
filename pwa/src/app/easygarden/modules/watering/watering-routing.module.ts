import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WateringComponent } from './components/watering/watering.component';
import { EditWateringComponent } from './components/editWatering/edit-watering.component';
import { AddWateringComponent } from './components/addWatering/add-watering.component';

import { WateringResolver } from './watering.resolver';

const routes: Routes = [
  { path: '', component: WateringComponent, resolve: {
      watering: WateringResolver
    }
  },
  { path: 'edit/:id', component: EditWateringComponent },
  { path: 'add', component: AddWateringComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WateringRoutingModule { }
