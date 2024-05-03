import { Component, ViewChild } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { provideMomentDateAdapter } from '@angular/material-moment-adapter'
import { SWEDEN_FORMAT } from './app.config'
import { FormsModule } from '@angular/forms'
import moment from 'moment'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideMomentDateAdapter(SWEDEN_FORMAT)],
})
export class AppComponent {
  timeTo = 'Time to';
  title: string | null = null;
  selectedDate: moment.Moment | null = null;
  countdown: string = '';

  @ViewChild('datepicker') datepicker!: MatDatepicker<Date>

   futureDateFilter = (d: Date | null): boolean => {
    const today = new Date();
    return !d || d >= today;
  }

  openDatepicker() {
    this.datepicker.open()
  }

  onDatepickerClosed(){
    if(this.selectedDate){
      this.startCountdown();
    }
  }

  startCountdown() {
    setInterval(() => {
      const now = moment();
      if (!this.selectedDate) return;

      const diff = moment.duration(this.selectedDate.diff(now));

      const days = diff.days();
      const hours = diff.hours();
      const minutes = diff.minutes();
      const seconds = diff.seconds();

      this.countdown = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
    }, 1000);
  }
}
