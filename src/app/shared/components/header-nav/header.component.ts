import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {tap, throttleTime} from 'rxjs/operators';

import {DOCUMENT} from '@angular/common';
import {BookingService} from '../../services/booking.service';
import {MenuLinkComponent} from "../menu-link/menu-link.component";
import {BurgerMenuComponent} from "../burger-menu/burger-menu.component";
import {BeautiLogoComponent} from "../beauti-logo/beauti-logo.component";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-header-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MenuLinkComponent, BurgerMenuComponent, BeautiLogoComponent, RouterLink, MatButton, MenuLinkComponent]
})
export class HeaderNavComponent implements OnInit {

  scrolltop = false;
  stickyHeader = false;
  sticky = false;

  constructor(@Inject(DOCUMENT) private document: Document, private bookingService: BookingService) {
  }

  private _menuLinkOpen = false;

  get menuLinkOpen(): boolean {
    return this._menuLinkOpen;
  }

  set menuLinkOpen(menuLinkOpen: boolean) {
    this._menuLinkOpen = menuLinkOpen;
  }

  ngOnInit(): void {
    fromEvent<MouseEvent>(this.document, 'scroll')
      .pipe(
        throttleTime(20),
        tap(this.onScroll.bind(this))
      )
      .subscribe();

    this.menuLinkOpen = false;
  }

  onScroll(): void {
    const doc = this.document.documentElement;
    const winScroll = doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;

    if ((winScroll / height) * 100 > 5) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  setMenuLink(value: boolean): void {
    this.menuLinkOpen = value;
  }

  openBooking(): void {
    this.bookingService.sendBooking();
  }
}
