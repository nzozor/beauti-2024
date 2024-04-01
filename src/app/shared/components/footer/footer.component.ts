import {ChangeDetectionStrategy, Component} from '@angular/core';
import {InstaComponent} from "../svg/insta/insta.component";
import {BeautiLogoComponent} from "../beauti-logo/beauti-logo.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports:[InstaComponent, BeautiLogoComponent]
})

export class FooterComponent {
  year: number = new Date().getFullYear();

}
