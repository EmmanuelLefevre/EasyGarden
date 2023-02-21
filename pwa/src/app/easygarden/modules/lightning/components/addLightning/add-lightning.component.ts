import { Component, OnInit } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from 'src/app/easygarden/components/garden/garden.service';
import { LightningService } from '../../lightning.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IGarden } from 'src/app/easygarden/components/garden/IGarden';
import { IAddLightning } from '../../ILightning';


@Component({
  selector: 'app-add-lightning',
  templateUrl: './add-lightning.component.html'
})

export class AddLightningComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // addLawnmowerForm Group
  addLightningForm = this.formBuilder.group({
    name: [
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
              private lightningService: LightningService,
              private gardenService: GardenService,
              private snackbarService: SnackbarService) { 
    this.gardenService.getAllGardens()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member')) 
          this.gardens = res['hydra:member'];
          if (this.gardens.length < 2) {
            this.addLightningForm.controls.garden.setValue(this.gardens[0]);
          }
        }
      )
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.addLightningForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.addLightningForm.valid) {
      return;
    }
      const formValue: IAddLightning = this.addLightningForm.getRawValue();
      this.lightningService.addLightning(formValue).subscribe(
        () => {
          const LightningName = formValue.name;
          this.router.navigate(['/easygarden/lightning']);
          this.snackbarService.showNotification(`L\'éclairage "${LightningName}" a 
            bien été ajouté au jardin de ${formValue.garden?.name}.`, 'created');
        }
      )
  }

  // Cancel button
  onReset(): void {
    this.addLightningForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back()
  }

}
