import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSocialMediaComponent } from './widget-social-media.component';

describe('WidgetSocialMediaComponent', () => {
  let component: WidgetSocialMediaComponent;
  let fixture: ComponentFixture<WidgetSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetSocialMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
