import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {FormModalComponent} from './form-modal.component';

describe('FormModalComponent', () => {
  let component: FormModalComponent;
  let fixture: ComponentFixture<FormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModalComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}}, // Providing a mock value for MatDialogRef
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
