import { Component, OnInit } from '@angular/core';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  title = 'Easy Garden';
  faUserCircle = faUserCircle;

  constructor() { }
  
  ngOnInit(): void {}

}
