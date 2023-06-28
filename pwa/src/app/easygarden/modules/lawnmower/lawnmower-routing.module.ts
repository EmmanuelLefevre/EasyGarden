import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LawnmowerComponent } from './lawnmower.component';
import { AddComponent } from '../../components/add/add.component';

import { LawnmowerResolver } from './lawnmower.resolver';
import { EditNameComponent } from '../../components/editName/edit-name.component';

const name = environment.application.name;

const routes: Routes = [
  { path: '', component: LawnmowerComponent,
    data: {
      ogTitle: `Page tondeuse de l\'application ${name}`
    }, 
    resolve: {
      lawnmower: LawnmowerResolver
    } 
  },
  { path: 'edit/:id', component: EditNameComponent,
    data: {
      ogTitle: `Page modifier éclairage de l\'application ${name}`
    } 
  },
  { path: 'add', component: AddComponent,
    data: {
      ogTitle: `Page ajouter tondeuse de l\'application ${name}`
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LawnmowerRoutingModule { }
