import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from 'src/app/easygarden/components/garden/garden.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';
import { WateringService } from '../../watering.service';

import { IGarden } from 'src/app/easygarden/components/garden/IGarden';
import { IAddWatering } from '../../IWatering';


@Component({
  selector: 'app-add-watering',
  templateUrl: './add-watering.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AddWateringComponent implements OnInit {

  faCircleXmark = faCircleXmark;
  name = environment.application.name;
  title = "Modifier nom de l'arrosage";

  // addWateringForm Group
  addWateringForm = this.formBuilder.group({
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
              private wateringService: WateringService,
              private gardenService: GardenService,
              private snackbarService: SnackbarService) { 
    this.gardenService.getAllGardens()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member')) 
          this.gardens = res['hydra:member'];
          if (this.gardens.length < 2) {
            this.addWateringForm.controls.garden.setValue(this.gardens[0]);
          }
        }
      )
  }

  ngOnInit() {}

  get f(): { [key: string]: AbstractControl } {
    return this.addWateringForm.controls;
  }

  // Submit button
  onSubmit() {
    if (!this.addWateringForm.valid) {
      return;
    }

    const formValue: IAddWatering = this.addWateringForm.getRawValue();
    this.wateringService.addWatering(formValue).subscribe(
      () => {
        const wateringName = formValue.name;
        this.router.navigate(['/easygarden/watering']);
        this.snackbarService.showNotification(`L\'arrosage "${wateringName}" a bien 
          été ajouté au jardin de ${formValue.garden?.name}.`, 'created');
      }
    )
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.addWateringForm.reset();
    formDirective.resetForm();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
