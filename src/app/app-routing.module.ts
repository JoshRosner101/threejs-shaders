import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasBoxComponent } from './components/canvas-box/canvas-box.component';
import { AbstractComponent } from './abstract/abstract.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: CanvasBoxComponent },
  { path: 'abstract', component: AbstractComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
