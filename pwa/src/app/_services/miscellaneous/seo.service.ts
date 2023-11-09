import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class SeoService {

  title = environment.application.name;
  author = environment.application.author;
  colorTheme = environment.application.colorTheme;
  keywords = environment.application.keywords;
  mainDescription = environment.application.mainDescription;

  constructor(private metaService: Meta,
              private titleService: Title) {}

    addTags() {
      this.metaService.addTag({ name: 'author', content: this.author });
      this.metaService.addTag({ name: 'description', content: this.mainDescription });
      this.metaService.addTag({ name: 'keywords', content: this.keywords });
      this.metaService.addTag({ name: 'theme-color', content: this.colorTheme });
      this.metaService.addTag({ name: 'robots', content: 'index,follow' });
    }

    setTitle() {
      this.titleService.setTitle(this.title);
    }

}