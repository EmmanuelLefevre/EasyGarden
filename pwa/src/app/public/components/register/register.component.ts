import { Component, OnDestroy, ViewEncapsulation} from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
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

export class RegisterComponent implements OnDestroy {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  name = environment.application.name;

  // Declaration of subscriptions
  private registerSubscription!: Subscription;

  // Check if email exist
  existingEmail: boolean = false;
  errorMessage: string = '';

  // Toggle faEyeSlash
  visible: boolean = false;
  public toggle(): void {
    this.visible = !this.visible;
  }

  // RegisterForm Group
  registerForm = this.formBuilder.group({
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
        Validators.maxLength(40),
        this.customValidator.strongPassword()
      ]
    ],
    confirmPassword: ['', [Validators.required]],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validName()
      ]
    ],
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validName()
      ]
    ],
    pseudo: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validPseudo()
      ]
    ],
    phoneNumber: [
      '',
      [
        Validators.required,
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
              private snackbarService: SnackbarService) {}

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.unsubscribeAll();
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  // Submit
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    else {
      const formValue: IUser = this.registerForm.getRawValue();
      delete formValue.confirmPassword;
      this.registerSubscription = this.registerService.registerIn(formValue)
        .subscribe(
          (response: any) => { 
            if (response 
                && response.message === 'Created Account!'
                && response.status === 201) { 
              const firstName = formValue.firstName;
              const lastName = formValue.lastName;
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
              this.errorMessage = "Un utilisateur possédant cet email est déjà enregistré!";
            } 
            else {
              this.existingEmail = false;
              this.errorMessage = "Une erreur s'est produite lors de la création du compte!";
            }
          }
        )
    }

  }

  onReset(formDirective: any): void {
    this.registerForm.reset();
    formDirective.resetForm();
  }

  private unsubscribeAll(): void {
    if (this.registerSubscription) { 
      this.registerSubscription.unsubscribe();
    }
  }

}
