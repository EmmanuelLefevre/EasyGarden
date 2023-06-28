import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LightningComponent } from './components/lightning/lightning.component';
import { EditNameComponent } from '../../components/editName/edit-name.component';
import { AddLightningComponent } from './components/addLightning/add-lightning.component';

import { LightningResolver } from './lightning.resolver';

const name = environment.application.name;

const routes: Routes = [
  { path: '', component: LightningComponent,
    data: {
      ogTitle: `Page éclairage de l\'application ${name}`
    },
   resolve: {
      lightning: LightningResolver
    }
  },
  { path: 'edit/:id', component: EditNameComponent,
    data: {
      ogTitle: `Page modifier éclairage de l\'application ${name}`
    } 
  },
  { path: 'add', component: AddLightningComponent,
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
