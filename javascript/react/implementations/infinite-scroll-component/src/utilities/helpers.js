export const isWithinView = (el, fully = true) => {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  const { top, bottom } = rect;

  if (fully) return top >= 0 && bottom <= window.innerHeight;
  else return top < window.innerHeight && bottom >= 0;
};
