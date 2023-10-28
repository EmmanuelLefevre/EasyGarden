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
import { FormErrorMessageService } from 'src/app/_services/miscellaneous/form-error-message.service';
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
  falsePasswordErrorMessage: string = '';
  invalidCredentials: boolean = false;
  invalidPassword: boolean = false;
  // Form Group
  submittedForm: boolean  = false;
  form = this.formBuilder.group({
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
              private formErrorMessageService: FormErrorMessageService,
              private router: Router,
              private snackbarService: SnackbarService,
              private tokenService: TokenService) {

    this.resetDisabled = true;
    this.submitDisabled = true;
  }

  ngOnInit(): void {
    // Subscribe to form control input changes
    this.loginFormSubscription = this.form.valueChanges
      .subscribe(() => {
        this.handleFormChanges();
      });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.unsubscribeAll();
  }

  // Submit form
  onSubmit() {
    // Handle changes to the form before submitting it
    this.handleFormChanges();
    if (this.form.invalid) {
      return;
    }
    else {
      const typedForm: ICredentials = this.form.value;

      this.loginSubscription = this.authService.logIn(typedForm)
        .subscribe(
          // Successful processing connection
          data => {
            const email = this.form.value.email;
            this.accountVerificationSubscription = this.authService.isAccountVerified(email)
              .subscribe(
                (response: any) => {
                  if (response.message === 'Account not verified!') {
                    this.snackbarService.showNotification(
                      `Votre compte n'a pas encore été activé grâce au lien dans l'email qui vous a été envoyé!`
                      ,'orange-alert'
                    );
                    this.submitDisabled = false;
                  }
                  else if (response.message === 'Account is verified!') {
                    this.tokenService.saveToken(data.token);
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
                  this.submitDisabled = false;
                }
              );
          },
          error => {
            if (error.status === 401) {
              if (error.error.message === 'Invalid password!') {
                this.invalidPassword = true;
                this.falsePasswordErrorMessage = "Mot de passe incorrect!";
              }
              else if (error.error.message === 'No existing email!') {
                this.invalidCredentials = true;
                this.falsePasswordErrorMessage = "";
                this.snackbarService.showNotification(
                  `Veuillez créer un compte!`,
                  'red-alert'
                );
              }
            }
            else {
              this.snackbarService.showNotification(
                `Une erreur s'est produite lors de la connexion!`,
                'red-alert'
              );
            }
            this.submitDisabled = false;
          }
        );
    }
    this.submitDisabled = true;
    this.submittedForm = true;
  }

  // Reset form
  onReset(formDirective: any): void {
    this.form.reset();
    formDirective.resetForm();
    this.handleFormChanges();
    this.resetDisabled = true;
  }

  // Get the error message associated with a specific form field
  getErrorMessage(inputName: string): string {
    const control = this.form.get(inputName);
    const errorKey = control?.errors && Object.keys(control.errors)[0];
    return errorKey ? this.formErrorMessageService.getErrorMessage(inputName, errorKey) : '';
  }

  // Manage changes in form
  private handleFormChanges(): void {
    this.falsePasswordErrorMessage = "";
    this.invalidCredentials = false;
    this.invalidPassword = false;
    // Check if email and password fields are empty
    this.isEmailEmpty = this.form.get('email')?.value === '';
    this.isPasswordEmpty = this.form.get('password')?.value === '';
    // Disable reset button based on empty fields
    this.resetDisabled = this.isEmailEmpty && this.isPasswordEmpty;
    // Disable submit button if form is invalid
    this.submitDisabled = !this.form.valid;
    // Remove/Add 'invalid-feedback' class from email input
    const emailInput = document.getElementById('emailInput');
    if (this.submittedForm
        && this.form.get('email')?.dirty
        && this.form.get('email')?.valid) {
        emailInput!.classList.remove('invalid-feedback');
    }
    else if (this.form.get('email')?.invalid
             && this.form.get('email')?.dirty) {
      emailInput!.classList.add('invalid-feedback');
    }
    // Remove/Add 'invalid-feedback' class from password input
    const passwordInput = document.getElementById('passwordInput');
    if (this.submittedForm
        && this.form.get('password')?.dirty
        && this.form.get('password')?.valid) {
        passwordInput!.classList.remove('invalid-feedback');
    }
    else if (this.form.get('password')?.invalid
             && this.form.get('password')?.dirty) {
      passwordInput!.classList.add('invalid-feedback');
    }
  }

  // Redirection to forgotten password component
  redirectToForgottenPasswordComponent() {
    this.router.navigate(['/forgottenPassword']);
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
