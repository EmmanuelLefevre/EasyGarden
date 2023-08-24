import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { PublicRoutingModule } from './public-routing.module';
// Modules
import { DirectivesModule } from '../_directives/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PublicComponentsModule } from '../components/public-components.module';
// Component
import { ForgottenPasswordComponent } from './components/forgottenPassword/forgotten-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    ForgottenPasswordComponent,
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
