import {CommonModule, isPlatformBrowser, NgOptimizedImage} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA, ElementRef,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID, ViewChild
} from '@angular/core';
import {register} from 'swiper/element/bundle';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from "@angular/router";
import {DataService} from "@app/shared/services/data.service";
import {BookingService} from "@app/shared/services/booking.service";
import {HomePageSlider} from "@app/shared/models/homepageSlider.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, NgOptimizedImage, MatButtonModule, RouterModule, MatProgressSpinner],
  standalone: true
})
export class MainSliderComponent implements AfterViewInit {
  @Output() bookTreatment = new EventEmitter<boolean>(true);
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  slideConfig = {
    slidesToShow: 1, slidesToScroll: 1, dots: true,
    infinite: true,
    adaptiveHeight: true,
    focusOnSelect: false,
    touchThreshold: 1000,
    autoplay: false,
    speed: 2500,
    fade: true,
  };

  homageBanners$ = this.getBanners();
  displayBanners = false;


  constructor(private dataService: DataService, private bookingService: BookingService, @Inject(PLATFORM_ID) private platformId: any,private cd: ChangeDetectorRef) {
    register();
  }

  get cmsUrl() {
    return this.dataService.beautiCmsUrl;
  }

  ngAfterViewInit() {

    const params = {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      injectStyles: [
        `
          @media (min-width: 768px) {
            .swiper-pagination {
              scale: 1.5
            }
         
          }
         
           .swiper-pagination-bullet-active {
            background: white;
          }
        `,
      ],
    };
    if(!this.swiperRef) return;
    Object.assign(this.swiperRef!.nativeElement, params);
    if (typeof this.swiperRef.nativeElement.initialize === 'function') {
      this.swiperRef.nativeElement.initialize();
      this.displayBanners = true;
      this.cd.detectChanges();
    } else {
      console.warn('initialize method does not exist on the swiperRef.nativeElement object');
    }

  }

  getBanners(): Observable<HomePageSlider[]> {
    return this.dataService.getServerTimeThenBanner();
  }

  openBooking(): void {
    this.bookingService.sendBooking();
  }
  
  getBackGroudImgRaw(imgLarge: string, imgSmall: string): string {
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 768) {
      return `${this.cmsUrl}${imgLarge}`;
    } else {
      return `${this.cmsUrl}${imgSmall}`;
    }
  }
}
