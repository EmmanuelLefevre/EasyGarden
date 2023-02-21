import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from './_services/utils/components/error/error404.component';

import { JWTInterceptorProvider } from './_services/utils/jwt.interceptor';

import { InputTrimDirective } from './_directives/inputTrim.directive';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        Error404Component,
        InputTrimDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        MatSnackBarModule
    ],
    providers: [
        JWTInterceptorProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
