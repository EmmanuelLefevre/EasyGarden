import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// Environment
import { environment } from '../../../../environments/environment';
// Icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// Services
import { AuthService } from '../../../_services/auth/auth.service';
import { DecodedTokenService } from 'src/app/_services/miscellaneous/decoded-token.service';
import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
import { TokenService } from '../../../_services/auth/token.service';
// Modeles
import { ICredentials } from '../../../_interfaces/ICredentials';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnDestroy {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  name = environment.application.name;

  // Declaration of subscriptions
  private loginSubscription!: Subscription;
  private accountVerificationSubscription!: Subscription;

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

  constructor(private authService: AuthService,
              private customValidator : FormValidationService,
              private decodedTokenService: DecodedTokenService,              
              private formBuilder: UntypedFormBuilder,
              private router: Router,
              private snackbarService: SnackbarService,
              private tokenService: TokenService,) {}

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.accountVerificationSubscription) {
      this.accountVerificationSubscription.unsubscribe();
    }

  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    
    const typedLoginForm: ICredentials = this.loginForm.value;

    this.loginSubscription = this.authService.logIn(typedLoginForm)
      .subscribe(
        data => {
          this.tokenService.saveToken(data.token);
          const email = this.loginForm.value.email;
          this.accountVerificationSubscription = this.authService.isAccountVerified(email)
            .subscribe(
              (isVerified) => {
                if (isVerified) {
                  this.router.navigate(['easygarden']);
                  this.snackbarService.showNotification(`Bonjour ${this.decodedTokenService.firstNameDecoded()} 
                    ${this.decodedTokenService.lastNameDecoded()}.`, 'logIn-logOut');
                } else {
                  this.snackbarService.showNotification(`Votre compte n'a pas encore été activé grâce au 
                    lien dans l'email qui vous a été envoyé!`, 'orange-alert');
                }
              },
              _error => {
                this.snackbarService.showNotification(`Une erreur s'est produite lors de la vérification 
                  du compte!`, 'red-alert');
              }
            );
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
  }

  onReset(formDirective: any): void {
    this.loginForm.reset();
    formDirective.resetForm();
  }

}
