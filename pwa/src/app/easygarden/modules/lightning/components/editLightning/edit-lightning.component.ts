import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { LightningService } from '../../lightning.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { ILightning } from '../../ILightning';


@Component({
  selector: 'app-edit-lightning',
  templateUrl: './edit-lightning.component.html'
})

export class EditLightningComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // EditLightningForm Group
  editLightningForm = this.formBuilder.group({
    name: [
      [
        null as ILightning | null,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()
      ]
    ],
    nonNullable: true
  });

  value = '';
  lightning!: ILightning;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private lightningService: LightningService,
              private snackbarService: SnackbarService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lightningService.getLightning(id).subscribe(
      data => {
        this.lightning = data;
        this.value = this.lightning.name;
      }
    )    
  }
  
  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.editLightningForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.editLightningForm.valid) {
      return;
    }

    const formValue: ILightning = this.editLightningForm.getRawValue();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lightningService.updateLightning(formValue, id).subscribe(
      () => {
        const newName = formValue.name;
        this.router.navigate(['/easygarden']);
        this.snackbarService.showNotification(`L\'éclairage "${this.value}" a bien 
          été renommé en "${newName}".`, 'modified');
      }
    )
  }

  // Cancel button
  onReset(): void {
    this.editLightningForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back()
  }

}
