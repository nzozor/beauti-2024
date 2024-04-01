import { Component, ChangeDetectionStrategy } from '@angular/core';
import {SeoService} from "../shared/services/seo.service";
import {MainSliderComponent} from "./main-slider/main-slider.component";
import {BoutiqueSummaryComponent} from "./boutique-summary/boutique-summary.component";
import {PopularTreatmentComponent} from "./popular-treatment/popular-treatment.component";
import {ReviewsComponent} from "./reviews/reviews.component";
import {ExcluStocklistComponent} from "./exclu-stocklist/exclu-stocklist.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[MainSliderComponent,BoutiqueSummaryComponent,PopularTreatmentComponent, ReviewsComponent, ExcluStocklistComponent],
  standalone: true,
})
export class HomePageComponent {
  title = 'beauti-frontend';
  stickyHeader = false;
  imgUrl = 'assets/beauti-nail-skin.jpg';

  constructor(private seo: SeoService) {
    this.seo.setDefaultMeta();
  }

  setStickyHeader(value: boolean): void {
    this.stickyHeader = value;
  }
}
