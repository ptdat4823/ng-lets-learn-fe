import { Component, Input } from '@angular/core';
import { DropdownOption } from '@shared/components/dropdown/dropdown.component';
import { QuestionElement } from '../../question-bank-table.component';

@Component({
  selector: 'action-column',
  standalone: false,
  templateUrl: './action-column.component.html',
  styleUrl: './action-column.component.scss',
})
export class ActionColumnComponent {
  @Input({ required: true }) rowData!: QuestionElement;
  rowOptions: DropdownOption[] = [
    {
      label: 'Edit',
      value: 'edit',
    },
    {
      label: 'Delete',
      value: 'delete',
    },
  ];

  onEditRow(index: number): void {
    console.log('Edit row at index:', index);
  }

  onDeleteRow(index: number): void {
    console.log('Delete row at index:', index);
  }

  onDropdownSelect(option: DropdownOption): void {
    if (option.value === 'edit') {
      this.onEditRow(this.rowData.index);
    }
    if (option.value === 'delete') {
      this.onDeleteRow(this.rowData.index);
    }
  }
}
