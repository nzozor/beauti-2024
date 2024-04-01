import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {ExcluStocklistComponent} from './exclu-stocklist.component';

describe('ExcluStocklistComponent', () => {
  let component: ExcluStocklistComponent;
  let fixture: ComponentFixture<ExcluStocklistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExcluStocklistComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcluStocklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
