import { Component, OnInit } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from 'src/app/easygarden/components/garden/garden.service';
import { PoolService } from '../../pool.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IAddPool } from '../../IPool';
import { IGarden } from 'src/app/easygarden/components/garden/IGarden';


@Component({
  selector: 'app-addpool',
  templateUrl: './add-pool.component.html'
})

export class AddPoolComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // addPoolForm Group
  addPoolForm = this.formBuilder.group({
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
              private poolService: PoolService,
              private gardenService: GardenService,
              private snackbarService: SnackbarService) { 
  this.gardenService.getAllGardens()
    .subscribe(
      (res:any) => {
        if (res.hasOwnProperty('hydra:member')) 
        this.gardens = res['hydra:member'];
        if (this.gardens.length < 2) {
          this.addPoolForm.controls.garden.setValue(this.gardens[0]);
        }
      }
    )
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.addPoolForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.addPoolForm.valid) {
      return;
    }

    const formValue: IAddPool = this.addPoolForm.getRawValue();
    this.poolService.addPool(formValue).subscribe(
      () => {
        const poolName = this.addPoolForm.get('name')?.value;
        this.router.navigate(['/easygarden/pool']);
        this.snackbarService.showNotification(`L\'équipement "${poolName}" a bien 
          été ajouté au jardin de ${formValue.garden?.name}.`, 'created');
      }
    )
  }

  // Cancel button
  onReset(): void {
    this.addPoolForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
