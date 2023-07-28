import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-verified-account',
  templateUrl: './verified-account.component.html',
  styleUrls: ['./verified-account.component.scss']
})

export class VerifiedAccountComponent implements OnInit {

  time: number = 10;
  timeOut: any;

  constructor() { 
    this.timeOut = setTimeout(() => {
      window.close();
    }, 10000);
  }

  ngOnInit(): void {
    setInterval(() => { if (this.time > 0) this.time--; }, 1000);
  }

  close() {
    window.close();
    clearTimeout(this.timeOut);
  }

}
