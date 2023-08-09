import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { WidgetsPanelComponent } from './components/widgets-panel/widgets-panel.component';
import { RoutingPaths } from './core/UiEnumerations';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: RoutingPaths.WidgetsPanel,
    component: WidgetsPanelComponent
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
