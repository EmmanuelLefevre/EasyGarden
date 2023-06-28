import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../_services/miscellaneous/form-validation.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
import { GardenService } from '../garden/garden.service';
import { LawnmowerService } from '../../modules/lawnmower/lawnmower.service';
import { LightningService } from '../../modules/lightning/lightning.service';
import { PoolService } from '../../modules/pool/pool.service';
import { PortalService } from '../../modules/portal/portal.service';
import { WateringService } from '../../modules/watering/watering.service';

import { IName } from '../../_interfaces/IName';


@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  encapsulation: ViewEncapsulation.None
})

export class EditNameComponent implements OnInit {

  name = environment.application.name;

  // EditWateringForm Group
  editName = this.formBuilder.group({
    name:
      [
        null as IName | null,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()]
      ],
      nonNullable: true
  });

  value = '';
  IName!: IName;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private activated: ActivatedRoute,            
              private gardenService: GardenService,          
              private lawnmowerService: LawnmowerService,          
              private lightningService: LightningService,            
              private poolService: PoolService,            
              private portalService: PortalService,
              private wateringService: WateringService,
              private snackbarService: SnackbarService) {

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
      service.getData(id).subscribe((data: IName) => {
        this.IName = data;
        this.value = this.IName.name;
      });
    }

  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.editName.controls;
  }

  // Submit
  onSubmit() {
    if (!this.editName.valid) {
      return;
    }

    const formValue: IName = this.editName.value;
    const id = Number(this.activated.snapshot.paramMap.get('id'));
    const url = window.location.href;
    let service: any;
    let gardenCase: string;

    if (url.includes('/easygarden/garden/edit/')) {
      service = this.gardenService;
      gardenCase = `Le jardin`;
    } 
    else if (url.includes('/easygarden/lawnmower/edit/')) {
      service = this.lawnmowerService;
    } 
    else if (url.includes('/easygarden/lightning/edit/')) {
      service = this.lightningService;
    }
    else if (url.includes('/easygarden/pool/edit/')) {
      service = this.poolService;
    } 
    else if (url.includes('/easygarden/portal/edit/')) {
      service = this.portalService;
    } 
    else if (url.includes('/easygarden/watering/edit/')) {
      service = this.wateringService;
    }
  
    if (service) {
      service.updateData(formValue, id).subscribe(() => {
        const newName = formValue.name;
        const equipment = url.includes('/easygarden/garden/edit/') ? gardenCase : "L'équipement";
        this.router.navigate([service.getRedirectUrl()]);
        this.snackbarService.showNotification(`${equipment} "${this.IName.name}" a bien été renommé en "${newName}".`, 'modified');
      });
    }
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.editName.reset();
    formDirective.resetForm();
  }

}
