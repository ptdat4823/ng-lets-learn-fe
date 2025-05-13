import { ComboboxOption } from '@shared/components/combobox/combobox.type';
import { FileSizeOption } from '@shared/models/assignment';

export const arrayStringToComboboxOption = (
  array: string[]
): ComboboxOption[] => {
  return array.map((item) => ({
    label: item,
    value: item,
  }));
};

export const getFileSizeOptions = (): ComboboxOption[] => {
  const fileSizes = Object.values(FileSizeOption);
  return arrayStringToComboboxOption(fileSizes);
};
