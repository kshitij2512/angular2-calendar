import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class CalendarService {
    private appointments = [];
    private _meetings$: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor() {
        if (localStorage.getItem('appointments')) {
            this.appointments = JSON.parse(localStorage.getItem('appointments'));
        }
    }

    get meetings$() {
        return this._meetings$.asObservable();
    }

    viewMeetings(index) {
        this._meetings$.next({
            meetings: this.appointments,
            index: index
        });
    }
} 