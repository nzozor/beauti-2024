import { Injectable } from '@angular/core';
import Client from 'storyblok-js-client';
import {from, Observable} from "rxjs";
import {map} from "rxjs/operators";
import { renderRichText } from "@storyblok/js";

@Injectable({
  providedIn: 'root'
})
export class StoryblokService {
  private sbClient = new Client({
    accessToken: 'XKrSYriETTenJaZrhbgB0Qtt' // Add your token here
  });

  constructor() { }

  getStory(slug: string, params?: object): Observable<any> {
    return from(this.sbClient.getStory(slug, params)).pipe(
      map(res=> res.data.story.content)
    )
  }

  getStories(params?: object): Promise<any> {
    return this.sbClient.getStories(params)
      .then(res => res.data);
  }
}
