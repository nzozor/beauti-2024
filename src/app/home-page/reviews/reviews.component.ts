import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild
} from '@angular/core';
import {register} from 'swiper/element/bundle';
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    NgStyle,

  ],
  // encapsulation: ViewEncapsulation.None,
})
export class ReviewsComponent implements AfterViewInit{
  @ViewChild('sliderEl') sliderEl: ElementRef | undefined;
  @ViewChild('start') start: ElementRef | undefined;
  @ViewChild('slickModal') slickModal: any;
  @ViewChild('swiperRef') swiperRef: ElementRef | undefined;

  stars = [1, 2, 3, 4, 5];

  reviews: { quote: string, reviewerName: string }[] = [
    {
      quote: `I had my first Aqua 3 facial today with Cinzia and it was wonderful! Cinzia put me at complete ease, took the time to explain what she was doing and she was absolutely amazing! I could not believe my face could look so good after just treatment and I cannot wait to go back and get a second one. Highly recommended.`,
      reviewerName: 'pierfrancesca'
    },
    {
      quote: `Cinzia is a star. She takes a no-nonsense approach. She was kind enough to take time to look at the skincare products I brought and helped me work through which ones I should give up on. My skin had been through the wringer, and nothing I tried before had helped. Cinzia recommended medical-grade products, was honest about pricing and left it to me how many products (if any) I would like to go for. After just one week, I've seen significant improvements. Couldn't be happier!`,
      reviewerName: 'Sara'
    },
    {
      quote: `I started having skin resurfacing laser and it has been a game changer. I suffered with acne as a teenager and have scars, however, since starting my treatment with Cinzia my skin is significantly better and the scars have reduced dramatically. The skin pigmentation has also improved, and I have less wrinkles (bonus). I highly recommend Cinzia and her team.`,
      reviewerName: 'Frederico'
    },
    {
      quote: `I have had such a great experience so far at the Beauti Skin Clinic. I have been getting the fractional laser treatment done by Cinzia. Cinzia is a wonderful person who is very welcoming, makes you feel comfortable and at ease. It is clear that she knows exactly what she is doing, has the right knowledge and skill set to suggest and perform the right treatment plan for your skin. I have suffered from deep acne scarring for many years but with this treatment I’m seeing such tremendous results.`,
      reviewerName: 'Angel'
    },
    {
      quote: `I always feel very special when I visit Cinzia and the ladies at Beauti. I leave feeling like I've given myself the biggest hug ever when I leave and it's all about self love ❤️ Thank you for being available in Brixton.`,
      reviewerName: 'Lydia'
    },
    {
      quote: `AI had my first ever PRP Facial (Vampire facial) with Cinzia. She put me at complete ease, showed me all the tools and what the process included and was absolutely amazing, as always!! I’ve been going to Cinzia for years now, I trust her with my skin and I always look forward to seeing her, which I think says everything!`,
      reviewerName: 'Francesca'
    },
    {
      quote: 'Just attended their skin consultation session and I can say that I’m very much satisfied with it. It was the most genuine and informative way possible. Special thanks to Cinzia who not only answered all my questions, but also was keen to purely educate people about skincare. All the staff were friendly and caring; this place will definitely be my trustworthy skincare clinic that I can consult to.',
      reviewerName: `Ersa`
    }
  ];


  params = {
    slidesToScroll: 1,
    slidesPerView: 3,
    infinite: true,
    focusOnSelect: false,
    touchThreshold: 1000,
    autoplay: false,
    autoplayDelay: 2500,
    freeMode: true,
    fade: true,
    spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,

      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    injectStyles: [
      `
          .swiper-pagination {
              position: initial;
              margin: 34px 0 10px;
              margin-left: 50%;
            }
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
  styles = {
    maxWidth: '1200px',

    margin: 'auto',
  }

  constructor() {
    register();
  }


  ngAfterViewInit() {
    if(!this.swiperRef) return;
    Object.assign(this.swiperRef!.nativeElement, this.params);
    if (typeof this.swiperRef.nativeElement.initialize === 'function') {
      this.swiperRef.nativeElement.initialize();
    } else {
      console.warn('initialize method does not exist on the swiperRef.nativeElement object');
    }
  }
}
