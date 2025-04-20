import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './routes/app-route.module';
import { SharedModule } from './shared/shared.module';
import { CoursesModule } from '@modules/courses/courses.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    RouterOutlet,
    AppRoutingModule,
    AuthModule,
    CoursesModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
