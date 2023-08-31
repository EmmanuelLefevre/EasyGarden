import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class FormErrorMessageService {

  getErrorMessage(inputName: string, errorName: string, errorValue?: any): string {
    // Email
    if (inputName === 'email') {
      if (errorName === 'required') {
        return 'Veuillez saisir un email!';
      }
      if (errorName === 'email') {
        return 'Format d\'email invalide!';
      }
      if (errorName === 'validEmail') {
        return 'L\'email doit contenir un "." + nom de domaine!';
      }
    } 
    // Password
    else if (inputName === 'password') {
      if (errorName === 'required') {
        return 'Veuillez saisir un mot de passe!';
      }
      if (errorName === 'minlength') {
        return 'Le mot de passe doit contenir 8 caractères minimum.';
      }
      if (errorName === 'maxlength') {
        return 'Le mot de passe ne peut excéder 50 caractères.';
      }
      if (errorName === 'strongPassword') {
        return this.getStrongPasswordErrorMessage(errorValue);
      }
    }
    // Confirm password
    else if (inputName === 'confirmPassword') {
      if (errorName === 'required') {
        return 'Veuillez confirmer le mot de passe!';
      }
      if (errorName === 'passwordMismatch') {
        return 'Le mot de passe n\'est pas identique!';
      }
    }
    // Lastname / Firstname
    else if (inputName === 'lastName' || inputName === 'firstName') {
      const fieldName = inputName === 'lastName' ? 'nom' : 'prénom';
      return this.getNameErrorMessage(fieldName, errorName);
    }
    // Pseudo
    else if (inputName === 'pseudo') {
      if (errorName === 'required') {
        return 'Pseudo requis!';
      }
      if (errorName === 'minlength') {
        return 'Le pseudo doit contenir 3 caractères minimum.';
      }
      if (errorName === 'maxlength') {
        return 'Le pseudo ne peut excéder 25 caractères.';
      }
      if (errorName === 'validPseudo') {
        return 'Le pseudo ne peut contenir que des chiffres et lettres!';
      }
    }
    // Phone number
    else if (inputName === 'phoneNumber') {
      if (errorName === 'required') {
        return 'Numéro de téléphone requis!';
      }
      if (errorName === 'minlength') {
        return 'Le numéro de téléphone doit contenir 8 caractères minimum.';
      }
      if (errorName === 'maxlength') {
        return 'Le numéro de téléphone ne peut excéder 20 caractères.';
      }
      if (errorName === 'validPhoneNumber') {
        return 'Format de numéro de téléphone invalide!';
      }
    }
    // Garden select
    else if (inputName === 'garden' && errorName === 'required') {
      return 'Veuillez sélectionner un jardin!';
    }
    // Equipment / Garden name
    else if (inputName === 'name') {
      if (errorName === 'required') {
        return 'Veuillez saisir un nom!';
      }
      if (errorName === 'minlength') {
        return 'Le nom doit contenir 3 caractères minimum.';
      }
      if (errorName === 'maxlength') {
        return 'Le nom ne peut excéder 25 caractères.';
      }
      if (errorName === 'validEquipmentName') {
        return 'Le nom ne peut contenir de caractères spéciaux!';
      }
      if (errorName === 'validName') {
        return 'Le nom ne peut contenir de chiffres ou de caractères spéciaux!';
      }
    }
    return '';
  }

  getInvalidInitialValueErrorMessage(currentName: string, initialValue: string): { isModified: boolean; errorMessage: string } {
    const isModified = currentName !== initialValue;
    let errorMessage = '';
    if (!isModified) {
      errorMessage = 'La valeur est identique à sa valeur initiale!';
    }
    return { isModified, errorMessage };
  }

  private getNameErrorMessage(fieldName: string, errorName: string): string {
    const fieldNameCapitalized = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    if (errorName === 'required') {
      return `${fieldNameCapitalized} requis!`;
    }
    if (errorName === 'minlength') {
      return `Le ${fieldName} doit contenir 3 caractères minimum.`;
    }
    if (errorName === 'maxlength') {
      return `Le ${fieldName} ne peut excéder 25 caractères.`;
    }
    if (errorName === 'validName') {
      return `Le ${fieldName} ne peut contenir que des lettres, seuls le tiret et l'espace sont acceptés!`;
    }
    return '';
  }

  private getStrongPasswordErrorMessage(errors: any): string {
    if (errors.missingUpperCase) {
      return 'Le mot de passe doit contenir une majuscule.';
    }
    if (errors.missingLowerCase) {
      return 'Le mot de passe doit contenir une minuscule.';
    }
    if (errors.missingNumber) {
      return 'Le mot de passe doit contenir un nombre.';
    }
    if (errors.missingSpecialChar) {
      return 'Le mot de passe doit contenir un caractère spécial.';
    }
    return '';
  }

}
