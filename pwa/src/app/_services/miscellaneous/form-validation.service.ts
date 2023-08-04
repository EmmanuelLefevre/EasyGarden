import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

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
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value == '') return null;

      let re = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[:;.~µ!?§@#$%^&*])[A-Za-z\d:;.~µ!?§@#$%^&*].{7,51}');
      if (re.test(control.value)) {
        return null;
      } else {
        return { strongPassword: true };
      }
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

      let re = new RegExp('[- +()0-9]{8,12}');
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

      let re = new RegExp('^([a-zA-Z- ]){3,20}$');
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

      let re = new RegExp('^([0-9a-zA-Z- ]){3,10}$');
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

      let re = new RegExp('^([0-9a-zA-Z- ])*');
      if (re.test(control.value)) {
        return null;
      } else {
        return { validEquipmentName: true };
      }
    };
  }

}
