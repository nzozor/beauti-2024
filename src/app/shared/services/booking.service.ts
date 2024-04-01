import { Inject, Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookNow = new Subject<boolean>();
  private window: Window;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView as Window;
  }


  sendBooking(): void {
    this.window.open('https://widget.treatwell.co.uk/place/beauti-skin-clinic/', '_blank', 'noopener');
  }

  sendBookingBespoke(): void {
    this.window.open('mailto:info@beautiskinclinic.com?subject=Beauti Skin Clinic Booking', '_blank', 'noopener');
  }

  getBooking(): Observable<boolean> {
    return this.bookNow.asObservable();
  }
}
