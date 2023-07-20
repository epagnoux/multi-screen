import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowPanelComponent } from './window-panel.component';

describe('WindowPanelComponent', () => {
  let component: WindowPanelComponent;
  let fixture: ComponentFixture<WindowPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
