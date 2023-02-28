import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-close-form-button',
  templateUrl: './close-form-button.component.html',
  styleUrls: ['./close-form-button.component.scss']
})

export class CloseFormButtonComponent implements OnInit {

  faCircleXmark = faCircleXmark;

  constructor(private location: Location) { }

  ngOnInit() {}

  // Close component
  goBack(): void {
    this.location.back();
  }

}
