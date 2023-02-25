import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GardenComponent } from './components/garden/components/garden/garden.component';
import { EditGardenComponent } from './components/garden/components/editGarden/edit-garden.component';
import { AddGardenComponent } from './components/garden/components/addGarden/add-garden.component';

const routes: Routes = [
  {
    path: '', component: GardenComponent, children: [
      
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
      
      { path: 'garden/edit/:id', component: EditGardenComponent },
      { path: 'garden/add', component: AddGardenComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EasygardenRoutingModule { }
