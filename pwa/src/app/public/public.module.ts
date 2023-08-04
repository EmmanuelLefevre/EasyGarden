import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// Modules
import { DirectivesModule } from '../_directives/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PublicComponentsModule } from '../components/public-components.module';
// Routing
import { PublicRoutingModule } from './public-routing.module';
// Component
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatTooltipModule,
    PublicComponentsModule,
    PublicRoutingModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PublicModule { }
