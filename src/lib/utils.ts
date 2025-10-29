export const scrollToElement = (elementId: string) => {
  const elementEl = document.getElementById(elementId);
  if (elementEl) {
    elementEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
