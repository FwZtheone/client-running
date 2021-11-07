import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import * as moment from 'moment';

@Component({
  selector: 'app-mycalendar',
  templateUrl: './mycalendar.component.html',
  styleUrls: ['./mycalendar.component.scss']
})
export class MycalendarComponent implements OnInit {

 
  
  calendarOptions: CalendarOptions = {
    locale: 'fr',
    
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'Entrainement 1', date: '2021-11-03' },
      { title: 'event 2', date: '2019-04-02' }
    ]
  };

  handleDateClick(arg:any) {
  console.log(moment(arg.dateStr, 'YYYY-MM-DD').locale("fr").format("LLLL"));
  }

  constructor() { }

  ngOnInit(): void {
  }

}
