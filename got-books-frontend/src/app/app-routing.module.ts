import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagebooksComponent } from './managebooks/managebooks.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';

const routes: Routes = [
  {path:'',component:ManagebooksComponent},
  {path:'bookdetail',component:BookdetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
