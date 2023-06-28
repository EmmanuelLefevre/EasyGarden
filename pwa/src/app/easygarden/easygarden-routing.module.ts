import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { GardenComponent } from './components/garden/garden.component';
import { EditNameComponent } from './components/editName/edit-name.component';
import { AddComponent } from './components/add/add.component';

const name = environment.application.name;

const routes: Routes = [
  {
    path: '', component: GardenComponent,
      data: {
        ogTitle: `Page jardin de l'application ${name}`
      }, 
    children: [
      {
        path: 'profil', loadChildren: () => import('./modules/profil/profil.module')
          .then(module => module.ProfilModule)
      },
      {
        path: 'watering', loadChildren: () => import('./modules/watering/watering.module')
          .then(module => module.WateringModule)
      },
      {
        path: 'lightning', loadChildren: () => import('./modules/lightning/lightning.module')
          .then(module => module.LightningModule)
      },
      {
        path: 'portal', loadChildren: () => import('./modules/portal/portal.module')
          .then(module => module.PortalModule)
      },
      {
        path: 'pool', loadChildren: () => import('./modules/pool/pool.module')
          .then(module => module.PoolModule)
      },
      {
        path: 'lawnmower', loadChildren: () => import('./modules/lawnmower/lawnmower.module')
          .then(module => module.LawnmowerModule)
      },
      
      { path: 'garden/edit/:id', component: EditNameComponent,
        data: {
          ogTitle: `Page modifier jardin de l'application ${name}`
        } 
      },
      { path: 'garden/add', component: AddComponent,
        data: {
          ogTitle: `Page ajouter jardin de l'application ${name}`
        } 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EasygardenRoutingModule { }
