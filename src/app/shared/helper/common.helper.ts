export const scrollToComponentWithId = (id: string) => {
  const element = document.querySelector(`#${id}`);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};
