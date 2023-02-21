import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { GardenService } from '../../garden.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IGarden } from '../../IGarden';


@Component({
  selector: 'app-edit-garden',
  templateUrl: './edit-garden.component.html'
})

export class EditGardenComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  editGardenForm = this.formBuilder.group({
    name:
    [
      null as IGarden | null,
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      this.customValidator.validEquipmentName()
    ],
    nonNullable: true
  })
  
  value = '';
  garden!: IGarden;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private location: Location,
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
            été renommé en "${newName}".`, 'modified');
        });
      }
    )
  }

  // Cancel button
  onReset(): void {
    this.editGardenForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
