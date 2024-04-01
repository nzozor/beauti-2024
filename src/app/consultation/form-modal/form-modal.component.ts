import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ConsultationComponent} from "../consultation/consultation.component";
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from "@angular/common";

export interface DialogData {
  success: boolean;
}

@Component({
  selector: 'app-form-modal',
  standalone: true,

  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],

})
export class FormModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ConsultationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


