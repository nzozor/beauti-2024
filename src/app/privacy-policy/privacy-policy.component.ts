import {Component} from '@angular/core';
import {StoryblokService} from "@app/shared/services/storyblok.service";
import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {map} from "rxjs/operators";
import { richTextResolver } from '@storyblok/richtext'
const { render } = richTextResolver()

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

  privacyPolicy$: Observable<any>;
  test: any;
  constructor(private storyblok: StoryblokService) {
    this.privacyPolicy$ = this.storyblok.getStory('privacy-policy').pipe(map((data: {privacyPolicyField:any}) => {
      return (render(data.privacyPolicyField.content) as []).join('');
    } ));
  }
}
