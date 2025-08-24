import { useCallback } from "react";

type ScrollOptions = {
  behavior?: ScrollBehavior;
  top?: number;
  left?: number;
  container?: HTMLElement | null;
};

export const useScrollTop = () => {
  const scrollToTop = useCallback((options?: ScrollOptions) => {
    if (typeof window === "undefined") return;
    const { behavior = "smooth", top = 0, left = 0, container } = options || {};
    const target: Window | HTMLElement = container ?? window;

    try {
      target.scrollTo({ top, left, behavior });
      return;
    } catch (_e) {}

    if (container) {
      container.scrollTop = top;
      container.scrollLeft = left;
    } else {
      window.scrollTo(left, top);
    }
  }, []);

  return scrollToTop;
};
