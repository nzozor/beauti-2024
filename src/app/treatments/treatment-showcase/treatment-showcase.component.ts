import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TreatmentShowcase} from "src/app/shared/models/treatmentShowcase";
import {DataService} from "src/app/shared/services/data.service";
import {Observable, Subscription, tap} from "rxjs";
import {SafeUrl} from "@angular/platform-browser";
import {BookingService} from "src/app/shared/services/booking.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {SeoService} from "src/app/shared/services/seo.service";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MarkdownPipe} from "ngx-markdown";
import {MarkdownToHtmlPipe} from "@app/shared/pipe/markdown-to-html/markdown-to-html.pipe";

@Component({
  selector: "app-treatment-showcase",
  templateUrl: "./treatment-showcase.component.html",
  styleUrls: ["./treatment-showcase.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButton, MarkdownToHtmlPipe],
  standalone: true,
})

export class TreatmentShowcaseComponent implements OnInit, OnDestroy {
  treatmentParentName: string = '';
  activeTreatmentList: string[] = [''];
  breakpoint: string = '';
  treatmentShowcase$!: Observable<TreatmentShowcase>;
  imageUrl!: SafeUrl;
  breakpointObserver$!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private bookingService: BookingService,
    public breakpointObserver: BreakpointObserver,
    public seo: SeoService,
  ) {
  }

  ngOnInit(): void {
    const slug: string = this.route.snapshot.params['slug'];
    this.treatmentParentName = this.dataService.currentParentTreatment;
    this.activeTreatmentList = this.dataService.activeTreatmentList
      ? this.dataService.activeTreatmentList
      : ["Back to Treatments"];
    this.treatmentShowcase$ = this.treatmentShowcase(slug);
    this.breakpointObserver$ = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (
          result.breakpoints[Breakpoints.Large] ||
          result.breakpoints[Breakpoints.XLarge]
        ) {
          this.breakpoint = "large";
        }
      });
  }

  treatmentShowcase(slug: string): Observable<TreatmentShowcase> {
    return this.dataService
      .getTreatmentShowcase(slug)
      .pipe(
        tap((treatment) => {
          this.seo.setTitle(
            treatment?.metaTitle || treatment?.title
          );
          this.seo.setMeta([{
            name: 'description',
            content: treatment?.metaDescription || `${treatment?.title} | ${this.seo.defaultMetaContent}`,
          }]);
          this.imageUrl = this.getImageUrl(treatment) ? this.getImageUrl(treatment) : ''
        }))
  }

  getImageUrl(treatment: TreatmentShowcase): string {
    if (this.breakpoint === "large") {
      return `${this.dataService.beautiCmsUrl}${treatment.Images?.data?.attributes?.formats?.medium?.url}`
    }
    return `${this.dataService.beautiCmsUrl}${treatment.Images?.data?.attributes?.formats?.small?.url}`
  }

  goToParent(): void {
    this.router.navigate([`treatments`]);
  }

  openBooking(): void {
    this.bookingService.sendBooking();
  }

  ngOnDestroy(): void {
    if (this.breakpointObserver$) {
      this.breakpointObserver$.unsubscribe();
    }
  }
}
