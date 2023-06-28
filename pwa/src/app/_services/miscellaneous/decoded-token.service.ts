import { Injectable } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { throwError } from 'rxjs';

import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root'
})

export class DecodedTokenService {

  constructor(private tokenService: TokenService) { }
  
  // userId
  idDecoded() {
    const token = this.tokenService.getToken()
    if (token) {
      type tokenInfoModel = JwtPayload & { id: string }
      jwtDecode<tokenInfoModel>(token, { header: true })
      const object = JSON.parse(atob(token.split('.')[1]))
      const id= object['id']
      return id
    }
    return throwError(() => ('Token not found'))
  }

  // userEmail
  emailDecoded() {
    const token = this.tokenService.getToken()
    if (token) {
      type tokenInfoModel = JwtPayload & { email: string }
      jwtDecode<tokenInfoModel>(token, { header: true })
      const object = JSON.parse(atob(token.split('.')[1]))
      const data = object['email']
      const explode = data.substring(0, data.indexOf('@'))
      const email = explode.charAt(0).toUpperCase() + explode.slice(1)
      return email
    }
    return throwError(() => ('Token not found'))
  }

  // userFirstName
  firstNameDecoded() {
    const token = this.tokenService.getToken()
    if (token) {
      type tokenInfoModel = JwtPayload & { firstName: string }
      jwtDecode<tokenInfoModel>(token, { header: true })
      const object = JSON.parse(atob(token.split('.')[1]))
      const upperFirst = object['firstName']
      const firstName = upperFirst.charAt(0).toUpperCase() + upperFirst.slice(1)
      return firstName
    }
    return throwError(() => ('Token not found'))
  }

  // userLastName
  lastNameDecoded() {
    const token = this.tokenService.getToken()
    if (token) {
      type tokenInfoModel = JwtPayload & { lastName: string }
      jwtDecode<tokenInfoModel>(token, { header: true })
      const object = JSON.parse(atob(token.split('.')[1]))
      const upperFirst = object['lastName']
      const lastName = upperFirst.charAt(0).toUpperCase() + upperFirst.slice(1)
      return lastName
    }
    return throwError(() => ('Token not found'))
  }

}
