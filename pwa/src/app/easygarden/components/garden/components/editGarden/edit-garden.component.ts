import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from '../../garden.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IGarden } from '../../IGarden';


@Component({
  selector: 'app-edit-garden',
  templateUrl: './edit-garden.component.html',
  encapsulation: ViewEncapsulation.None
})

export class EditGardenComponent implements OnInit {

  name = environment.application.name;
  title = "Modifier nom du jardin";

  editGardenForm = this.formBuilder.group({
    name:
    [
      null as IGarden | null,
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      this.customValidator.validEquipmentName()]
    ],
    nonNullable: true
  })
  
  value = '';
  garden!: IGarden;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private route: ActivatedRoute,
              private gardenService: GardenService,
              private snackbarService: SnackbarService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gardenService.getGarden(id).subscribe(
      data => {
        this.garden = data;
        this.value = this.garden.name;
      }
    )
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.editGardenForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.editGardenForm.valid) {
      return;
    } 

    const formValue: IGarden = this.editGardenForm.getRawValue();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.gardenService.updateGarden(formValue, id).subscribe(
      () => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          const newName = formValue.name;
          this.router.navigate(['/easygarden']);
          this.snackbarService.showNotification(`Le jardin "${this.value}" a bien 
            ??t?? renomm?? en "${newName}".`, 'modified');
        });
      }
    )
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.editGardenForm.reset();
    formDirective.resetForm();
  }

}
