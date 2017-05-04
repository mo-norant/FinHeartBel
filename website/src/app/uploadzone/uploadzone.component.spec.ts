import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadzoneComponent } from './uploadzone.component';

describe('UploadzoneComponent', () => {
  let component: UploadzoneComponent;
  let fixture: ComponentFixture<UploadzoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadzoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
