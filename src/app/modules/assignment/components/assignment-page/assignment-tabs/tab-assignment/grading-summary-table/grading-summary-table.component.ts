import { Component, Input } from '@angular/core';
type SummaryTableField = {
  label: string;
  value: string | number;
};
type SummaryTableData = Record<string, SummaryTableField>;
@Component({
  selector: 'grading-summary-table',
  standalone: false,
  templateUrl: './grading-summary-table.component.html',
  styleUrl: './grading-summary-table.component.scss',
})
export class GradingSummaryTableComponent {
  defaultSummaryTable: SummaryTableData = {
    hiddenFromStudent: {
      label: 'Hidden from students',
      value: 'No',
    },
    assigned: {
      label: 'Assigned',
      value: 40,
    },
    submitted: {
      label: 'Submitted',
      value: 36,
    },
    needGrading: {
      label: 'Need grading',
      value: 0,
    },
  };

  tableFields: SummaryTableField[] = [];

  ngOnInit(): void {
    this.getTableFields();
  }

  getTableFields() {
    this.tableFields = Object.values(this.defaultSummaryTable);
  }
}
