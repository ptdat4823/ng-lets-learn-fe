import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';

@NgModule({
  declarations: [CoursesPageComponent],
  imports: [SharedModule],
  exports: [CoursesPageComponent],
})
export class CoursesModule {}
