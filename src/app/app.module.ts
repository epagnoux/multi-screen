import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { PanelBaseComponent } from './components/panel-base/panel-base.component';
import { ScreenContentComponent } from './components/screen-content/screen-content.component';
import { WidgetCiviliansComponent } from './components/widget/widget-civilians/widget-civilians.component';
import { WidgetItemComponent } from './components/widget/widget-item/widget-item.component';
import { WidgetManagerComponent } from './components/widget/widget-manager/widget-manager.component';
import { WidgetSocialMediaComponent } from './components/widget/widget-social-media/widget-social-media.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreenContentComponent,
    PanelBaseComponent,
    PanelBaseComponent,
    WidgetManagerComponent,
    WidgetItemComponent,
    WidgetSocialMediaComponent,
    WidgetCiviliansComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
