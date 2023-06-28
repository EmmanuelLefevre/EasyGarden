import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { PoolComponent } from './components/pool/pool.component';
import { EditNameComponent } from '../../components/editName/edit-name.component';
import { AddPoolComponent } from './components/addPool/add-pool.component';

import { PoolResolver } from './pool.resolver';

const name = environment.application.name;

const routes: Routes = [
  { path: '', component: PoolComponent,
    data: {
      ogTitle: `Page équipement de bassin de l\'application ${name}`
    }, 
    resolve: {
      pool: PoolResolver
    }
  },
  { path: 'edit/:id', component: EditNameComponent,
    data: {
      ogTitle: `Page modifier équipement de bassin de l\'application ${name}`
    }, 
  },
  { path: 'add', component: AddPoolComponent,
    data: {
      ogTitle: `Page ajouter équipement de bassin de l\'application ${name}`
    }, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PoolRoutingModule { }
