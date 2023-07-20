import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCiviliansComponent } from './widget-civilians.component';

describe('WidgetCiviliansComponent', () => {
  let component: WidgetCiviliansComponent;
  let fixture: ComponentFixture<WidgetCiviliansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetCiviliansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetCiviliansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
