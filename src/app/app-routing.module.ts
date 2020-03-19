import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {PAGE_ROUTES} from './pages/routing';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: PAGE_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
