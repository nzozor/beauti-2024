import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {Observable} from "rxjs";
import {StoryblokService} from "@app/shared/services/storyblok.service";
import {map} from "rxjs/operators";
import {AsyncPipe, NgIf} from "@angular/common";
import {richTextResolver} from "@storyblok/richtext";
const { render } = richTextResolver()

@Component({
  selector: 'app-privacy-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogContent, MatDialogClose, MatButton, MatDialogActions, MatDialogTitle, AsyncPipe, NgIf],

  templateUrl: './privacy-modal.component.html',
  styleUrl: './privacy-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PrivacyModalComponent {
  // readonly dialogRef = inject(MatDialogRef<any>);
  // constructor() {
  // }

  privacyPolicy$: Observable<any>;
  constructor(private storyblok: StoryblokService) {
    this.privacyPolicy$ = this.storyblok.getStory('privacy-policy').pipe(map((data: {privacyPolicyField:any}) => {
      return (render(data.privacyPolicyField.content) as []).join('');
    } ));
  }
}


