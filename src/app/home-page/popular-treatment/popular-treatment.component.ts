import {Component, OnInit} from '@angular/core';
import {LogoCarouselComponent} from "../../shared/components/logo-carousel/logo-carousel.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-popular-treatment',
  templateUrl: './popular-treatment.component.html',
  styleUrls: ['./popular-treatment.component.scss'],
  standalone: true,
  imports: [
    LogoCarouselComponent,
    RouterLink
  ]
})
export class PopularTreatmentComponent implements OnInit {
  slides: any = [
    {url: 'assets/feature-img/Bazaar_Logo.svg.png'},
    {url: 'assets/feature-img/hello.png'},
    {url: 'assets/feature-img/mailonline-vector-logo.png'},
    {url: 'assets/feature-img/metro-co-uk-logo-vector.png'},
    {url: 'assets/feature-img/The_Sun.svg.png'},
  ];

  slideStyles = {
    maxWidth: '855px',
    margin: 'auto',
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
