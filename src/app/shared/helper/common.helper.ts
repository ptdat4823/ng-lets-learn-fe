export const scrollToComponentWithId = (id: string) => {
  const element = document.querySelector(`#${id}`);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

export const scrollToFirstInvalidField = () => {
  const firstInvalidControl = document.querySelector('form .ng-invalid') as HTMLElement;
  if (!firstInvalidControl) return;
  firstInvalidControl.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
  firstInvalidControl.focus();
};
