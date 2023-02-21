import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PoolComponent } from './components/pool/pool.component';
import { EditPoolComponent } from './components/editPool/edit-pool.component';
import { AddPoolComponent } from './components/addPool/add-pool.component';

import { PoolResolver } from './pool.resolver';

const routes: Routes = [
  { path: '', component: PoolComponent, resolve: {
    pool: PoolResolver
    }
  },
  { path: 'edit/:id', component: EditPoolComponent },
  { path: 'add', component: AddPoolComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PoolRoutingModule { }
