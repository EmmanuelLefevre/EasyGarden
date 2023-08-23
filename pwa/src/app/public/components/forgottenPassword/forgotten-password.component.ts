import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { UntypedFormBuilder, Validators } from '@angular/forms';
// Environment
import { environment } from '../../../../environments/environment';
// Services
import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';


@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})


export class ForgottenPasswordComponent implements OnDestroy, OnInit {

  name = environment.application.name;

   // Buttons
   resetDisabled: boolean;
   submitDisabled: boolean;
   isEmailEmpty!: boolean;
   isPasswordEmpty!: boolean;
 
   // Form alerts
   falsePasswordErrorMessage: string = '';
   invalidCredentials: boolean = false;
   invalidPassword: boolean = false;
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
     password: ['', [Validators.required]]
   })
  

  constructor() { 
    this.resetDisabled = true;
    this.submitDisabled = true;
  }

  ngOnInit() {
    // Subscribe to form control input changes
    // this.loginFormSubscription = this.form.valueChanges
    // .subscribe(() => {
    //   this.handleFormChanges();
    // });
  }

  ngOnDestroy() {
    // Clean up subscriptions
  }

  // Submit form
  onSubmit() {
    // Handle changes to the form before submitting it
    // this.handleFormChanges();
    // if (this.form.invalid) {
    //   return;
    // } 
    // else {
    // }
  }

}
