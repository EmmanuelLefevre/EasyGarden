import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// Add ViewEncapsulation for resolve problems with loading custom scss .mat-tooltip in style.scss
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';

import { SeoService } from 'src/app/_services/service/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  faUserCircle = faUserCircle;
  name = environment.application.name;

  // SEO
  colorTheme = environment.application.colorTheme;

  constructor(private seoService: SeoService) {
    const description = `${this.name} Application de Parcs et Jardins`;
    const keywords = `Arrosage Eclairage Bassin Tondeuse Portail Profil`;
    const name = `Emmanuel Lefevre développeur applicatif`;
    const colorValue = `${this.colorTheme}`
    const title = `${this.name}`;

    this.seoService.setMetaDescription(description);
    this.seoService.setMetaKeywords(keywords);
    this.seoService.setMetaName(name);
    this.seoService.setMetaColorTheme(colorValue);
    this.seoService.setMetaTitle(title);
  }
  
  ngOnInit(): void {}

}
