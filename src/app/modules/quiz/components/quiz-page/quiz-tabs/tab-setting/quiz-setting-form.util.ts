import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { GradingMethod, TimeLimitType } from '@shared/models/quiz';

export const arrayStringToComboboxOption = (
  array: string[]
): ComboboxOption[] => {
  return array.map((item) => ({
    label: item,
    value: item,
  }));
};

export const getGradingMethodOptions = (): ComboboxOption[] => {
  const gradingMethodOptions = Object.values(GradingMethod);
  return arrayStringToComboboxOption(gradingMethodOptions);
};

export const getTimeLimitUnitOptions = (): ComboboxOption[] => {
  const units = Object.values(TimeLimitType);
  return arrayStringToComboboxOption(units);
};
