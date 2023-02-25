import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { FormValidationService } from '../../../../../_services/service/form-validation.service';
import { PortalService } from '../../portal.service';
import { SnackbarService } from 'src/app/_services/service/snackbar.service';

import { IPortal } from '../../IPortal';


@Component({
  selector: 'app-edit-portal',
  templateUrl: './edit-portal.component.html'
})

export class EditPortalComponent implements OnInit {

  title = 'Easy Garden';
  faCircleXmark = faCircleXmark;

  // EditPoolForm Group
  editPortalForm = this.formBuilder.group({
    name: [
      [
        null as IPortal | null,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        this.customValidator.validEquipmentName()
      ]
    ],
    nonNullable: true
  });

  value = '';
  portal!: IPortal;

  constructor(private formBuilder: UntypedFormBuilder,
              private customValidator : FormValidationService,
              private router: Router,
              private location: Location,
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
  onReset(): void {
    this.editPortalForm.reset();
  }

  // Close component
  goBack(): void {
    this.location.back();
  }

}
