import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from '../../garden.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IGarden } from '../../IGarden';


@Component({
  selector: 'app-add-garden',
  templateUrl: './add-garden.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AddGardenComponent implements OnInit {

  faCircleXmark = faCircleXmark;
  name = environment.application.name;
  title = "Ajouter un jardin";

  // addGardenForm Group
  addGardenForm = this.formBuilder.group({
    name: 
      [
        null as IGarden | null,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()],
      ],
      nonNullable: true
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
  onReset(formDirective: any): void {
    this.addGardenForm.reset();
    formDirective.resetForm();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
