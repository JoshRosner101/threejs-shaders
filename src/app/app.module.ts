import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasBoxComponent } from './components/canvas-box/canvas-box.component';
import { AppRoutingModule } from './app-routing.module';
import { AbstractComponent } from './abstract/abstract.component';
import { HomeComponent } from './home/home.component';
import { GradientsComponent } from './gradients/gradients.component';
import { CartoonComponent } from './cartoon/cartoon.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasBoxComponent,
    AbstractComponent,
    HomeComponent,
    GradientsComponent,
    CartoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
