import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

export interface Menu {
  title: string;
  subMenu?: SubMenu[];
  route?: string;
}

export interface SubMenu {
  title: string;
  subTitles: string[];
}

@Component({
  selector: 'app-menu-link',
  templateUrl: './menu-link.component.html',
  styleUrls: ['./menu-link.component.scss'],
  animations: [
    trigger('openClose', [
      transition('* => *', [
        query(':enter', [
            style({opacity: 0, transform: 'translateY(5%)'}),
            stagger(80, [animate('0.4s', style({transform: 'translateY(0%)', opacity: 1}))])
          ], {optional: true}
        )
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLinkActive,
    NgForOf,
    NgIf,
    RouterLink
  ]
})

export class MenuLinkComponent implements OnChanges {
  @Input() active = false;
  @Output() menuLinkOpen = new EventEmitter<boolean>();
  mainMenu: Menu[] = [
    {title: 'Home', route: '/'},
    {title: 'About Us', route: '/about-us'},
    {
      title: 'Treatments',
      route: '/treatments'
    },
    {
      title: 'Consultation',
      route: '/consultation'
    },
    {title: 'Contact', route: '/contact'}
  ];
  subMenuActive = false;
  activeSubMenu = {} as Menu;

  ngOnChanges(): void {
    if (!this.active) {
      this.subMenuActive = false;
    }
  }

  togglesSubenu(subMenu: Menu): void {
    this.subMenuActive = !this.subMenuActive;
    this.activeSubMenu = subMenu;
  }

  closeMenuLink(): void {
    this.menuLinkOpen.emit(false);
  }
}
