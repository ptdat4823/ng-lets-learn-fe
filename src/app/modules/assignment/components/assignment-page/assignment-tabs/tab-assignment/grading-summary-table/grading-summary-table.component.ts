import { Component, Input, OnInit } from '@angular/core';
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
export class GradingSummaryTableComponent implements OnInit {
  @Input() assigned: number = 0;
  @Input() submitted: number = 0;
  @Input() needGrading: number = 0;

  tableFields: SummaryTableField[] = [];

  ngOnInit(): void {
    this.getTableFields();
  }

  ngOnChanges(): void {
    this.getTableFields();
  }

  getTableFields() {
    this.tableFields = [
      { label: 'Hidden from students', value: 'No' },
      { label: 'Assigned', value: this.assigned },
      { label: 'Submitted', value: this.submitted },
      { label: 'Need grading', value: this.needGrading },
    ];
  }
}
