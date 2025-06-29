import { gradePercentOptions } from '@modules/quiz/constants/question.constant';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';

export const arrayStringToComboboxOption = (
  array: string[]
): ComboboxOption[] => {
  return array.map((item) => ({
    label: item,
    value: Number(item),
  }));
};

export const getGradePercentComboboxOption = (): ComboboxOption[] => {
  return arrayStringToComboboxOption(gradePercentOptions);
};
