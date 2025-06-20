export const scrollToComponentWithId = (id: string) => {
  const element = document.querySelector(`#${id}`);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

export const scrollTo = (selector: string, options?: { shouldFocus?: boolean; block?: ScrollLogicalPosition; behavior?: ScrollBehavior }) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (!element) return;
  
  const scrollOptions = {
    behavior: options?.behavior || 'smooth' as ScrollBehavior,
    block: options?.block || 'center' as ScrollLogicalPosition,
  };
  
  element.scrollIntoView(scrollOptions);
  
  if (options?.shouldFocus !== false) {
    element.focus();
  }
};

export const scrollToFirstInvalidField = () => {
  scrollTo('form .ng-invalid');
};
