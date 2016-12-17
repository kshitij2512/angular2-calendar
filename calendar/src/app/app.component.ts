import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string;
  private date: Date;
  private day;
  private currentIndex;
  private monthName: string;
  private monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  private timeRanges = [[9, 10], [10, 11], [11, 12], [12, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]];
  private scheduleAppointment;
  private days = [];
  private subject: AbstractControl;
  private appointments: any = [];
  private meetingSubject: string;
  private meetingForm: FormGroup;
  private timeRange: AbstractControl;
  constructor(private formBuilder: FormBuilder) {
    this.date = new Date();
    this.monthName = this.monthNames[this.date.getMonth()];
    this.day = this.date.getDate();
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
  }

  ngOnInit() {
    this.meetingForm = this.formBuilder.group({
      subject: '',
      timeRange: ''
    });
    this.subject = this.meetingForm.controls['subject'];
    this.timeRange = this.meetingForm.controls['timeRange'];
    if (localStorage.getItem('appointments')) {
      this.appointments = JSON.parse(localStorage.getItem('appointments'));
    }
  }

  openMeetingForm(index) {
    console.log(index);
    this.scheduleAppointment = true;
    this.currentIndex = index;
    console.log(this.currentIndex);
  }

  close() {
    this.scheduleAppointment = false;
  }

  deleteAppointment(event, item: any) {
    event.stopPropagation();
    for (let i = 0; i < this.appointments.length; i++) {
      if (JSON.stringify(item) === JSON.stringify(this.appointments[i])) {
        this.appointments.splice(i, 1);
      }
    }
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }

  scheduleThisMeeting() {
    if (this.appointments && this.appointments.length > 0) {
      for (let i = 0; i < this.appointments.length; i++) {
        console.log(this.appointments[i].day + ' ' + this.day.value);
        if (this.appointments[i].day === this.currentIndex && this.timeRange.value === this.appointments[i].time) {
          window.alert('this slot is already taken, please choose another one');
          console.log('match found');
          return;
        }
      }
    }
    this.appointments.push({
      'subject': this.subject.value,
      'day': this.currentIndex,
      'time': this.timeRange.value
    })
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
    this.scheduleAppointment = false;
  }
}