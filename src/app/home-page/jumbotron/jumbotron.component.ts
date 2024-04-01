import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BookingService} from "../../shared/services/booking.service";

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,

})
export class JumbotronComponent {

  constructor(private bookingService: BookingService) { }

  openBooking() {
    this.bookingService.sendBooking();
  }
}
