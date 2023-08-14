import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ResolveStart, ResolveEnd, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, mapTo, merge, Observable } from 'rxjs';
// Icons
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
// Service
import { SeoService } from './_services/miscellaneous/seo.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  // Loader
  faLeaf = faLeaf;
  loading!: Observable<boolean>;
  private showLoaderEvents!: Observable<boolean>;
  private hideLoaderEvents!: Observable<boolean>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private metaService: Meta,
              private seoService: SeoService) {}

  ngOnInit(): void {
    // Spinning Icon Loader
    this.showLoaderEvents = this.router.events.pipe(
      filter((event:any) => event instanceof ResolveStart),
      mapTo(true)
    );
    this.hideLoaderEvents = this.router.events.pipe(
      filter((event:any) => event instanceof ResolveEnd),
      mapTo(false)
    );
    this.loading = merge(this.hideLoaderEvents, this.showLoaderEvents);

    // SEO  Meta/Title + Dynamic og:title
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
      () => {
        var rt = this.getChild(this.activatedRoute) 
        rt.data.subscribe((data: { ogDescription: any; 
                                   ogTitle: any; }) => {

          this.seoService.setTitle();
          this.seoService.addTags();
 
          if (data.ogTitle) {
            this.metaService.updateTag({ property: 'og:title', content: data.ogTitle })
          } else {
            this.metaService.removeTag("property='og:title'")
          }
 
        })
      }
    )
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

}
