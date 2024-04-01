import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, PLATFORM_ID} from '@angular/core';
import {NavigationEnd, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet} from '@angular/router';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {FooterComponent} from "./shared/components/footer/footer.component";
import {HeaderNavComponent} from "./shared/components/header-nav/header.component";
import {Subscription} from "rxjs";
import {DOCUMENT, isPlatformBrowser, NgIf} from "@angular/common";
import {SeoService} from "./shared/services/seo.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinner, HeaderNavComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit{

  title = 'beauti-frontend';
  stickyHeader = false;
  loadingRouteConfig = false;
  routerEventSub!: Subscription;
  private window: Window;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: Document,
    private seoService: SeoService,
  ) {
    this.window = this.document.defaultView as Window;
  }

  ngAfterViewInit(): void {
    this.routerEventSub = this.router.events.subscribe((event: any) => {

      if ((event instanceof NavigationEnd) && isPlatformBrowser(this.platformId)) {
        this.window.scrollTo(0, 0);
        this.createLinkForCanonicalURL();
      }
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });


    this.createLinkForCanonicalURL();
  }

  setStickyHeader(value: boolean): void {
    this.stickyHeader = value;
  }

  createLinkForCanonicalURL() {
    this.seoService.createLinkForCanonicalURL();
  }
}
