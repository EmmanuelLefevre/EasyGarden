import { Component, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';

import { AuthService } from '../../../_services/auth/auth.service';
import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { TokenService } from '../../../_services/auth/token.service';
import { DecodedTokenService } from 'src/app/_services/miscellaneous/decoded-token.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';

import { ICredentials } from '../../../_interfaces/ICredentials';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  name = environment.application.name;

  // Invalid credentials
  invalidCredentials: boolean = false;
  errorMessage: string = '';

  // Toggle faEyeSlash
  visible: boolean = false;
  public toggle(): void {
    this.visible = !this.visible;
  }

  // loginForm Group
  loginForm = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        this.customValidator.validEmail()
      ]
    ],
    password: ['', [Validators.required]]
  })

  constructor(private router: Router,
              private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private authService: AuthService,
              private tokenService: TokenService,
              private snackbarService: SnackbarService,
              private decodedTokenService: DecodedTokenService) {}

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    
    const typedLoginForm: ICredentials = this.loginForm.value;
    const email = this.loginForm.value.email;

    this.authService.isAccountVerified(email).subscribe(
      (isVerified) => {
        if (isVerified) {
          this.authService.logIn(typedLoginForm).subscribe(
            data => {
              this.tokenService.saveToken(data.token);
              this.router.navigate(['easygarden']);
              this.snackbarService.showNotification(`Bonjour ${this.decodedTokenService.firstNameDecoded()} 
                                              ${this.decodedTokenService.lastNameDecoded()}.`, 'logIn-logOut');
            },
            error => {
              if (error.status === 401) {
                this.errorMessage = "Identifiants incorrects!";
                this.invalidCredentials = true;
              }
              else {
                this.errorMessage = "Une erreur s'est produite lors de la connexion!";
              }
            }
          );
        } else {
          this.snackbarService.showNotification(`Votre compte n'a pas encore été activé grâce au lien dans l'email qui vous a été envoyé!`, 'account-not-verified');
        }
      },
      _error => {
        this.snackbarService.showNotification(`Une erreur s'est produite lors de la vérification du compte!`, 'account-not-verified');
      }
    );
  }

  onReset(formDirective: any): void {
    this.loginForm.reset();
    formDirective.resetForm();
  }

}
