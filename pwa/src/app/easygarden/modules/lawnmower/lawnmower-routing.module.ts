import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LawnmowerComponent } from './components/lawnmower/lawnmower.component';
import { EditLawnmowerComponent } from './components/editLawnmower/edit-lawnmower.component';
import { AddLawnmowerComponent } from './components/addLawnmower/add-lawnmower.component';

import { LawnmowerResolver } from './lawnmower.resolver';

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
  { path: 'edit/:id', component: EditLawnmowerComponent,
    data: {
      ogTitle: `Page modifier tondeuse de l\'application ${name}`
    } 
  },
  { path: 'add', component: AddLawnmowerComponent,
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
