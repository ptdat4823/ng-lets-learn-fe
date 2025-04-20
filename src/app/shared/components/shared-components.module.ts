import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardComponent } from './card/card.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormWarningComponent } from './form-warning/form-warning.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { LayoutComponent } from './layout/layout.component';
@NgModule({
  imports: [
    FormWarningComponent,
    FormInputComponent,
    CardComponent,
    MatCheckboxModule,
    HeaderComponent,
    SidebarComponent,
    UserAvatarComponent,
    MatExpansionModule,
    LayoutComponent,
  ],
  exports: [
    FormWarningComponent,
    FormInputComponent,
    CardComponent,
    MatCheckboxModule,
    HeaderComponent,
    SidebarComponent,
    UserAvatarComponent,
    MatExpansionModule,
    LayoutComponent,
  ],
})
export class SharedComponentsModule {}
