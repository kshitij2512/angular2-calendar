import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { CalendarService } from './calendar.service';
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewMeetingsComponent,
    CalendarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule { }
