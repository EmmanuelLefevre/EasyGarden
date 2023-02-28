import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MyComponentsModule } from './components/my-components.module';

import { AppComponent } from './app.component';
import { Error404Component } from './_services/utils/components/error/error404.component';
import { FooterComponent } from './components/footer/footer.component';

import { JWTInterceptorProvider } from './_services/utils/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MyComponentsModule
  ],
  providers: [JWTInterceptorProvider, Meta],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
