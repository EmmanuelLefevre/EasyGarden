import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// RXJS
import { Subject, Subscription } from 'rxjs';
// Environment
import { environment } from 'src/environments/environment';
// Services
import { FormErrorMessageService } from 'src/app/_services/miscellaneous/form-error-message.service';
import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { GardenService } from '../garden/garden.service';
import { LawnmowerService } from '../../modules/lawnmower/lawnmower.service';
import { LightningService } from '../../modules/lightning/lightning.service';
import { PoolService } from '../../modules/pool/pool.service';
import { PortalService } from '../../modules/portal/portal.service';
import { SharedFormInputValueService } from '../../_services/shared-form-input-value.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
import { WateringService } from '../../modules/watering/watering.service';
// Modeles
import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-edit-entity-name',
  templateUrl: './edit-entity-name.component.html',
  styleUrls: ['./edit-entity-name.component.scss']
})

export class EditEntityNameComponent implements OnDestroy, OnInit {

  name = environment.application.name;

  // Declaration of subscriptions
  private getDataSubscription: Subscription = new Subscription();
  private updateDataSubscription!: Subscription;
  private inputChangesSubscription!: Subscription;
  // Private Subject to handle component destruction
  private destroy$ = new Subject<void>();

  // Buttons
  resetDisabled: boolean;
  submitDisabled: boolean;
  isNameEmpty!: boolean;

  // Get URL
  url = window.location.href;

  // Form alerts
  invalidName: boolean = false;
  invalidInitialValue: boolean = false;
  invalidInitialValueErrorMessage: string = '';
  // Form group
  submittedForm: boolean  = false;
  form = this.formBuilder.group({
    name:
      [
        null as IName | null,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25)]
      ],
      nonNullable: true
  });
  // Input form value
  receivedFieldValue = new FormControl("");

  IName!: IName;

  constructor(private activated: ActivatedRoute,
              private customValidator : FormValidationService,
              private formBuilder: UntypedFormBuilder,
              private formErrorMessageService: FormErrorMessageService,
              private gardenService: GardenService,
              private lawnmowerService: LawnmowerService,
              private lightningService: LightningService,
              private poolService: PoolService,
              private portalService: PortalService,
              private router: Router,
              private sharedFormInputValueService: SharedFormInputValueService,
              private snackbarService: SnackbarService,
              private wateringService: WateringService) {

    this.resetDisabled = true;
    this.submitDisabled = true;
  }

  ngOnInit(): void {
    // Subscribe to form control input changes
    this.inputChangesSubscription = this.form.valueChanges
      .subscribe(() => {
        this.handleFormChanges();
        this.checkIfInputValueHasChanged();
      });
    // Add the appropriate custom validator based on the route
    if (this.url.includes('/easygarden/garden/edit/')) {
      this.form.get('name')?.addValidators([
        this.customValidator.validName()
      ]);
    } else {
      this.form.get('name')?.addValidators([
        this.customValidator.validEquipmentName()
      ]);
    }
    // Fill input value
    this.sharedFormInputValueService.getFieldValue().subscribe((value$) => {
      this.receivedFieldValue.setValue(value$);
      this.form.get('name')?.setValue(value$);
    });
  }

  ngOnDestroy(): void {
    // Destroy Subject
    this.destroy$.next();
    this.destroy$.complete();
    // Clean up subscriptions
    this.unsubscribeAll();
  }

  // Submit form
  onSubmit() {
    // Handle changes to the form before submitting it
    this.handleFormChanges();
    if (!this.form.valid) {
      return;
    }
    else {
      const typedForm: IName = this.form.getRawValue();
      const id = Number(this.activated.snapshot.paramMap.get('id'));
      const url = window.location.href;
      let equipmentString: string;
      let notificationMessage: string;
      let service: any;

      const cases = [
        { urlPart: '/easygarden/garden/edit/', service: this.gardenService, string: `Le jardin` },
        { urlPart: '/easygarden/lawnmower/edit/', service: this.lawnmowerService, string: `La tondeuse` },
        { urlPart: '/easygarden/lightning/edit/', service: this.lightningService, string: `L'éclairage` },
        { urlPart: '/easygarden/pool/edit/', service: this.poolService, string: `L'équipement de bassin` },
        { urlPart: '/easygarden/portal/edit/', service: this.portalService, string: `Le portail` },
        { urlPart: '/easygarden/watering/edit/', service: this.wateringService, string: `L'arrosage` }
      ];

      const matchedCase = cases.find(item => url.includes(item.urlPart));

      if (matchedCase) {
        service = matchedCase.service;
        equipmentString = matchedCase.string;

        this.updateDataSubscription = service.updateData(typedForm, id).subscribe(() => {
          const newName = typedForm.name;
          const redirectUrl = service.getRedirectUrl();
          // Garden case
          if (url.includes('/easygarden/garden/edit')) {
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['/easygarden']);
            });
            notificationMessage = `${equipmentString} "${this.IName.name}" a été renommé en "${newName}".`;
            this.snackbarService.showNotification(notificationMessage, 'modified');
          }
          // Equipments case
          else {
            notificationMessage = `${equipmentString} "${typedForm.name}" a été renommé`;
            switch (true) {
              case url.includes('/easygarden/lawnmower/edit/'):
                notificationMessage += `e`;
                break;
              default:
                break;
            }
            notificationMessage += ` en "${newName}".`;
            this.router.navigate([redirectUrl]);
            this.snackbarService.showNotification(notificationMessage, 'modified');
          }
        });
      }
      else {
        this.snackbarService.showNotification(
          `Une erreur s'est produite!`,
          'red-alert'
        );
        this.submitDisabled = false;
      }
    }
  }

  // Reset form
  onReset(formDirective: any): void {
    this.form.reset();
    formDirective.resetForm();
    this.handleFormChanges();
    this.resetDisabled = true;
  }

  // Get the error message associated with a specific form field
  getErrorMessage(inputName: string): string {
    const control = this.form.get(inputName);
    const errorKey = control?.errors && Object.keys(control.errors)[0];
    return errorKey ? this.formErrorMessageService.getErrorMessage(inputName, errorKey) : '';
  }

  // Manage changes in form
  private handleFormChanges(): void {
    this.invalidName = false;
    this.invalidInitialValue = false;
    // Check if name field is empty
    this.isNameEmpty = this.form.get('name')?.value === '';
    // Disable reset button based on empty field
    this.resetDisabled = this.isNameEmpty;
    // Disable submit button if form is invalid, value is empty or same to inital value
    this.submitDisabled = !this.form.valid || this.isNameEmpty || this.invalidInitialValue;
  }

  // Check if input value has changed from its initial value
  private checkIfInputValueHasChanged(): void {
    const currentName = this.form.get('name')?.value;
    const value = this.receivedFieldValue.value;
    const { isModified, errorMessage } = this.formErrorMessageService.getInvalidInitialValueErrorMessage(currentName, value);
    this.invalidInitialValue = !isModified;
    this.submitDisabled = this.invalidInitialValue;
    this.invalidInitialValueErrorMessage = errorMessage;
  }

  private unsubscribeAll(): void {
    this.getDataSubscription.unsubscribe();
    if (this.updateDataSubscription) {
      this.updateDataSubscription.unsubscribe();
    }
    if (this.inputChangesSubscription) {
      this.inputChangesSubscription.unsubscribe();
    }
  }

}
