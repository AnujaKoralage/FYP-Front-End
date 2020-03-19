import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const PAGE_ROUTES: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(PAGE_ROUTES)],
  exports: [RouterModule]
})
export class Routing {

}
