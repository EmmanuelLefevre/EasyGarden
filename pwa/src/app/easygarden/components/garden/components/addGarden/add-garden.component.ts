import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from '../../garden.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IGarden } from '../../IGarden';


@Component({
  selector: 'app-add-garden',
  templateUrl: './add-garden.component.html'
})

export class AddGardenComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // addGardenForm Group
  addGardenForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()
      ]
    ]
  })

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router, 
              private location: Location,
              private gardenService: GardenService,
              private snackbarService: SnackbarService) {}

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.addGardenForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.addGardenForm.valid) {
      return;
    }

    const formValue: IGarden = this.addGardenForm.getRawValue();
    this.gardenService.addGarden(formValue).subscribe(
      () => {
        const gardenName = formValue.name;
        this.router.navigate(['/easygarden']);
        this.snackbarService.showNotification(`Le jardin "${gardenName}" 
          a bien été ajouté.`, 'created');
      }
    )

  }

  // Cancel button
  onReset(): void {
    this.addGardenForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
