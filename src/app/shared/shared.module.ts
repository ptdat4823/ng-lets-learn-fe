import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsModule } from './components/shared-components.module';
@NgModule({
  imports: [CommonModule, MatIconModule, SharedComponentsModule],
  exports: [CommonModule, MatIconModule, SharedComponentsModule],
})
export class SharedModule {}
