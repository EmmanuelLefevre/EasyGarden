import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { FormValidationService } from '../../../../../_services/miscellaneous/form-validation.service';
import { PortalService } from '../../portal.service';
import { SnackbarService } from 'src/app/_services/miscellaneous/snackbar.service';

import { IPortal } from '../../IPortal';


@Component({
  selector: 'app-edit-portal',
  templateUrl: './edit-portal.component.html',
  encapsulation: ViewEncapsulation.None
})

export class EditPortalComponent implements OnInit {

  name = environment.application.name;
  title = "Modifier nom du portail";

  // EditPoolForm Group
  editPortalForm = this.formBuilder.group({
    name:
      [
        null as IPortal | null,
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()]
      ],
      nonNullable: true
  });

  value = '';
  portal!: IPortal;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private route: ActivatedRoute,
              private portalService: PortalService,
              private snackbarService: SnackbarService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.portalService.getPortal(id).subscribe(
      data => {
        this.portal = data;
        this.value = this.portal.name;
      }
    )
  }
  
  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.editPortalForm.controls;
  }

  // Submit
  onSubmit() {
    if (!this.editPortalForm.valid) {
      return;
    }

    const formValue: IPortal = this.editPortalForm.value;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.portalService.updatePortal(formValue, id).subscribe(
      () => {
        const newName = formValue.name;
        this.router.navigate(['/easygarden/portal']);
        this.snackbarService.showNotification(`Le portail "${this.value}" a bien 
          été renommé en "${newName}".`, 'modified');
      }
    )
  }

  // Cancel button
  onReset(formDirective: any): void {
    this.editPortalForm.reset();
    formDirective.resetForm();
  }

}
