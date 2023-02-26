import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const name = environment.application.name;

const routes: Routes = [
      { path: '', component: HomeComponent, pathMatch: 'full',
        data: {
          ogTitle: `Page d\'accueil de l'application ${name}`
        } 
      },
      { path: 'login', component: LoginComponent,
        data: {
          ogTitle: `Page de connexion de l\'application ${name}`
        }  
      },
      { path: 'register', component: RegisterComponent,
        data: {
          ogTitle: `Page de création de compte de l\'application ${name}`
        }  
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule { }
