import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { PoolService } from '../../pool.service';
import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IPool } from '../../IPool';


@Component({
  selector: 'app-edit-pool',
  templateUrl: './edit-pool.component.html',
  encapsulation: ViewEncapsulation.None
})

export class EditPoolComponent implements OnInit {

  faCircleXmark = faCircleXmark;
  name = environment.application.name;
  title = "Modifier nom de l'équipement de bassin";

  // EditPoolForm Group
  editPoolForm = this.formBuilder.group({
    name:
      [
        null as IPool| null,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()]
      ],
      nonNullable: true
  });

  value = '';
  pool!: IPool;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private poolService: PoolService,
  private snackbarService: SnackbarService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.poolService.getPool(id).subscribe(
      data => {
        this.pool = data;
        this.value = this.pool.name;
      }
    );
  }
  
  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.editPoolForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.editPoolForm.valid) {
      return;
    }

    const formValue: IPool = this.editPoolForm.getRawValue();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.poolService.updatePool(formValue, id).subscribe(
      () => {
        const newName = formValue.name;
        this.router.navigate(['/easygarden/pool']);
        this.snackbarService.showNotification(`L\'équipement "${this.value}" a bien 
          été renommé en "${newName}".`, 'modified');
      }
    )
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.editPoolForm.reset();
    formDirective.resetForm();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
