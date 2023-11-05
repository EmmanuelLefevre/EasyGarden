import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

// Modele
import { IPasswordErrors } from './../../_interfaces/IPasswordErrors';


@Injectable({
  providedIn: 'root'
})

export class FormValidationService {

  passwordMatch(password: string, confirmPassword: string):ValidatorFn {
    return (formGroup: AbstractControl):{ [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true }
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  strongPassword(): ValidatorFn {
    return (control: AbstractControl): IPasswordErrors | null => {
      if (control.value == '') return null;

      const hasUpperCase = /[A-Z]/.test(control.value);
      const hasLowerCase = /[a-z]/.test(control.value);
      const hasNumber = /[0-9]/.test(control.value);
      const hasSpecialChar = /[:;.~µ!?§@#$%^&*]/.test(control.value);

      const errors: IPasswordErrors = {};

      if (!hasUpperCase) {
        errors.strongPassword = {
          ...errors.strongPassword,
          missingUpperCase: true
        };
      }
      if (!hasLowerCase) {
        errors.strongPassword = {
          ...errors.strongPassword,
          missingLowerCase: true
        };
      }
      if (!hasNumber) {
        errors.strongPassword = {
          ...errors.strongPassword,
          missingNumber: true
        };
      }
      if (!hasSpecialChar) {
        errors.strongPassword = {
          ...errors.strongPassword,
          missingSpecialChar: true
        };
      }

      return errors.strongPassword ? { strongPassword: errors.strongPassword } : null;
    };
  }

  validEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');
      if (re.test(control.value)) {
        return null;
      } else {
        return { validEmail: true };
      }
    };
  }

  validPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('[- +()0-9]{8,20}');
      if (re.test(control.value)) {
        return null;
      } else {
        return { validPhoneNumber: true };
      }
    };
  }

  validName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^([a-zA-Zéèàù -]){3,25}$');
      if (re.test(control.value)) {
        return null;
      } else {
        return { validName: true };
      }
    };
  }

  validPseudo(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^([0-9a-zA-Zéèàù -]){3,25}$');
      if (re.test(control.value)) {
        return null;
      } else {
        return { validPseudo: true };
      }
    };
  }

  validEquipmentName(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('^([a-zA-Z0-9éèàù ()-]){3,25}$');
      if (re.test(control.value)) {
        return null;
      } else {
        return { validEquipmentName: true };
      }
    };
  }

}
