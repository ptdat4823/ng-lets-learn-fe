import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CalendarPageComponent } from './components/calendar-page/calendar-page.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [CalendarPageComponent, CalendarComponent],
  imports: [SharedModule, RouterOutlet],
})
export class CalendarModule {}
