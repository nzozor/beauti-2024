import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {FormModalComponent} from "../form-modal/form-modal.component";
import {switchMap} from "rxjs/operators";
import {SeoService} from "@app/shared/services/seo.service";
import {DataService} from "@app/shared/services/data.service";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatOption, MatSelect} from "@angular/material/select";
import {BypassHtmlSecurityPipe} from "@app/shared/pipe/bypass-html-security.pipe";
import {MatInput, MatInputModule} from "@angular/material/input";


@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckbox,
    MatSelect,
    MatOption,
    MatHint,
    CommonModule,
    FormsModule,
    BypassHtmlSecurityPipe,
    MatInput,
    MatLabel
  ]
})
export class ConsultationComponent implements OnInit {
  consultationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    contactNumber: ['', Validators.required],
    email: ['', Validators.email],
    message: ['', Validators.required],
    firstTimeCustomer: [false, Validators.required],
    funnel: [''],

  });

  consultationContent$: Observable<any> = this.dataService.getConsultationPage();
  sendBtnStatus!: 'clicked' | 'pristine';
  sendingFormInfo = false;
  displayFunnelInput = false;

  constructor(private dataService: DataService, private seo: SeoService, private fb: FormBuilder, public dialog: MatDialog) {
    this.seo.setDefaultMeta();
    this.setSeo();
  }

  ngOnInit() {
    this.consultationForm.valueChanges.subscribe((form) => {
      this.sendBtnStatus = 'pristine'
      if (form.firstTimeCustomer === true) {
        this.displayFunnelInput = true;
        this.consultationForm.get('funnel')!.setValidators(Validators.required);
      } else {
        this.displayFunnelInput = false;
        this.consultationForm.get('funnel')!.clearValidators();
      }
    })
  }

  onFormSubmit() {
    this.sendBtnStatus = 'clicked';
    if (this.consultationForm.valid) {
      this.sendingFormInfo = true;
      this.dataService.postConsultation(this.consultationForm.value).pipe(
        switchMap(() => {
          return this.dataService.sendEmail({
            to: this.consultationForm.value.email,
            subject: `${this.consultationForm.value.firstName} ${this.consultationForm.value.lastName} booked a consultation`,
            number: this.consultationForm.value.contactNumber,
            text: this.consultationForm.value.message,
            firstTimeCustomer: this.consultationForm.value.firstTimeCustomer ? 'First time customer' : 'Recurring customer',
            funnel: this.consultationForm.value.funnel,
          });
        })
      ).subscribe(
        // Successful handling of both postConsultation and sendEmail
        () => {
          this.dialog.open(FormModalComponent, {
            data: {success: true},
          });
          this.resetForm();
        },
        // Error handling for either postConsultation or sendEmail
        () => {
          this.dialog.open(FormModalComponent, {
            data: {success: false},
          });
          this.sendingFormInfo = false;
        },
        () => {
          this.sendingFormInfo = false;
        }
      );
    }
  }

  private resetForm() {
    this.consultationForm.reset();
    Object.keys(this.consultationForm.controls).forEach(key => {
      this.consultationForm.get(key)!.setErrors(null);
    });
  }

  private setSeo(): void {
    const pageTitle = 'Consultation | Aesthetic and Skin Consultation in South London';
    this.seo.setTitle(
      pageTitle
    );

    this.seo.setMeta([{
      name: 'description',
      content: `Top-rated Beauti Skin Clinic in South London, serving Oval, Brixton, Kennington, Vauxhall, Stockwell and Clapham`,
    }]);
  }
}
