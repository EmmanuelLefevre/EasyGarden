import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from 'src/app/easygarden/components/garden/garden.service';
import { PortalService } from '../../portal.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IGarden } from 'src/app/easygarden/components/garden/IGarden';
import { IAddPortal } from '../../IPortal';


@Component({
  selector: 'app-add-portal',
  templateUrl: './add-portal.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AddPortalComponent implements OnInit {

  faCircleXmark = faCircleXmark;
  name = environment.application.name;
  title = "Modifier nom de l'arrosage";

  // addPortalForm Group
  addPortalForm = this.formBuilder.group({
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

  constructor(private formBuilder: NonNullableFormBuilder,
              private customValidator : FormValidationService,
              private router: Router, 
              private location: Location,
              private portalService: PortalService,
              private gardenService: GardenService,
              private snackbarService: SnackbarService) { 
    this.gardenService.getAllGardens()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member')) 
          this.gardens = res['hydra:member'];
          if (this.gardens.length < 2) {
            this.addPortalForm.controls.garden.setValue(this.gardens[0]);
          }
        }
      )
  }
  
  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.addPortalForm.controls;
  }

  // Submit button
  onSubmit() {
    if (!this.addPortalForm.valid) {
      return;
    }

    const formValue: IAddPortal = this.addPortalForm.getRawValue();
    this.portalService.addPortal(formValue).subscribe(
      () => {
        const portalName = formValue.name;
        this.router.navigate(['/easygarden/portal']);
        this.snackbarService.showNotification(`Le portail "${portalName}" a bien 
          été ajouté au jardin de ${formValue.garden?.name}.`, 'created');
      }
    )
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.addPortalForm.reset();
    formDirective.resetForm();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
