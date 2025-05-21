import { GRADE_PERCENT_OPTIONS } from '@modules/question/constants/question.constant';

export const getGradePercentComboboxOptions = () => {
  return GRADE_PERCENT_OPTIONS.map((option) => ({
    label: option,
    value: option,
  }));
};
