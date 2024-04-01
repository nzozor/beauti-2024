import {of, throwError} from "rxjs";
import {FormModalComponent} from "../form-modal/form-modal.component";
import {ConsultationComponent} from "./consultation.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DataService} from "../../../shared/services/data.service";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BypassHtmlSecurityPipe} from "../../../shared/pipe/bypass-html-security.pipe";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox"

describe('ConsultationComponent', () => {
  let component: ConsultationComponent;
  let fixture: ComponentFixture<ConsultationComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['postConsultation', 'sendEmail', 'getConsultationPage']);
    mockDataService.getConsultationPage.and.returnValue(of({Content: ''}));
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ConsultationComponent, BypassHtmlSecurityPipe],
      providers: [
        {provide: DataService, useValue: mockDataService},
        {provide: MatDialog, useValue: mockDialog},
        FormBuilder
      ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, BrowserAnimationsModule, MatCheckboxModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const fillForm = () => {
    component.consultationForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      contactNumber: '1234567890',
      email: 'john.doe@example.com',
      message: 'Test Message',
      firstTimeCustomer: true
    });
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values and required validation', () => {
    expect(component.consultationForm.valid).toBeFalsy();
    expect(component.consultationForm.get('firstName').validator({} as any)).toEqual({required: true});
    expect(component.consultationForm.get('lastName').validator({} as any)).toEqual({required: true});
    expect(component.consultationForm.get('contactNumber').validator({} as any)).toEqual({required: true});
    expect(component.consultationForm.get('message').validator({} as any)).toEqual({required: true});
  });

  it('should not submit the form if it is invalid', () => {
    component.onFormSubmit();
    expect(mockDataService.postConsultation).not.toHaveBeenCalled();
  });

  it('should submit the form and call data service methods if form is valid', () => {
    mockDataService.postConsultation.and.returnValue(of({}));
    mockDataService.sendEmail.and.returnValue(of({}));

    fillForm();
    component.onFormSubmit();

    expect(mockDataService.postConsultation).toHaveBeenCalled();
    expect(mockDataService.sendEmail).toHaveBeenCalled();
    expect(mockDialog.open).toHaveBeenCalledWith(FormModalComponent, {data: {success: true}});
  });

  it('should open FormModalComponent with failure when postConsultation fails', () => {
    mockDataService.postConsultation.and.returnValue(throwError('Error'));
    fillForm();
    component.onFormSubmit();

    expect(mockDialog.open).toHaveBeenCalledWith(FormModalComponent, {data: {success: false}});
  });

  it('should open FormModalComponent with failure when sendEmail fails', () => {
    mockDataService.postConsultation.and.returnValue(of({}));
    mockDataService.sendEmail.and.returnValue(throwError('Error'));

    fillForm();
    component.onFormSubmit();

    expect(mockDialog.open).toHaveBeenCalledWith(FormModalComponent, {data: {success: false}});
  });
});
