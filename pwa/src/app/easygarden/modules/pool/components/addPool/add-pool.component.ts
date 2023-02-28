import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from 'src/app/easygarden/components/garden/garden.service';
import { PoolService } from '../../pool.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IAddPool } from '../../IPool';
import { IGarden } from 'src/app/easygarden/components/garden/IGarden';


@Component({
  selector: 'app-addpool',
  templateUrl: './add-pool.component.html',
  encapsulation: ViewEncapsulation.None
})

export class AddPoolComponent implements OnInit {

  name = environment.application.name;
  title = "Modifier nom de l'équipement de bassin";

  // addPoolForm Group
  addPoolForm = this.formBuilder.group({
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
  onReset(formDirective: any): void {
    this.addPoolForm.reset();
    formDirective.resetForm();
  }

}
