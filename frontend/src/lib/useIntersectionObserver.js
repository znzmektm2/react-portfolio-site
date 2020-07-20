import { useEffect } from "react";

export default ({
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = "-110px",
}) => {
  useEffect(() => {
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [target, rootMargin, onIntersect, threshold]);
};
