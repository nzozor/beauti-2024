import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.svg',
  styleUrls: ['./arrow.component.scss'],
  standalone: true
})
export class ArrowComponent implements OnInit {
  @Input() position: 'left' | 'right' = 'left';
  constructor() { }

  ngOnInit() {
  }

}
