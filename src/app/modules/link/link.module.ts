import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SharedModule } from '@shared/shared.module';
import { LinkPageComponent } from './components/link-page/link-page.component';
import { TabFileComponent } from './components/link-page/link-tabs/tab-file/tab-file.component';
import { TabSettingComponent } from './components/link-page/link-tabs/tab-setting/tab-setting.component';

@NgModule({
  declarations: [LinkPageComponent,TabFileComponent,TabSettingComponent],
  imports: [SharedModule, RouterOutlet, FormsModule, SharedComponentsModule],
  exports: [],
})

export class LinkModule {}

