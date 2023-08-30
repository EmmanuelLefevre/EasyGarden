import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  private updateDataFormSubscription!: Subscription;
  // Private Subject to handle component destruction
  private destroy$ = new Subject<void>();

  // Buttons
  resetDisabled: boolean;
  submitDisabled: boolean;
  isNameEmpty!: boolean;

  // Form alerts
  invalidName: boolean = false;
  // Form group
  submittedForm: boolean  = false;
  form = this.formBuilder.group({
    name:
      [
        null as IName | null,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        this.customValidator.validEquipmentName()]
      ],
      nonNullable: true
  });

  value = '';
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
              private snackbarService: SnackbarService,          
              private wateringService: WateringService,) {

    const id = Number(this.activated.snapshot.paramMap.get('id'));
    // Get entire url
    const url = window.location.href;
    
    let service: any;
    let type: string = '';

    if (url.includes('/easygarden/garden/edit/')) {
      type = 'garden';
    } else if (url.includes('/easygarden/lawnmower/edit/')) {
      type = 'lawnmower';
    } else if (url.includes('/easygarden/lightning/edit/')) {
      type = 'lightning';
    } else if (url.includes('/easygarden/pool/edit/')) {
      type = 'pool';
    } else if (url.includes('/easygarden/portal/edit/')) {
      type = 'portal';
    } else if (url.includes('/easygarden/watering/edit/')) {
      type = 'watering';
    }

    switch (type) {
      case 'garden':
        service = this.gardenService;
        break;
      case 'lawnmower':
        service = this.lawnmowerService;
        break;
      case 'lightning':
        service = this.lightningService;
        break;
      case 'pool':
        service = this.poolService;
        break;
      case 'portal':
        service = this.portalService;
        break;
      case 'watering':
        service = this.wateringService;
        break;
      default:
        break;
    }

    if (service) {
      this.getDataSubscription = service.getData(id)
      // Use takeUntil to automatically unsubscribe
      .pipe(takeUntil(this.destroy$))
        .subscribe((data: IName) => {
          this.IName = data;
          this.value = this.IName.name;
        });
    }

    this.resetDisabled = true;
    this.submitDisabled = true;
  }

  ngOnInit(): void {
    // Subscribe to form control input changes
    this.updateDataFormSubscription = this.form.valueChanges
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
      const typedForm: IName = this.form.getRawValue();
      const id = Number(this.activated.snapshot.paramMap.get('id'));
      const url = window.location.href;
      let equipmentString: string;
      let gardenCase: string;
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
        gardenCase = matchedCase.string;
    
        this.updateDataSubscription = service.updateData(typedForm, id).subscribe(() => {
          const newName = typedForm.name;
          const redirectUrl = service.getRedirectUrl();
          // Garden case
          if (gardenCase) {
            if (redirectUrl === null) {
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => { 
                this.router.navigate(['/easygarden']);
              });
            }
            else {
              this.router.navigateByUrl(redirectUrl);
            }
            notificationMessage = `${gardenCase} "${this.IName.name}" a bien été renommé en "${newName}".`;
            this.snackbarService.showNotification(notificationMessage, 'created');
          }
          // Equipments case
          else {
            this.router.navigate([service.getRedirectUrl()]);
            notificationMessage = `${equipmentString} "${equipmentString} "${this.IName.name}" a bien été renommé en "${newName}".`;
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
    this.invalidName = false;
    // Check if name field is empty
    this.isNameEmpty = this.form.get('name')?.value === '';
    // Disable reset button based on empty field
    this.resetDisabled = this.isNameEmpty;
    // Disable submit button if form is invalid
    this.submitDisabled = !this.form.valid;
  }

  private unsubscribeAll(): void {
    this.getDataSubscription.unsubscribe();
    if (this.updateDataSubscription) {
      this.updateDataSubscription.unsubscribe();
    }
    if (this.updateDataFormSubscription) {
      this.updateDataFormSubscription.unsubscribe();
    }
  }

}
