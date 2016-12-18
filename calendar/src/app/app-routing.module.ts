import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';

const appRoutes: Routes = [
    {
        path: '',
        component: CalendarComponent
    },
    {
        path: 'view-meeting',
        component: ViewMeetingsComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}