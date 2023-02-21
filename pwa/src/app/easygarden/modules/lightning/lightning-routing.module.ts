import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LightningComponent } from './components/lightning/lightning.component';
import { EditLightningComponent } from './components/editLightning/edit-lightning.component';
import { AddLightningComponent } from './components/addLightning/add-lightning.component';

import { LightningResolver } from './lightning.resolver';

const routes: Routes = [
  { path: '', component: LightningComponent, resolve: {
      lightning: LightningResolver
    }
  },
  { path: 'edit/:id', component: EditLightningComponent },
  { path: 'add', component: AddLightningComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LightningRoutingModule { }
