export const getCardOrigin = (el) => {
  const parent = el.parentElement;
  if (!parent) return "center";

  const p = parent.getBoundingClientRect();
  const c = el.getBoundingClientRect();
  const rel = (c.left + c.width / 2 - p.left) / p.width;

  if (rel < 0.34) return "left";
  if (rel > 0.66) return "right";
  return "center";
};