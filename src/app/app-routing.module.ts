import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasBoxComponent } from './components/canvas-box/canvas-box.component';



const routes: Routes = [
  { path: 'test', component: CanvasBoxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
