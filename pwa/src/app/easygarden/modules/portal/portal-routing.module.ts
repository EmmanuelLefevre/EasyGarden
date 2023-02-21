import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortalComponent } from './components/portal/portal.component';
import { EditPortalComponent } from './components/editPortal/edit-portal.component';
import { AddPortalComponent } from './components/addPortal/add-portal.component';

import { PortalResolver } from './portal.resolver';

const routes: Routes = [
  { path: '', component: PortalComponent, resolve: {
    portal: PortalResolver
    }
  },
  { path: 'edit/:id', component: EditPortalComponent },
  { path: 'add', component: AddPortalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PortalRoutingModule { }
