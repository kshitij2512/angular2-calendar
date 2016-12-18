import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.css']
})
export class ViewMeetingsComponent implements OnInit {
  private meetingSub: Subscription;
  private meetingForThisDay = [];
  private currentIndex;

  constructor(private calendar: CalendarService,
    private router: Router) { }

  ngOnInit() {
    this.meetingSub = this.calendar.meetings$.subscribe(
      res => {
        if (!res) {
          return;
        }
        if (res.meetings.length > 0 && res.index) {
          this.meetingForThisDay = [];
          this.currentIndex = res.index;
          for (let i = 0; i < res.meetings.length; i++) {
            if (res.meetings[i].day === res.index) {
              this.meetingForThisDay.push(res.meetings[i]);
            }
          }
        }
      }
    );
  }

  deleteAppointment(event, item: any) {
    event.stopPropagation();
    this.calendar.deleteMeeting(item, this.currentIndex);
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
