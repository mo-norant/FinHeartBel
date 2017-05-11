import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ECGViewerComponent } from './ecg-viewer.component';

describe('ECGViewerComponent', () => {
  let component: ECGViewerComponent;
  let fixture: ComponentFixture<ECGViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ECGViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECGViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
