import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SKIN_TREATMENTS} from '../mocks/skin-treatments';
import {SKIN_IMP_REM} from '../mocks/skin-imperfections';
import {WAX_DATA} from '../mocks/waxing';
import {BODY_CONTOURING, BODY_MASSAGE} from '../mocks/body';
import {BEAUTY_FACIAL} from '../mocks/beauty';
import {HAIR_REMOVAL_ELECTRO, HAIR_REMOVAL_IPL_LASER} from '../mocks/hair-removal';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {isPlatformBrowser, NgForOf, NgIf, ViewportScroller} from '@angular/common';
import {AESTHETIC_TREATMENTS} from '../mocks/aesthetic-treatments';
import {BookingService} from "../../shared/services/booking.service";
import {DataService} from "../../shared/services/data.service";
import {SeoService} from "../../shared/services/seo.service";
import {MatButton} from "@angular/material/button";
import {
  MatAccordion,
  MatExpansionPanel, MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    MatButton,
    MatExpansionPanel,
    MatAccordion,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
  ],
  standalone: true
})
export class TreatmentsComponent implements OnInit, AfterViewInit, AfterContentChecked {
  skinTreatments: any[] = SKIN_TREATMENTS;
  skinImperfectionRemoval: any[] = SKIN_IMP_REM;
  waxing: any[] = WAX_DATA;
  bodyRelaxingMassage: any[] = BODY_MASSAGE;
  bodyContouring: any[] = BODY_CONTOURING;
  beautyFacial: any[] = BEAUTY_FACIAL;
  hairRemoveLaser: any = HAIR_REMOVAL_IPL_LASER;
  hairRemoveElectro: any[] = HAIR_REMOVAL_ELECTRO;
  aestheticTreatments: any[] = AESTHETIC_TREATMENTS
  innerWidth: any;
  leftCol: [] = [];
  rightCol: [] = [];
  activeTreatment: string = '';
  activeParrentTreatment: string = '';
  activeTreatmentList: string[] = [''];
  scrollAdjusted: boolean = false;

  @ViewChild('container', {read: ViewContainerRef, static: true}) container!: ViewContainerRef;

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private viewPortScroller: ViewportScroller,
    @Inject(PLATFORM_ID) private platformId: any,
    private seo: SeoService) {
    this.seo.setDefaultMeta();
  }

  get isWideScreen(): boolean {
    return this.innerWidth >= 600;
  }

  openBooking(e: any, treatment: any = null): void {
    if (treatment?.bespoke) {
      this.bookingService.sendBookingBespoke();
    } else {
      this.bookingService.sendBooking();
    }
  }

  ngOnInit(): void {
    this.leftCol = this.waxing[0].options.slice(0, Math.ceil(this.waxing[0].options.length / 2));
    this.rightCol = this.waxing[0].options.slice(Math.ceil(this.waxing[0].options.length / 2));
    this.innerWidth = isPlatformBrowser(this.platformId) ? window.innerWidth : 0;
    this.setSeo();
  }

  ngAfterViewInit(): void {
    if (this.activeTreatment) {
      this.viewPortScroller.scrollToAnchor(this.activeTreatment);

    } else {
      this.viewPortScroller.scrollToAnchor(this.activeParrentTreatment);
    }
  }

  ngAfterContentChecked(): void {
    if (this.viewPortScroller.getScrollPosition()[1] && !this.scrollAdjusted) {
      this.viewPortScroller.scrollToPosition(
        [this.viewPortScroller.getScrollPosition()[0],
          this.viewPortScroller.getScrollPosition()[1] - 80]
      );
      this.scrollAdjusted = true;
    }
  }

  setSeo(): void {
    const pageTitle = 'Treatments Page';
    this.seo.setTitle(
      pageTitle
    );
    this.seo.setMeta([{
      name: 'description',
      content: `${pageTitle} | ${this.seo.defaultMetaContent}`,
    }]);
  }

  goToTreatmentShowcase(treatmentParentList: string[], treatmentName: string): void {
    this.dataService.activeTreatmentList = treatmentParentList;
    this.dataService.activeTreatment = this.getSlug(treatmentName);
  }

  getSlug(treatmentName: string): string {
    return treatmentName.split(' ').join('-').split('/').join('');
  }

  isActive(treatment:any): boolean {
    if (this.activeTreatmentList) {
      return !!this.activeTreatmentList.find(treat => this.getSlug(treat) === this.getSlug(treatment));
    } else {
      return false;
    }
  }

}
