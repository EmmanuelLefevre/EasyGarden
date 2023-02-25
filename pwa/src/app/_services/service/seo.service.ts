import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})

export class SeoService {

  constructor(private meta: Meta,
              private titleService: Title) {}

  public setMetaDescription(description: string) {
    this.meta.updateTag({
        name: 'description',
        content: description
    });
  }

  public setMetaKeywords(keywords: string) {
    this.meta.updateTag({
        name: 'keywords',
        content: keywords
    });
  }

  public setMetaName(name: string) {
    this.meta.updateTag({
        name: 'name',
        content: name
    });
  }

  public setMetaColorTheme(colorValue: string) {
    this.meta.updateTag({
        name: 'theme-color',
        content: colorValue
    });
  }

  public setMetaTitle(title:string) {
    this.titleService.setTitle(title);
  }

}
