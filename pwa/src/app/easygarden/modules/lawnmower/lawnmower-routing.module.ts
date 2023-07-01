import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LawnmowerComponent } from './lawnmower.component';
import { AddEntityComponent } from '../../components/addEntity/add-entity.component';
import { EditEntityNameComponent } from '../../components/editEntityName/edit-entity-name.component';

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
  { path: 'edit/:id', component: EditEntityNameComponent,
    data: {
      ogTitle: `Page modifier éclairage de l\'application ${name}`
    } 
  },
  { path: 'add', component: AddEntityComponent,
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
