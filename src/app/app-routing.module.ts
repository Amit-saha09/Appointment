import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './month/month.component';

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/month', 
    pathMatch: 'full' 
 },
 {
   path: "month",
   component: MonthComponent,
 },
 {
   path: "month/:id",
   component: MonthComponent,
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
