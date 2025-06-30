import { Component, Input } from '@angular/core';
import { DropdownOption } from '@shared/components/dropdown/dropdown.component';
import { QuestionElement } from '../../question-bank-table.component';
import { openAlertDialog } from '@shared/helper/alert.helper';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private toastr: ToastrService, private dialog: MatDialog) {}

  onEditRow(index: number): void {
    this.toastr.info('Under development', 'Info');
  }

  async onDeleteRow(index: number): Promise<void> {
    const confirmed = await openAlertDialog(
      this.dialog,
      'Delete Question',
      'Are you sure you want to delete this question?',
      'Delete',
      'Cancel',
      true
    );
    if (confirmed) {
      this.toastr.success('Delete action confirmed', 'Success');
    }
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
