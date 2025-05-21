import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { QuestionStatus } from '@shared/models/question';

export const arrayStringToComboboxOption = (
  array: string[]
): ComboboxOption[] => {
  return array.map((item) => ({
    label: item,
    value: item,
  }));
};

export const getQuestionStatusOptions = (): ComboboxOption[] => {
  const questionStatus = Object.values(QuestionStatus);
  return arrayStringToComboboxOption(questionStatus);
};
