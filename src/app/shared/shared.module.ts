import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from './components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, SharedComponentsModule, ReactiveFormsModule],
  exports: [CommonModule, SharedComponentsModule, ReactiveFormsModule],
})
export class SharedModule {}
