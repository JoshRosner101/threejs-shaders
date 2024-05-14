import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasBoxComponent } from './components/canvas-box/canvas-box.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasBoxComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
