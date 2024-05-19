import {Component, Inject, OnInit, Optional, PLATFORM_ID} from '@angular/core';
import {RESPONSE} from "@src/express.tokens";
import { Response } from 'express';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  standalone: true
})
  export class PageNotFoundComponent implements OnInit {

    constructor(@Optional() @Inject(RESPONSE) private response: Response, @Inject(PLATFORM_ID) private platformId: any ) { }

    ngOnInit(): void {
      if (isPlatformServer(this.platformId)) {
        this.response.status(404);
      }
    }

  }
