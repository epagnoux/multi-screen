import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsPanelComponent } from './widgets-panel.component';

describe('WindowPanelComponent', () => {
  let component: WidgetsPanelComponent;
  let fixture: ComponentFixture<WidgetsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetsPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
