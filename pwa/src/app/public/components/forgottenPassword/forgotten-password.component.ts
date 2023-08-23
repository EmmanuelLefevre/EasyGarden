import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// Environment
import { environment } from '../../../../environments/environment';
// Services
import { AuthService } from '../../../_services/auth/auth.service';
import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { IEmail } from '../../../_interfaces/IEmail';


@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ForgottenPasswordComponent implements OnDestroy, OnInit {

  name = environment.application.name;

  // Declaration of subscriptions
  private forgottenPasswordSubscription!: Subscription;

  // Buttons
  resetDisabled: boolean;
  submitDisabled: boolean;
  isEmailEmpty!: boolean;

  // Form alerts
  invalidEmail: boolean = false;
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
    ]
  })
  
  constructor(private authService: AuthService,
              private customValidator : FormValidationService,              
              private formBuilder: UntypedFormBuilder,
              private router: Router,
              private snackbarService: SnackbarService) { 

    this.resetDisabled = true;
    this.submitDisabled = true;
  }

  ngOnInit(): void {
    // Subscribe to form control input changes
    this.forgottenPasswordSubscription = this.form.valueChanges
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
      const typedForm = this.form.value;
  
      this.forgottenPasswordSubscription = this.authService.forgottenPassword(typedForm)
        .subscribe(
          (response: any) => {
            if (response && response.message === 'New password created!') { 
              const email = typedForm.email;
              this.snackbarService.showNotification(
                `Le nouveau mot de passe a bien été envoyé à  ` 
                + email 
                + `,` 
                + `\nveuillez vous connecter en utilisant celui-ci.`
                ,'logIn-logOut'
              );
              this.router.navigate(['login']);
            }
          },
          (_errorResponse) => {
            this.snackbarService.showNotification(
              `Une erreur s'est produite lors de la création du nouveau mot de passe!`
              ,'red-alert'
            );
          }
        )
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
    // Check control exists (not null) and there are validation errors.
    if (control?.errors) {
      if (inputName === 'email') {
        if (control.errors['required']) {
          return 'Veuillez saisir un email!';
        }
        if (control.errors['email']) {
          return 'Format d\'email invalide!';
        }
        if (control.errors['validEmail']) {
          return 'L\'email doit contenir un "." + nom de domaine!';
        }
      }
    }
    return '';
  }

  // Manage changes in form
  private handleFormChanges(): void {
    this.invalidEmail = false;
    // Check if email field is empty
    this.isEmailEmpty = this.form.get('email')?.value === '';
    // Disable reset button based on empty fields
    this.resetDisabled = this.isEmailEmpty;
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
  }

  // Unsubscribe subscriptions
  private unsubscribeAll(): void {
    if (this.forgottenPasswordSubscription) {
      this.forgottenPasswordSubscription.unsubscribe();
    }
  }

}
