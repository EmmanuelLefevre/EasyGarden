import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { PoolService } from '../../pool.service';
import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IPool } from '../../IPool';


@Component({
  selector: 'app-edit-pool',
  templateUrl: './edit-pool.component.html'
})

export class EditPoolComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // EditPoolForm Group
  editPoolForm = this.formBuilder.group({
    name:
      [
        null as IPool| null,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()
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
  onReset(): void {
    this.editPoolForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
