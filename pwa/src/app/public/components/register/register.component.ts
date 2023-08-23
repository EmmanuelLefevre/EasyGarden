import { Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { Router } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// Environment
import { environment } from '../../../../environments/environment';
// Icons
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// Services
import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { RegisterService } from 'src/app/_services/register/register.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
// Modeles
import { IUser } from '../../../_interfaces/IUser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RegisterComponent implements OnDestroy, OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  name = environment.application.name;

  // Declaration of subscriptions
  private registerSubscription!: Subscription;
  private registerFormSubscription!: Subscription;

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
  isPlainPasswordEmpty!: boolean;
  isLastNameEmpty!: boolean;
  isFirstNameEmpty!: boolean;
  isPseudoEmpty!: boolean
  isPhoneNumberEmpty!: boolean;

  // Form alerts
  existingEmailErrorMessage: string = '';
  existingEmail: boolean = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;
  invalidPlainPassword: boolean = false;
  invalidLastName: boolean = false;
  invalidFirstName: boolean = false;
  invalidPseudo: boolean = false;
  invalidPhoneNumber: boolean = false;
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
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50),
        this.customValidator.strongPassword()
      ]
    ],
    confirmPassword: ['', [Validators.required]],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        this.customValidator.validName()
      ]
    ],
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        this.customValidator.validName()
      ]
    ],
    pseudo: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        this.customValidator.validPseudo()
      ]
    ],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        this.customValidator.validPhoneNumber()
      ]
    ],
  },
  {
    validators: [this.customValidator.passwordMatch("password", "confirmPassword")],
  });
  
  constructor(private customValidator : FormValidationService,
              private formBuilder: UntypedFormBuilder,
              private registerService: RegisterService,
              private router: Router,
              private snackbarService: SnackbarService) {

    this.resetDisabled = true;
    this.submitDisabled = true;
  }

  ngOnInit(): void {
    // Subscribe to form control input changes
    this.registerFormSubscription = this.form.valueChanges
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
      const typedForm: IUser = this.form.value;
      delete typedForm.confirmPassword;
      this.registerSubscription = this.registerService.registerIn(typedForm)
        .subscribe(
          (response: any) => { 
            if (response && response.message === 'Created Account!') { 
              const firstName = typedForm.firstName;
              const lastName = typedForm.lastName;
              this.snackbarService.showNotification(
                `Bienvenu ` 
                + firstName 
                + ` ` 
                + lastName 
                + `,` 
                + `\nveuillez confirmer votre compte dans l\'email qui vous a été envoyé.`
                ,'register'
              );
              this.router.navigate(['login'])
            }
          },
          (errorResponse) => {
            if (errorResponse.error 
                && errorResponse.error.message === "Email already exists" 
                && errorResponse.status === 409) {
              this.existingEmail = true;
              this.existingEmailErrorMessage = "Un utilisateur possédant cet email est déjà enregistré!";
            } 
            else {
              this.snackbarService.showNotification(
                `Une erreur s'est produite lors de la création du compte!`
                ,'red-alert'
              );
            }
          }
        )
    }
    this.submittedForm = true;
    this.submitDisabled = true;
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
      else if (inputName === 'password') {
        if (control.errors['required']) {
          return 'Veuillez saisir un mot de passe!';
        }
        if (control.errors['minlength']) {
          return 'Le mot de passe doit contenir 8 caractères minimum.';
        }
        if (control.errors['maxlength']) {
          return 'Le mot de passe ne peut excéder 50 caractères.';
        }
        if (control.errors['strongPassword']) {
          const strongPasswordErrors = control.errors['strongPassword'];
          if (strongPasswordErrors['missingUpperCase']) {
            return 'Le mot de passe doit contenir une majuscule.';
          }
          if (strongPasswordErrors['missingLowerCase']) {
            return 'Le mot de passe doit contenir une minuscule.';
          }
          if (strongPasswordErrors['missingNumber']) {
            return 'Le mot de passe doit contenir un nombre.';
          }
          if (strongPasswordErrors['missingSpecialChar']) {
            return 'Le mot de passe doit contenir un caractère spécial.';
          }
        }
      }
      else if (inputName === 'confirmPassword') {
        if (control.errors['required']) {
          return 'Veuillez confirmer le mot de passe!';
        }
        if (control.errors['passwordMismatch']) {
          return 'Le mot de passe n\'est pas identique!';
        }
      }
      else if (inputName === 'lastName') {
        if (control.errors['required']) {
          return 'Nom requis!';
        }
        if (control.errors['minlength']) {
          return 'Le nom doit contenir 3 caractères minimum.';
        }
        if (control.errors['maxlength']) {
          return 'Le nom ne peut excéder 25 caractères.';
        }
        if (control.errors['validName']) {
          return 'Le nom ne peut contenir que des lettres, seuls le tiret et l\'espace sont acceptés!';
        }
      }
      else if (inputName === 'firstName') {
        if (control.errors['required']) {
          return 'Prénom requis!';
        }
        if (control.errors['minlength']) {
          return 'Le prénom doit contenir 3 caractères minimum.';
        }
        if (control.errors['maxlength']) {
          return 'Le prénom ne peut excéder 25 caractères.';
        }
        if (control.errors['validName']) {
          return 'Le prénom ne peut contenir que des lettres, seuls le tiret et l\'espace sont acceptés!';
        }
      }
      else if (inputName === 'pseudo') {
        if (control.errors['required']) {
          return 'Pseudo requis!';
        }
        if (control.errors['minlength']) {
          return 'Le pseudo doit contenir 3 caractères minimum.';
        }
        if (control.errors['maxlength']) {
          return 'Le pseudo ne peut excéder 25 caractères.';
        }
        if (control.errors['validName']) {
          return 'Le pseudo ne peut contenir que des chiffres et lettres!';
        }
      }
      else if (inputName === 'phoneNumber') {
        if (control.errors['required']) {
          return 'Numéro de téléphone requis!';
        }
        if (control.errors['minlength']) {
          return 'Le numéro de téléphone doit contenir 8 caractères minimum.';
        }
        if (control.errors['maxlength']) {
          return 'Le numéro de téléphone ne peut excéder 20 caractères.';
        }
        if (control.errors['validPhoneNumber']) {
          return 'Format de numéro de téléphone invalide!';
        }
      }
    }
    return '';
  }

  // Manage changes in form
  private handleFormChanges(): void {
    this.existingEmailErrorMessage = "";
    // Check if input fields are empty
    this.isEmailEmpty = this.form.get('email')?.value === '';
    this.isPasswordEmpty = this.form.get('password')?.value === '';
    this.isPlainPasswordEmpty = this.form.get('password')?.value === '';
    this.isLastNameEmpty = this.form.get('password')?.value === '';
    this.isFirstNameEmpty = this.form.get('password')?.value === '';
    this.isPseudoEmpty = this.form.get('password')?.value === '';
    this.isPhoneNumberEmpty = this.form.get('password')?.value === '';
    // Disable reset button based on empty fields
    this.resetDisabled = this.isEmailEmpty 
                         && this.isPasswordEmpty
                         && this.isPlainPasswordEmpty
                         && this.isLastNameEmpty
                         && this.isFirstNameEmpty
                         && this.isPseudoEmpty
                         && this.isPhoneNumberEmpty;
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

  private unsubscribeAll(): void {
    if (this.registerSubscription) { 
      this.registerSubscription.unsubscribe();
    }
    if (this.registerFormSubscription) {
      this.registerFormSubscription.unsubscribe();
    }
  }

}
