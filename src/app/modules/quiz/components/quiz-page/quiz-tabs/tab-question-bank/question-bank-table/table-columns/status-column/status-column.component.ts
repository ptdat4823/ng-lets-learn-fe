import { Component, Input, OnInit } from '@angular/core';
import { ComboboxService } from '@shared/components/combobox/combobox.service';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { QuestionStatus } from '@shared/models/question';

@Component({
  selector: 'status-column',
  standalone: false,
  templateUrl: './status-column.component.html',
  styleUrl: './status-column.component.scss',
  providers: [ComboboxService],
})
export class StatusColumnComponent implements OnInit {
  @Input() status: QuestionStatus = QuestionStatus.READY;
  statusOptions: ComboboxOption[] = [];

  constructor(private comboboxService: ComboboxService) {}

  ngOnInit(): void {
    this.statusOptions = this.getStatusOptions();
    const initOption = this.statusOptions.find(
      (option) => option.value === this.status
    );
    if (initOption) this.comboboxService.selectOption(initOption);
  }

  getStatusOptions() {
    return Object.values(QuestionStatus).map((status) => {
      return {
        value: status,
        label: status,
      };
    });
  }
}
