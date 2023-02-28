import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from 'src/app/easygarden/components/garden/garden.service';
import { LawnmowerService } from '../../lawnmower.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IGarden } from 'src/app/easygarden/components/garden/IGarden';
import { IAddLawnmower } from '../../ILawnmower';


@Component({
  selector: 'app-add-lawnmower',
  templateUrl: './add-lawnmower.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AddLawnmowerComponent implements OnInit {

  faCircleXmark = faCircleXmark;
  name = environment.application.name;
  title = "Modifier nom de la tondeuse";

  // addLawnmowerForm Group
  addLawnmowerForm = this.formBuilder.group({
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
              private lawnmowerService: LawnmowerService,
              private gardenService: GardenService,
              private snackbarService: SnackbarService) {
    this.gardenService.getAllGardens()
      .subscribe(
        (res:any) => {
          if (res.hasOwnProperty('hydra:member')) 
          this.gardens = res['hydra:member'];
          if (this.gardens.length < 2) {
            this.addLawnmowerForm.controls.garden.setValue(this.gardens[0]);
          }
        }
      )
  }
  
  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.addLawnmowerForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.addLawnmowerForm.valid) {
      return;
    }

    const formValue: IAddLawnmower = this.addLawnmowerForm.getRawValue();
    this.lawnmowerService.addLawnmower(formValue).subscribe(
      () => {
        const lawnmowerName = formValue.name;
        this.router.navigate(['/easygarden/lawnmower']);
        this.snackbarService.showNotification(`La tondeuse "${lawnmowerName}" a bien 
          été ajoutée au jardin de ${formValue.garden?.name}.`, 'created');
      }
    );
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.addLawnmowerForm.reset();
    formDirective.resetForm();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
