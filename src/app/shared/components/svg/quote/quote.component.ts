import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.svg',
  styleUrls: ['./quote.component.scss'],
  standalone: true,
})
export class QuoteComponent implements OnInit {
  @Input() position: 'left' | 'right' = 'left'

  constructor() { }

  ngOnInit() {
  }

}
