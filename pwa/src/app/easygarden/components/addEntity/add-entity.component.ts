import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
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
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
import { WateringService } from '../../modules/watering/watering.service';
// Modeles
import { IAdd } from '../../_interfaces/IAdd';
import { IGarden } from '../garden/IGarden';


@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AddEntityComponent implements OnInit, OnDestroy {

  name = environment.application.name;

  // Declaration of subscriptions
  private addDataSubscription!: Subscription;
  private addDataFormSubscription!: Subscription;
  private getAllGardensSubscription: Subscription = new Subscription;
  // Private Subject to handle component destruction
  private destroy$ = new Subject<void>();

  // Current URL
  currentUrl!: string;

  // Buttons
  resetDisabled: boolean;
  submitDisabled: boolean;
  isNameEmpty!: boolean;
  isGardenNotSelect!: boolean;

  // Form alerts
  invalidSelect: boolean = false;
  invalidName: boolean = false;
  // Form group
  submittedForm: boolean  = false;
  form = this.formBuilder.group({
    name:[
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        this.customValidator.validEquipmentName()
      ]
    ],
    garden:
      this.formBuilder.control<IGarden | null>(null, Validators.required)
  })

  gardens: IGarden[] = [];
  IAdd!: IAdd;

  constructor(private customValidator : FormValidationService,
              private formBuilder: NonNullableFormBuilder,
              private formErrorMessageService: FormErrorMessageService,
              private gardenService: GardenService,          
              private lawnmowerService: LawnmowerService,          
              private lightningService: LightningService,            
              private poolService: PoolService,            
              private portalService: PortalService,
              private router: Router,
              private snackbarService: SnackbarService,          
              private wateringService: WateringService,) {

    this.getAllGardensSubscription = this.gardenService.getAllGardens()
    // Use takeUntil to automatically unsubscribe
    .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member')) 
          this.gardens = res['hydra:member'];
          if (this.gardens.length < 2) {
            this.form.controls.garden.setValue(this.gardens[0]);
          }
        }
      );

      this.resetDisabled = true;
      this.submitDisabled = true;
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.updateValidators();
    // Subscribe to form control input changes
    this.addDataFormSubscription = this.form.valueChanges
      .subscribe(() => {
        this.handleFormChanges();
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
      const typedForm: IAdd = this.form.getRawValue();
      const url = window.location.href;
      let service: any;
      let notificationMessage: string;
      let equipmentString: string;

      const cases = [
        { urlPart: '/easygarden/garden/add', service: this.gardenService, string: `Le jardin` },
        { urlPart: '/easygarden/lawnmower/add', service: this.lawnmowerService, string: `La tondeuse` },
        { urlPart: '/easygarden/lightning/add', service: this.lightningService, string: `L'éclairage` },
        { urlPart: '/easygarden/pool/add', service: this.poolService, string: `L'équipement de bassin` },
        { urlPart: '/easygarden/portal/add', service: this.portalService, string: `Le portail` },
        { urlPart: '/easygarden/watering/add', service: this.wateringService, string: `L'arrosage` }
      ];

      const matchedCase = cases.find(item => url.includes(item.urlPart));

      if (matchedCase) {
        service = matchedCase.service;
        equipmentString = matchedCase.string;

        this.addDataSubscription = service.addData(typedForm).subscribe(() => {
          const gardenName = typedForm.garden?.name;
          // Garden case
          if (url.includes('/easygarden/garden/add')) {
            const redirectUrl = service.getRedirectUrl();
            if (redirectUrl === null) {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/easygarden']);
              });
            }
            else {
              this.router.navigateByUrl(redirectUrl);
            }
            notificationMessage = `${equipmentString} "${typedForm.name}" a bien été ajouté.`;
            this.snackbarService.showNotification(notificationMessage, 'created');
          }
          // Equipments case
          else {
            if (gardenName) {
              notificationMessage = `${equipmentString} "${typedForm.name}" a bien été ajouté au jardin "${gardenName}".`;
            }
            this.router.navigate([service.getRedirectUrl()]);
            this.snackbarService.showNotification(notificationMessage, 'created');
          }
        });
      }
      else {
        this.snackbarService.showNotification(
          `Une erreur s'est produite!`,
          'red-alert'
        );
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
    this.invalidSelect = false;
    this.invalidName = false;
    // Check if name field is empty
    this.isNameEmpty = this.form.get('name')?.value === '';
    // Check if garden is select
    const selectedGarden = this.form.get('garden')?.value;
    this.isGardenNotSelect = selectedGarden === null || selectedGarden === undefined;
    // Disable reset button based on empty/not selected fields
    this.resetDisabled = this.isNameEmpty && this.isGardenNotSelect;
    // Disable submit button if form is invalid
    this.submitDisabled = !this.form.valid;
  }

  private updateValidators() {
    const url = this.currentUrl;
    const isAddRoute = url.includes('easygarden/garden/add');
    const gardenValidators = isAddRoute ? [] : [Validators.required];

    this.form.get('garden')?.setValidators(gardenValidators);
    this.form.get('garden')?.updateValueAndValidity();
  }

  private unsubscribeAll(): void {
    this.getAllGardensSubscription.unsubscribe();
    if (this.addDataFormSubscription) {
      this.addDataFormSubscription.unsubscribe();
    }
    if (this.addDataSubscription) {
      this.addDataSubscription.unsubscribe();
    }
  }

}
