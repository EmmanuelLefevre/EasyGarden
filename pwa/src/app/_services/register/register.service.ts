import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { IUser } from '../../_interfaces/IUser';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  registerIn(user: IUser) {
    const profile = {
      email: user.email,
      plainPassword: user.password,
      pseudo: user.pseudo,
      lastName: user.lastName,
      firstName: user.firstName,
      phoneNumber: user.phoneNumber
    };
    return this.httpClient.post(environment.apis.register.url, profile)
  }

  // Method to catch error message if email already existing
  extractExistingEmailErrorMessage(errorDescription: string): string {
    const errorMessagePrefix = 'email: ';
    const errorMessageIndex = errorDescription.indexOf(errorMessagePrefix);
    if (errorMessageIndex !== -1) {
      return errorDescription.substring(errorMessageIndex + errorMessagePrefix.length).trim();
    }
    return '';
  }

}
