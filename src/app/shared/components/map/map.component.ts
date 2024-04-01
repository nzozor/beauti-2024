import { ChangeDetectionStrategy, Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
declare var require: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  map: any;
  constructor(private zone: NgZone) {
  }

  ngAfterViewInit(): any {
    this.displayMap();
  }

  private displayMap(): void {
    // this.zone.runOutsideAngular(() => {

    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWxzYWJlbiIsImEiOiJjanZ4b2ZndDQwNnB5M3pyejNrZWQwaGVwIn0.T8MZoM6PJVvNkME819rAkw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/elsaben/ck2mfzocf0e271co95fjg4wry',
      interactive: true
    });
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'bottom-right');
    // });
  }
}
