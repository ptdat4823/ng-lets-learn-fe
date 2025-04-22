import { ValidatorFn } from '@angular/forms';
import { ComboboxOption } from '@shared/components/combobox/combobox.type';

export type UpdateOnType = 'change' | 'blur' | 'submit';
export type ComponentType = 'input' | 'select';

export const createControl = (
  defaultValue: any,
  validators: ValidatorFn[] = [],
  updateOn: UpdateOnType = 'submit'
) => [
  defaultValue,
  {
    validators,
    updateOn,
  },
];

export interface FormControlField {
  id: string;
  label: string;
  type: string;
  componentType: ComponentType;
  placeholder: string;
  options?: ComboboxOption[];
  descriptionOnOption?: Record<string, string>;
  description?: string;
  icon?: string;
  validationMessages: { [key: string]: string } | null;
}
