import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { LawnmowerService } from '../../lawnmower.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { ILawnmower } from '../../ILawnmower';


@Component({
  selector: 'app-editLawnmower',
  templateUrl: './edit-lawnmower.component.html'
})

export class EditLawnmowerComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // EditLawnmowerForm Group
  editLawnmowerForm = this.formBuilder.group({
    name: [
      [
        null as ILawnmower | null,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()
      ]
    ],
    nonNullable: true
  });

  value = '';
  lawnmower!: ILawnmower;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private lawnmowerService: LawnmowerService,
              private snackbarService: SnackbarService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lawnmowerService.getLawnmower(id).subscribe(
      data => {
        this.lawnmower = data;
        this.value = this.lawnmower.name;
      }
    )
  }
  
  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.editLawnmowerForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.editLawnmowerForm.valid) {
      return;
    }

    const formValue: ILawnmower = this.editLawnmowerForm.value;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lawnmowerService.updateLawnmower(formValue, id).subscribe(
      () => {
        const newName = formValue.name;
        this.router.navigate(['/easygarden']);
        this.snackbarService.showNotification(`La tondeuse "${this.value}" a bien 
          été renommée en "${newName}".`, 'modified');
      }
    )
  }

  // Cancel button
  onReset(): void {
    this.editLawnmowerForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
