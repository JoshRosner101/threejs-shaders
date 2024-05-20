import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasBoxComponent } from './components/canvas-box/canvas-box.component';
import { AbstractComponent } from './abstract/abstract.component';
import { HomeComponent } from './home/home.component';
import { GradientsComponent } from './gradients/gradients.component';
import { CartoonComponent } from './cartoon/cartoon.component';
import { ReflectionsComponent } from './reflections/reflections.component';
import { ParticlesComponent } from './particles/particles.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  //Tutorials
  { path: 'test', component: CanvasBoxComponent },
  { path: 'abstract', component: AbstractComponent },
  { path: 'gradient', component: GradientsComponent },
  { path: 'cartoon', component: CartoonComponent },
  { path: 'particles', component: ParticlesComponent },

  //Original
  { path: 'reflection', component: ReflectionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
