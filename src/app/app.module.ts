import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LayersComponent } from './components/layers/layers.component';
import { PanelBaseComponent } from './components/panel-base/panel-base.component';
import { ScreenContentComponent } from './components/screen-content/screen-content.component';
import { WidgetPanelComponent } from './components/widget-panel/widget-panel.component';
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
    WidgetCiviliansComponent,
    LayersComponent,
    WidgetPanelComponent,
    HomeComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  exports: [WidgetPanelComponent]
})
export class AppModule {}
