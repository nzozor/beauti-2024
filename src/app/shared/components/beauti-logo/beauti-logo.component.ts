import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-beauti-logo',
  templateUrl: './beauti-logo.component.html',
  styleUrls: ['./beauti-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink
  ],
  standalone: true
})
export class BeautiLogoComponent {
  public fill = '#000';
  @Input() sticky = false;


}
