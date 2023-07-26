import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-close-form-button',
  templateUrl: './close-form-button.component.html',
  styleUrls: ['./close-form-button.component.scss']
})

export class CloseFormButtonComponent implements OnInit {

  faCircleXmark = faCircleXmark;

  constructor(private location: Location,
              private router: Router) { }

  ngOnInit(): void {}

  // Close component
  goBack(): void {
    const currentUrl: string = this.router.url;
    if (currentUrl === '/login') {
      this.router.navigate(['/']);
    } else {
      this.location.back();
    }
  }

}
