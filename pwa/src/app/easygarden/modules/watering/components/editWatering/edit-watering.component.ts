import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../../../_services/miscellaneous/form-validation.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';
import { WateringService } from '../../watering.service';

import { IWatering } from '../../IWatering';


@Component({
  selector: 'app-edit-watering',
  templateUrl: './edit-watering.component.html',
  encapsulation: ViewEncapsulation.None
})

export class EditWateringComponent implements OnInit {

  name = environment.application.name;
  title = "Modifier nom de l'arrosage";

  // EditWateringForm Group
  editWateringForm = this.formBuilder.group({
    name:
      [
        null as IWatering | null,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()]
      ],
      nonNullable: true
  });

  value = '';
  watering!: IWatering;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private activated: ActivatedRoute,
              private wateringService: WateringService,
              private snackbarService: SnackbarService) {
    const id = Number(this.activated.snapshot.paramMap.get('id'));
    this.wateringService.getWatering(id).subscribe(
      data => {
        this.watering = data;
        this.value = this.watering.name;
      }
    )
  }
  
  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.editWateringForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.editWateringForm.valid) {
      return;
    }

    const formValue: IWatering = this.editWateringForm.value;
    const id = Number(this.activated.snapshot.paramMap.get('id'));
    this.wateringService.updateWatering(formValue, id).subscribe(
      () => {
        const newName = formValue.name;
        this.router.navigate(['/easygarden/watering']);
        this.snackbarService.showNotification(`L\'arrosage "${this.value}" a bien 
          été renommé en "${newName}".`, 'modified');
      }
    )
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.editWateringForm.reset();
    formDirective.resetForm();
  }

}
