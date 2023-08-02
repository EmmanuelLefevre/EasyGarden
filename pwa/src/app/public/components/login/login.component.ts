import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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


export class LoginComponent implements OnDestroy, OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  name = environment.application.name;

  // Declaration of subscriptions
  private accountVerificationSubscription!: Subscription;
  private loginFormSubscription!: Subscription;
  private loginSubscription!: Subscription;
  
  // Toggle faEyeSlash
  visible: boolean = false;
  public toggle(): void {
    this.visible = !this.visible;
  }
  
  // Buttons
  resetDisabled: boolean;
  submitDisabled: boolean;
  isEmailEmpty!: boolean;
  isPasswordEmpty!: boolean;

  // Form alerts
  errorMessage: string = '';
  invalidCredentials: boolean = false;
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
              private tokenService: TokenService) {

    this.resetDisabled = true;
    this.submitDisabled = true;
  }

  ngOnInit(): void {
    // Subscribe to login form control input changes
    this.loginFormSubscription = this.loginForm.valueChanges.subscribe(() => {
      this.handleFormChanges();
    });
  }
              
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.unsubscribeAll();
  }

  onSubmit() {
    this.invalidCredentials = false;
    this.submitDisabled = true;
    // Handle changes to the form before submitting it
    this.handleFormChanges();
    // Mark all form fields as touched before submitting
    this.markAllFieldsAsTouched();
    if (this.loginForm.invalid) {
      this.invalidCredentials = true;
      return;
    } else {
      const typedLoginForm: ICredentials = this.loginForm.value;
  
      this.loginSubscription = this.authService.logIn(typedLoginForm)
        .subscribe(
          // Successful processing connection
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

  }

  // Handle event when focus is removed from a form field
  onInputFocusOut(inputName: string): void {
    const control = this.loginForm.get(inputName);
    // Check if control exists (not null), is invalid (validation errors) and been touched.
    if (control && control.invalid && control.touched) {
      // Mark the field as modified to display error messages
      control.markAsDirty();
      this.invalidCredentials = true;
    } else {
      this.invalidCredentials = false;
    }
  }

  // Reset login form
  onReset(formDirective: any): void {
    formDirective.resetForm();
    this.invalidCredentials = false;
    this.loginForm.reset();
    this.handleFormChanges();
  }

  // Get the error message associated with a specific form field
  getErrorMessage(inputName: string): string {
    const control = this.loginForm.get(inputName);
    // Check control exists (not null) and there is validation errors.
    if (control?.errors) {
      if (control.errors['required']) {
        return inputName === 'email' ? 'Veuillez saisir un email!' : 'Veuillez saisir un mot de passe!';
      }
      if (control.errors['email']) {
        return 'Format d\'email invalide!';
      }
      if (control.errors['validEmail']) {
        return 'L\'email doit contenir un "." + nom de domaine!';
      }
    }
    return '';
  }

  // Manage changes in login form
  private handleFormChanges(): void {
    this.errorMessage = "";
    this.invalidCredentials = false
    // Check if email and password fields are empty
    this.isEmailEmpty = this.loginForm.get('email')?.value === '';
    this.isPasswordEmpty = this.loginForm.get('password')?.value === '';
    // Enable or disable reset button based on empty fields
    this.resetDisabled = this.isEmailEmpty && this.isPasswordEmpty;
    // Disable submit button if form is invalid
    this.submitDisabled = !this.loginForm.valid;
  }

  // Mark all form fields as "touched"
  private markAllFieldsAsTouched(): void {
    for (const controlName in this.loginForm.controls) {
      const control = this.loginForm.get(controlName);
      // Check if control exists (not null or undefined)
      if (control) {
        // Mark control as "touched" to trigger validations and associated errors
        control.markAsTouched();
      }
    }
  }
  
  // Unsubscribe subscriptions
  private unsubscribeAll(): void {
    if (this.accountVerificationSubscription) {
      this.accountVerificationSubscription.unsubscribe();
    }
    if (this.loginFormSubscription) {
      this.loginFormSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
  
}
