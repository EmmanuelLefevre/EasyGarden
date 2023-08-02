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
  
  // Toggle faEyeSlash
  visible: boolean = false;
  public toggle(): void {
    this.visible = !this.visible;
  }
  
  // Buttons
  disabledResetButtonClass: boolean | undefined;

  // Form alerts
  invalidCredentials: boolean = false;
  errorMessage: string = '';
  // LoginForm Group
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
    // Clean up subscriptions
    this.unsubscribeAll();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.invalidCredentials = false;
    if (this.loginForm.invalid) {
      this.invalidCredentials = true;
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
              (response: any) => {
                if (response.message === 'Account not verified!') {
                  this.snackbarService.showNotification(
                    `Votre compte n'a pas encore été activé grâce au lien dans l'email qui vous a été envoyé!`
                    ,'orange-alert'
                  );
                } else if (response.message === 'Account is verified!') {
                  this.router.navigate(['easygarden']);
                  this.snackbarService.showNotification(
                    `Bonjour ${this.decodedTokenService.firstNameDecoded()} `
                    + `${this.decodedTokenService.lastNameDecoded()}.`
                    ,'logIn-logOut'
                  );
                }
              },
              _error => {
                this.snackbarService.showNotification(
                  `Une erreur s'est produite lors de la vérification du compte!`
                  ,'red-alert'
                );
              }
            );
        },
        error => {
          if (error.status === 401) {
            this.invalidCredentials = true;
            this.errorMessage = "Identifiants incorrects!";
          } else {
            this.snackbarService.showNotification(
              `Une erreur s'est produite lors de la connexion!`
              ,'red-alert'
            );
          }
        }
      );
  }

  onReset(formDirective: any): void {
    this.loginForm.reset();
    formDirective.resetForm();
  }
    
  onInputChanged() {
    this.errorMessage = "";
    this.invalidCredentials = false;
    // Detect change of inputs value
    const resetButton = document.querySelector('#reset-button');
    if (resetButton && this.onInputManuallyCleared()) {
      resetButton.setAttribute('disabled', 'true');
      this.disabledResetButtonClass = true;
    } else {
      resetButton?.removeAttribute('disabled');
      this.disabledResetButtonClass = false;
    }
  }

  onInputManuallyCleared(): boolean {
    const emailInput = this.loginForm.get('email');
    const passwordInput = this.loginForm.get('password');
    if (emailInput?.value === '' && passwordInput?.value === '') {
      return true;
    }
    return false;
  }

  private unsubscribeAll(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
    if (this.accountVerificationSubscription) {
      this.accountVerificationSubscription.unsubscribe();
    }
  }

}
