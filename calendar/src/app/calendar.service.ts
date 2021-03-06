import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class CalendarService {
    private appointments = [];
    private timeRanges = [[9, 10], [10, 11], [11, 12], [12, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]];
    private _meetings$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() { }

    get meetings$() {
        return this._meetings$.asObservable();
    }

    viewMeetings(index) {
        if (localStorage.getItem('appointments')) {
            this.appointments = JSON.parse(localStorage.getItem('appointments'));
        }
        this._meetings$.next({
            meetings: this.appointments,
            index: index
        });
    }

    deleteMeeting(item: Object, index: any) {
        for (let i = 0; i < this.appointments.length; i++) {
            if (JSON.stringify(item) === JSON.stringify(this.appointments[i])) {
                this.appointments.splice(i, 1);
            }
        }
        this._meetings$.next({
            meetings: this.appointments,
            index: index
        });
        localStorage.setItem('appointments', JSON.stringify(this.appointments));
    }

    editMeeting(newItem: Object, oldItem: Object, index: any) {
        if (this.appointments && this.appointments.length > 0 && newItem['time'] !== oldItem['time']) {
            for (let i = 0; i < this.appointments.length; i++) {
                if (this.appointments[i].day === index && newItem['time'] === this.appointments[i].time) {
                    window.alert('this slot is already taken, please choose another one');
                    return;
                }
            }
        }
        for (let i = 0; i < this.appointments.length; i++) {
            if (JSON.stringify(oldItem) === JSON.stringify(this.appointments[i])) {
                this.appointments.splice(i, 1);
            }
        }
        this.appointments.push(newItem);
        localStorage.setItem('appointments', JSON.stringify(this.appointments));
        this._meetings$.next({
            meetings: this.appointments,
            index: index
        });
    }

    getTimeRanges() {
        return this.timeRanges;
    }
} 