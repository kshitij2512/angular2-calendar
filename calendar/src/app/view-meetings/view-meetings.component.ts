import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.css']
})
export class ViewMeetingsComponent implements OnInit {
  private meetingSub: Subscription;
  private meetingForThisDay = [];
  private currentIndex;
  private editMode: boolean = false;
  private editForm: FormGroup;
  private newSubject: AbstractControl;
  private newTime: AbstractControl;
  private timeRanges;
  private currentlyBeingEdited;

  constructor(private calendar: CalendarService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.timeRanges = this.calendar.getTimeRanges();
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

  editModeOn(event, item: any, index: any) {
    this.currentlyBeingEdited = index;
    console.log('currentlyBeingEdited: ', index);
    event.stopPropagation();
    this.editMode = true;
    this.editForm = this.formBuilder.group({
      newSubject: item.subject,
      newTime: item.time
    });
    this.newSubject = this.editForm.controls['newSubject'];
    this.newTime = this.editForm.controls['newTime'];
  }

  editModeOff() {
    this.editMode = false;
    this.currentlyBeingEdited = null;
  }

  editThisMeeting() {
    let item: Object = {
      day: this.currentIndex,
      subject: this.newSubject.value,
      time: this.newTime.value
    }
    this.calendar.editMeeting(item, this.currentIndex);
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
