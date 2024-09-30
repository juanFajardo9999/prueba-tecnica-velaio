import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateTaskComponent } from "./components/create-task/create-task.component";
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from "./components/header/header.component";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CreateTaskComponent,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
