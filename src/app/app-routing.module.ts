import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RoutingPaths } from './core/UiEnumerations';
import { WindowPanelComponent } from './components/window-panel/window-panel.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: RoutingPaths.WindowPanel,
    component: WindowPanelComponent
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
