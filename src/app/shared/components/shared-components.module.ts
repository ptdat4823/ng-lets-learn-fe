import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { CircleImageComponent } from './circle-image/circle-image.component';
import { ComboboxComponent } from './combobox/combobox.component';
import { FormInputComponent } from './form-input/form-input.component';
import { FormWarningComponent } from './form-warning/form-warning.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TabListComponent } from './tab-list/tab-list.component';
import { CollapsibleSectionComponent } from './collapsible-section/collapsible-section.component';
import { TopicComponent } from './topic/topic.component';
import { CollapsibleListComponent } from './collapsible-list/collapsible-list.component';
import { TopicPageLayoutComponent } from './topic-page-layout/topic-page-layout.component';
import { ConfirmMessageComponent } from './confirm-message/confirm-message.component';
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
    TabListComponent,
    CollapsibleSectionComponent,
    CollapsibleListComponent,
    TopicComponent,
    TopicPageLayoutComponent,
    ConfirmMessageComponent,
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
    TabListComponent,
    CollapsibleSectionComponent,
    TopicComponent,
    CollapsibleListComponent,
    TopicPageLayoutComponent,
  ],
})
export class SharedComponentsModule {}
