import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';
import { WateringService } from '../../watering.service';

import { IWatering } from '../../IWatering';


@Component({
  selector: 'app-edit-watering',
  templateUrl: './edit-watering.component.html'
})

export class EditWateringComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // EditWateringForm Group
  editWateringForm = this.formBuilder.group({
    name: [
      [
        null as IWatering | null,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()
      ]
    ],
    nonNullable: true
  });

  value = '';
  watering!: IWatering;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private location: Location,
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
  onReset(): void {
    this.editWateringForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
