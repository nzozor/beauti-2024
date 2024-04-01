import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, ViewChild} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {register} from 'swiper/element/bundle';
import {v4 as uuidv4} from 'uuid';


export interface ICarouselImg {
  url: string;
  linkUrl?: string;
  alt?: string;
  title?: string;
}

@Component({
  selector: 'img-showcase',
  standalone: true,
  templateUrl: './image-showcase.component.html',
  styleUrl: './image-showcase.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, NgOptimizedImage, MatButtonModule],
})
export class ImageShowcaseComponent implements AfterViewInit {
  @Input() images: ICarouselImg[] = [];
  @Input() styles: any;
  @Input() gridRows: number = 1;
  @ViewChild('swiperRef') swiperRef: ElementRef;
  uuid;

  constructor() {
    register();
    this.uuid = uuidv4().replace(/-/g, '').substring(0, 16);
  }

  ngAfterViewInit() {
    this.swiperRef.nativeElement.setAttribute('grid-rows', this.gridRows);
    const params = {
      slidesToScroll: 1,
      gridRows: 2,
      slidesPerView: 1,
      infinite: true,
      focusOnSelect: false,
      touchThreshold: 1000,
      autoplay: true,
      autoplayDelay: 2500,
      freeMode: true,
      fade: true,
      spaceBetween: 0,
      breakpoints: {
        768: {
          slidesPerView: 3,
          autoplay: false,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          autoplay: false,
          spaceBetween: 10,
          autoplayDelay: 2500,
        },
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

    Object.assign(this.swiperRef.nativeElement, params);

    this.swiperRef.nativeElement.initialize();
  }
}
