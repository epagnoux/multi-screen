import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { WidgetPanelComponent } from './components/widget-panel/widget-panel.component';
import { RoutingPaths } from './core/UiEnumerations';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: RoutingPaths.WidgetPanel,
    component: WidgetPanelComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
