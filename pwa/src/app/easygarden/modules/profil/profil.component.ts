import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip-social in style.scss
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';

import { MatDialog } from '@angular/material/dialog';
import { IConfirmDialog, ConfirmDialogComponent } from 'src/app/easygarden/components/confirmDialog/confirm-dialog.component';

import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { ProfilService } from './profil.service';
import { TokenService } from '../../../_services/auth/token.service';

import { IUser } from '../../../_interfaces/IUser';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProfilComponent implements OnInit, OnDestroy {

  title = 'Paramètres du compte';
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  // Declaration of subscriptions
  private getUserSubscription!: Subscription;
  private updateUserSubscription!: Subscription;
  private deleteUserSubscription!: Subscription;
  private dialogRefSubscription!: Subscription;
  // Private Subject to handle component destruction
  private destroy$ = new Subject<void>();

  // Toggle faEyeSlash
  visible: boolean = false;
  public toggle(): void {
    this.visible = !this.visible;
  }

  // Confirm Dialog this.result = boolean
  result: boolean | undefined;

  // Profil FormGroup
  emailForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });
  lastNameForm = new UntypedFormGroup({
    lastName: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });
  firstNameForm = new UntypedFormGroup({
    firstName: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });
  pseudoForm = new UntypedFormGroup({
    pseudo: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });
  phoneNumberForm = new UntypedFormGroup({
    phoneNumber: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  });
  submitted = false;
  success = '';

  users: IUser[] = [];

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private profilService: ProfilService,
              private tokenService: TokenService,
              private dialog: MatDialog) {
    window.scrollTo(0, 0)
    this.emailForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.customValidator.validEmail()
        ]
      ],
      password: ['', [Validators.required]]
    });
    this.lastNameForm = this.formBuilder.group({
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          this.customValidator.validName()
        ]
      ],
      password: ['', [Validators.required]]
    });
    this.firstNameForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          this.customValidator.validName()
        ]
      ],
      password: ['', [Validators.required]]
    });
    this.pseudoForm = this.formBuilder.group({
      pseudo: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.customValidator.validPseudo()
        ]
      ],
      password: ['', [Validators.required]]
    });
    this.phoneNumberForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          this.customValidator.validPhoneNumber()
        ]
      ],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchUser()
  }

  ngOnDestroy(): void {
    // Destroy Subject
    this.destroy$.next();
    this.destroy$.complete();
    // Clean up subscriptions
    this.unsubscribeAll();
  }

  // Display User Informations
  fetchUser(): void {
    this.getUserSubscription = this.profilService.getUser()
      // Use takeUntil to automatically unsubscribe
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member'))
          this.users = res['hydra:member'];
        }
      )
  }

  // Form AbstractControl
  get email(): { [key: string]: AbstractControl } {
    return this.emailForm.controls;
  }
  get lastName(): { [key: string]: AbstractControl } {
    return this.lastNameForm.controls;
  }
  get firstName(): { [key: string]: AbstractControl } {
    return this.firstNameForm.controls;
  }
  get pseudo(): { [key: string]: AbstractControl } {
    return this.pseudoForm.controls;
  }
  get phoneNumber(): { [key: string]: AbstractControl } {
    return this.phoneNumberForm.controls;
  }

  // Email Input
  public emailValue = false;
  emailInput(){
    this.emailValue = !this.emailValue;
  }
  emailInputClosed(_onClosed: boolean) {
    this.emailValue = false;
    this.submitted = false;
    this.emailForm.reset();
  }
  // Lastname Input
  public lastNameValue = false;
  lastNameInput(){
    this.lastNameValue = !this.lastNameValue;
  }
  lastNameInputClosed(_onClosed: boolean) {
    this.lastNameValue = false;
    this.submitted = false;
    this.lastNameForm.reset();
  }
  // Firstname Input
  public firstNameValue = false;
  firstNameInput(){
    this.firstNameValue = !this.firstNameValue;
  }
  firstNameInputClosed(_onClosed: boolean) {
    this.firstNameValue = false;
    this.submitted = false;
    this.firstNameForm.reset();
  }
  // Pseudo Input
  public pseudoValue = false;
  pseudoInput(){
    this.pseudoValue = !this.pseudoValue;
  }
  pseudoInputClosed(_onClosed: boolean) {
    this.pseudoValue = false;
    this.submitted = false;
    this.pseudoForm.reset();
  }  
  // PhoneNumber Input
  public phoneNumberValue = false;
  phoneNumberInput(){
    this.phoneNumberValue = !this.phoneNumberValue;
  }
  phoneNumberInputClosed(_onClosed: boolean) {
    this.phoneNumberValue = false;
    this.submitted = false;
    this.phoneNumberForm.reset();
  }

  // Email
  emailSubmit(id: number): void {
    this.submitted = true;
    if (this.emailForm.invalid) {
      return;
    }
    const message = 'Vous allez être redirigé vers l\'accueil afin de vous authentifier de nouveau.';
    const dialogData = new IConfirmDialog("Confirmer l'action!", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    })
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.result = dialogResult;
        if (this.result === true) {
          const typedEmailForm: IUser = this.emailForm.value;
          this.success = JSON.stringify(typedEmailForm);
          this.updateUserSubscription = this.profilService.updateUser(typedEmailForm, id)
            .subscribe(
              () => {
                this.tokenService.clearToken()
              }
            )
        }   
      })
  }
  // LastName
  lastNameSubmit(id: number): void {
    this.submitted = true;
    if (this.lastNameForm.invalid) {
      return;
    }
    const typedLastNameForm: IUser = this.lastNameForm.value;
    this.success = JSON.stringify(typedLastNameForm);
    this.updateUserSubscription = this.profilService.updateUser(typedLastNameForm, id)
      .subscribe(
        () => {}
      )
  }  
  // FirstName
  firstNameSubmit(id: number): void {
    this.submitted = true;
    if (this.firstNameForm.invalid) {
      return;
    }
    const typedFirstNameForm: IUser = this.firstNameForm.value;
    this.success = JSON.stringify(typedFirstNameForm);
    this.updateUserSubscription = this.profilService.updateUser(typedFirstNameForm, id)
      .subscribe(
        () => {}
      )
  }  
  // Pseudo
  pseudoSubmit(id: number): void {
    this.submitted = true;
    if (this.pseudoForm.invalid) {
      return;
    }
    const typedPseudoForm: IUser = this.pseudoForm.value;
    this.success = JSON.stringify(typedPseudoForm);
    this.updateUserSubscription = this.profilService.updateUser(typedPseudoForm, id)
      .subscribe(
        () => {}
      )
  }  
  // Phone Number
  phoneNumberSubmit(id: number): void {
    this.submitted = true;
    if (this.phoneNumberForm.invalid) {
      return;
    }
    const typedPhoneNumbeForm: IUser = this.phoneNumberForm.value;
    this.success = JSON.stringify(typedPhoneNumbeForm);
    this.updateUserSubscription = this.profilService.updateUser(typedPhoneNumbeForm, id)
      .subscribe(
        () => {}
      )
  }

  // Delete Account
  confirmDialog(id: number, firstName: string): void {
    const message = `Êtes-vous certain de vouloir supprimer votre compte ${firstName}? 
      Ceci entraînera la suppression de tous les jardins et leurs équipements associés.`;
    const dialogData = new IConfirmDialog("Confirmer l'action!", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    })
    
    this.dialogRefSubscription = dialogRef.afterClosed()
      .subscribe(dialogResult => {
        this.result = dialogResult;
        if (this.result === true) {
          this.deleteUserSubscription = this.profilService.deleteUser(id)
            .subscribe(
              () => {
                this.tokenService.clearToken()
              }
            )
        }   
      })
  }

  private unsubscribeAll(): void {
    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }
    if (this.updateUserSubscription) {
      this.updateUserSubscription.unsubscribe();
    }
    if (this.deleteUserSubscription) {
      this.deleteUserSubscription.unsubscribe();
    }
    if (this.dialogRefSubscription) {
      this.dialogRefSubscription.unsubscribe();
    }
  }

}
