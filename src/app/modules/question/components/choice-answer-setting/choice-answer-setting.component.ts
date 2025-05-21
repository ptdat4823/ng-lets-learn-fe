import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Editor } from 'tinymce';
import { getChoiceAnswerSettingControls } from './choice-answer-setting.config';
import { FormControlField } from '@shared/helper/form.helper';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { QuestionChoice } from '@shared/models/question';

@Component({
  selector: 'choice-answer-setting',
  standalone: false,
  templateUrl: './choice-answer-setting.component.html',
  styleUrl: './choice-answer-setting.component.scss',
})
export class ChoiceAnswerSettingComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() validationMessages: Record<string, string> | null = null;
  @Input() index = 0;

  settingRows = [];
  controls: FormControlField[] = [];

  ngOnInit(): void {
    this.controls = getChoiceAnswerSettingControls(this.index + 1);
  }

  onEditorChange(content: string, controlId: string): void {
    const currentValue: QuestionChoice = this.form.value;
    if (controlId === 'answer') {
      this.form.patchValue({ ...currentValue, text: content });
    } else if (controlId === 'feedback') {
      this.form.patchValue({ ...currentValue, feedback: content });
    }
    console.log('form value', this.form.value);
  }

  onComboboxChange(option: ComboboxOption): void {
    const currentValue: QuestionChoice = this.form.value;
    const updatedValue: QuestionChoice = {
      ...currentValue,
      gradePercent: Number(option.value),
    };
    this.form.patchValue(updatedValue);
    console.log('form value', this.form.value);
  }
}
