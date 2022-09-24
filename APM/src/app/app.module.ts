import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [ //define the external moduule that you want to have available
    BrowserModule
  ],
  bootstrap: [AppComponent] //starting compomnent for our app
})
export class AppModule { }
