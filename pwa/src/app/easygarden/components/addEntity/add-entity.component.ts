import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
import { GardenService } from '../garden/garden.service';
import { LawnmowerService } from '../../modules/lawnmower/lawnmower.service';
import { LightningService } from '../../modules/lightning/lightning.service';
import { PoolService } from '../../modules/pool/pool.service';
import { PortalService } from '../../modules/portal/portal.service';
import { WateringService } from '../../modules/watering/watering.service';

import { IAdd } from '../../_interfaces/IAdd';
import { IGarden } from '../garden/IGarden';


@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AddEntityComponent implements OnInit {

  name = environment.application.name;

  currentUrl!: string;

  // addWateringForm Group
  addForm = this.formBuilder.group({
    name:[
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()
      ]
    ],
    garden:
      this.formBuilder.control<IGarden | null>(null, Validators.required)
  })

  gardens: IGarden[] = [];
  IAdd!: IAdd;

  constructor(private formBuilder: NonNullableFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,            
              private gardenService: GardenService,          
              private lawnmowerService: LawnmowerService,          
              private lightningService: LightningService,            
              private poolService: PoolService,            
              private portalService: PortalService,
              private wateringService: WateringService,
              private snackbarService: SnackbarService) { 
    this.gardenService.getAllGardens().subscribe(
      (res:any) => {
        if (res.hasOwnProperty('hydra:member')) 
        this.gardens = res['hydra:member'];
        if (this.gardens.length < 2) {
          this.addForm.controls.garden.setValue(this.gardens[0]);
        }
      }
    )
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }

  // Submit button
  onSubmit() {
    if (!this.addForm.valid) {
      return;
    }

    const formValue: IAdd = this.addForm.getRawValue();
    const url = window.location.href;
    let service: any;
    let gardenCase: string;

    if (url.includes('/easygarden/garden/add')) {
      service = this.gardenService;
      gardenCase = `Le jardin`;
    } 
    else if (url.includes('/easygarden/lawnmower/add')) {
      service = this.lawnmowerService;
    } 
    else if (url.includes('/easygarden/lightning/add')) {
      service = this.lightningService;
    }
    else if (url.includes('/easygarden/pool/add')) {
      service = this.poolService;
    } 
    else if (url.includes('/easygarden/portal/add')) {
      service = this.portalService;
    } 
    else if (url.includes('/easygarden/watering/add')) {
      service = this.wateringService;
    }

    if (service) {
      service.addData(formValue).subscribe(() => {
        const equipment = url.includes('/easygarden/garden/add') ? gardenCase : "L'équipement";
        const gardenName = formValue.garden?.name;
        let notificationMessage = `${equipment} "${formValue.name}" a bien été ajouté.`;
        if (gardenName && equipment !== gardenCase) {
          notificationMessage = `${equipment} "${formValue.name}" a bien été ajouté au jardin "${gardenName}".`;
        }
        this.router.navigate([service.getRedirectUrl()]);
        this.snackbarService.showNotification(notificationMessage, 'created');
      });
    }
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.addForm.reset();
    formDirective.resetForm();
  }

}
