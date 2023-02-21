import { Component, OnInit } from '@angular/core';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLinkedin = faLinkedin;
  faGithub = faGithub;

  constructor() { }

  ngOnInit(): void {
  }

}
