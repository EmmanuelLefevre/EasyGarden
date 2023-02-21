import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})

export class Error404Component implements OnInit {

  time: number = 7;
  timeOut: any;

  constructor(private location: Location) { 
    this.timeOut = setTimeout(() => {
      this.location.back();
    }, 7000);
  }

  ngOnInit(): void {
    setInterval(() => { if (this.time > 0) this.time--; }, 1000);
  }

  goBack() {
    this.location.back();
    clearTimeout(this.timeOut);
  }

}