import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BookingService} from "../../shared/services/booking.service";
import {DataService} from "../../shared/services/data.service";
import {CommonModule, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-boutique-summary',
  templateUrl: './boutique-summary.component.html',
  styleUrls: ['./boutique-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    RouterLink,
    CommonModule
  ]
})
export class BoutiqueSummaryComponent implements OnInit {

  // homepageSummary$: Observable<any>;
  homepageSummary$: Observable<any> = this.dataService.getHomepageSummary();

  constructor(private bookingService: BookingService, private dataService: DataService) {

  }

  ngOnInit() {
  }

  sendGtaData(eventLabel: string, eventCategory = 'homepage', event = 'button clicks') {
    // @ts-ignore
    gtag('event', event, {
      'event_category': eventCategory,
      'event_label': eventLabel
    });
  }

  openBooking(): void {
    this.bookingService.sendBooking();
  }
}
