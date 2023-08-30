import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Meta } from '@angular/platform-browser';
// Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Routing
import { AppRoutingModule } from './app-routing.module';
// Interceptor
import { AUTHInterceptorProvider } from './_services/middleware/auth.interceptor';
// Components
import { AppComponent } from './app.component';
import { Error404Component } from './_services/utils/error/error404/error404.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    FooterComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [AUTHInterceptorProvider, Meta],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
