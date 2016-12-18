import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.css']
})
export class ViewMeetingsComponent implements OnInit {
  private meetingSub: Subscription;
  private meetingForThisDay = [];

  constructor(private calendar: CalendarService) { }

  ngOnInit() {
    this.meetingSub = this.calendar.meetings$.subscribe(
      res => {
        if (!res) {
          return;
        }
        if (res.meetings && res.index) {
          for (let i = 1; i <= res.meetings.length; i++) {
            if (res.meetings.day === res.index) {
              this.meetingForThisDay.push(res.meetings[i]);
              console.log(this.meetingForThisDay);
            }
          }
        }
      }
    );
  }

}
