import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ICarouselImg, LogoCarouselComponent} from "../../shared/components/logo-carousel/logo-carousel.component";

@Component({
  selector: 'app-exclu-stocklist',
  templateUrl: './exclu-stocklist.component.html',
  styleUrls: ['./exclu-stocklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    LogoCarouselComponent
  ]
})

export class ExcluStocklistComponent implements OnInit {

  slides: ICarouselImg[] = [
    {url: 'assets/exclu-stockist/Aqua3.png', linkUrl: ''},
    {url: 'assets/exclu-stockist/alumier-logo.png', linkUrl: 'https://www.alumiermd.co.uk/'},
    {url: 'assets/exclu-stockist/logo+cosmelan.png', linkUrl: 'https://www.mesoestetic.co.uk/cosmelan-treatment.html'},
    {url: 'assets/exclu-stockist/dermapen_logo.png', linkUrl: 'https://dermapen.com/'},
    {url: 'assets/exclu-stockist/hayo\'u.png', linkUrl: 'https://hayoumethod.com/'},
    {url: 'assets/exclu-stockist/Jalupro.png', linkUrl: 'https://md.jalupro.com/?p=25'},
    {url: 'assets/exclu-stockist/Profhilo+blue+Logo+no+background.png', linkUrl: 'https://www.profhilo.co.uk/'},
    {url: 'assets/exclu-stockist/sothys-logo.png', linkUrl: 'https://www.sothys.fr/en'},
    {url: 'assets/exclu-stockist/sterex.png', linkUrl: 'https://www.sterex.com/'},
    {
      url: 'assets/exclu-stockist/Venus_Concept_Venus_Concept_Announces_Financial_Results_for_the.png',
      linkUrl: 'https://www.venusconcept.com/en-uk/'
    }
  ];
  slideStyles = {
    maxWidth: '855px',
    margin: 'auto',
    height: '200px'
  }

  ngOnInit() {

  }
}
