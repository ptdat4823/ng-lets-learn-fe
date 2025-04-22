import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardComponent } from './card/card.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormWarningComponent } from './form-warning/form-warning.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { CircleImageComponent } from './circle-image/circle-image.component';
import { ButtonComponent } from './button/button.component';
import { ComboboxComponent } from './combobox/combobox.component';
@NgModule({
  imports: [
    FormWarningComponent,
    FormInputComponent,
    CardComponent,
    MatCheckboxModule,
    HeaderComponent,
    SidebarComponent,
    MatExpansionModule,
    LayoutComponent,
    CircleImageComponent,
    ButtonComponent,
    ComboboxComponent,
  ],
  exports: [
    FormWarningComponent,
    FormInputComponent,
    CardComponent,
    MatCheckboxModule,
    HeaderComponent,
    SidebarComponent,
    MatExpansionModule,
    LayoutComponent,
    CircleImageComponent,
    ButtonComponent,
    ComboboxComponent,
  ],
})
export class SharedComponentsModule {}
