import { useEffect, useRef, useState } from "react";

const getTargetByScreenWidth = (width: number): components.TargetType => {
  if (width >= 1440) {
    return 'desktop_wide';
  } else if (width >= 1024) {
    return 'desktop';
  } else if (width >= 768) {
    return 'tablet';
  }

  return 'mobile';
};

export const useWindowTargetManager = (): components.TargetType => {
  const [curTarget, setCurTarget] = useState<components.TargetType>('desktop');
  const target = useRef<components.TargetType>();

  const onResize = (): void => {
    const newTarget = getTargetByScreenWidth(window.innerWidth);
    if (target.current !== newTarget) {
      target.current = newTarget;
      setCurTarget(newTarget);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      target.current = getTargetByScreenWidth(window.innerWidth);
      window.addEventListener('resize', onResize);
      setCurTarget(target.current);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
      }
    };
  }, []);

  return curTarget;
}