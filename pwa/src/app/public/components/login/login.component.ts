import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
    // Handle changes to the form before submitting it
    this.invalidCredentials = false;
    this.submitDisabled = true;
    this.handleFormChanges();
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

  onReset(formDirective: any): void {
    formDirective.resetForm();
    this.invalidCredentials = false;
    this.loginForm.reset();
    this.handleFormChanges();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

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
