import { Component, OnInit } from '@angular/core';
import { Router, ResolveStart, ResolveEnd, NavigationStart, NavigationCancel, NavigationEnd, NavigationError } from '@angular/router';

import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { filter, mapTo, merge, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  title = 'Easy Garden';

  // Loader
  faLeaf = faLeaf;
  loading!: Observable<boolean>;
  private showLoaderEvents!: Observable<boolean>;
  private hideLoaderEvents!: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showLoaderEvents = this.router.events.pipe(
      filter((event:any) => event instanceof ResolveStart),
      mapTo(true)
    );
    this.hideLoaderEvents = this.router.events.pipe(
      filter((event:any) => event instanceof ResolveEnd),
      mapTo(false)
    );
    this.loading = merge(this.hideLoaderEvents, this.showLoaderEvents);
  }

}
