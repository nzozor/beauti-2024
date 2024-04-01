import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {SeoService} from 'src/app/shared/services/seo.service';
import {ImageShowcaseComponent} from "@app/shared/components/image-showcase/image-showcase.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ImageShowcaseComponent
  ]
})
export class ContactComponent implements OnInit {

  images = [
    {
      alt: 'Top-rated Beauti Skin Clinic in South London, serving Oval, Brixton, Kennington, Vauxhall, Stockwell and Clapham',
      url: 'assets/beauti-Interior-waiting-area-2@2x.jpg'
    },
    {
      alt: 'Top-rated Beauti Skin Clinic in South London, serving Oval, Brixton, Kennington, Vauxhall, Stockwell and Clapham',
      url: 'assets/beauti-Exterior-store-front@2x.jpg'
    },
    {
      alt: 'Top-rated Beauti Skin Clinic in South London, serving Oval, Brixton, Kennington, Vauxhall, Stockwell and Clapham',
      url: 'assets/beauti-Interior-treatment-room-1@2x.jpg'
    },
  ];

  constructor(private seo: SeoService) {
    this.seo.setDefaultMeta();
  }

  ngOnInit(): void {
    const pageTitle = 'Contact | Aesthetic and Skin Specialist in South London';
    this.seo.setTitle(
      pageTitle
    );
    this.seo.setMeta([{
      name: 'description',
      content: `Top-rated Beauti Skin Clinic in South London, serving Oval, Brixton, Kennington, Vauxhall, Stockwell and Clapham`,
    }]);
  }
}
