export const join = (str1: string, str2: string) => `${str1} ${str2}`;

export const getOffsets = (parent: HTMLElement, child: HTMLElement) => {
  const parentRect = parent.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  return {
    top: parentRect.top - childRect.top,
    right: parentRect.right - childRect.right,
    bottom: parentRect.bottom - childRect.bottom,
    left: parentRect.left - childRect.left,
  };
};