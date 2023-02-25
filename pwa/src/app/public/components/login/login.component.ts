import { Component, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { Router } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';

import { AuthService } from '../../../_services/auth/auth.service';
import { FormValidationService } from '../../../_services/service/form-validation.service';
import { TokenService } from '../../../_services/auth/token.service';
import { DecodedTokenService } from 'src/app/_services/service/decoded-token.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { ICredentials } from '../../../_interfaces/ICredentials';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent {

  faCircleXmark = faCircleXmark;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  name = environment.application.name;

  // Toggle faEyeSlash
  visible: boolean = false;
  public toggle(): void {
    this.visible = !this.visible;
  }

  // loginForm Group
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

  constructor(private router: Router,
              private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private authService: AuthService,
              private tokenService: TokenService,
              private snackbarService: SnackbarService,
              private decodedTokenService: DecodedTokenService) {}

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    
    const typedLoginForm: ICredentials = this.loginForm.value;
    this.authService.logIn(typedLoginForm).subscribe(
      data => {
        this.tokenService.saveToken(data.token)
        this.router.navigate(['easygarden'])
        this.snackbarService.showNotification(`Bonjour ${this.decodedTokenService.firstNameDecoded()} 
                                              ${this.decodedTokenService.lastNameDecoded()}.`, 'logIn-logOut')
      }
    )
  }

  onReset(): void {
    this.loginForm.reset();
  }

}
