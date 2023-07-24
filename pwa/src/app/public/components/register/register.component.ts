import { Component, ViewEncapsulation} from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';

import { RegisterService } from 'src/app/_services/register/register.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { IUser } from '../../../_interfaces/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RegisterComponent {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  name = environment.application.name;

  // Check if email exist
  existingEmail: boolean = false;
  errorMessage: String = '';

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

  success = '';
  
  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private registerService: RegisterService,
              private snackbarService: SnackbarService,
              private router: Router) {}

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    const formValue: IUser = this.registerForm.getRawValue();
    delete formValue.confirmPassword;
    this.registerService.registerIn(formValue).subscribe(
      (response: any) => { 
        if (response && response.status === 201) { 
          const firstName = formValue.firstName;
          const lastName = formValue.lastName;
          this.snackbarService.showNotification(`Bienvenu ` + firstName + ' ' + lastName + ',' +
            `\nveuillez confirmer votre compte dans l\'email qui vous a été envoyé.`, 'register')
          this.router.navigate(['login'])
        }
      },
      (errorResponse) => {
        if (errorResponse.error['hydra:description']) {
          const errorDescription = errorResponse.error['hydra:description'];
          const errorMessage = this.registerService.extractExistingEmailErrorMessage(errorDescription);
          this.errorMessage = errorMessage;
          this.existingEmail = errorMessage !== '';
        }
        else {
          this.errorMessage = "Une erreur s'est produite lors de la création du compte!";
        }
      }
    )
  }

  onReset(formDirective: any): void {
    this.registerForm.reset();
    formDirective.resetForm();
  }

}
