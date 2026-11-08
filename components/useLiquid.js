'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Shared "liquid glass" sliding-indicator logic (iOS-style switch feel).
//
// Usage: put `containerRef` on a position:relative container, register each
// item with `ref={setItemRef(i)}`, and render one absolutely-positioned pill
// element with `style={pillStyle}` behind the items. The pill's position and
// size are MEASURED from the active item's offset box, then animated with a
// springy cubic-bezier(.22, 1.36, .36, 1) transition (~0.55s). While a slide
// is in flight `moving` is true so the pill's inner layer can run the subtle
// "stretch" keyframe. The pill stays invisible (opacity 0) until the first
// measurement lands, so there is no flash on mount; the first measurement
// also skips the moving animation.
export function useLiquidPill(activeIndex) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [pill, setPill] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
  });
  const [moving, setMoving] = useState(false);
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;
  const firstRef = useRef(true);
  const timerRef = useRef(null);

  const setItemRef = useCallback(
    (i) =>
      (el) => {
        itemRefs.current[i] = el;
      },
    []
  );

  const measure = useCallback((idx, animate) => {
    const el = itemRefs.current[idx];
    if (idx < 0 || !el || !containerRef.current) {
      setPill((p) => (p.ready ? { ...p, ready: false } : p));
      firstRef.current = false;
      return;
    }
    setPill({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      ready: true,
    });
    if (animate && !firstRef.current) {
      setMoving(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setMoving(false), 580);
    }
    firstRef.current = false;
  }, []);

  // Slide whenever the active item changes.
  useEffect(() => {
    measure(activeIndex, true);
  }, [activeIndex, measure]);

  // Keep the pill aligned when layout shifts (resize, font swap-in).
  useEffect(() => {
    const remeasure = () => measure(activeRef.current, false);
    window.addEventListener('resize', remeasure);
    const t = setTimeout(remeasure, 350);
    let cancelled = false;
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) remeasure();
        })
        .catch(() => {});
    }
    return () => {
      cancelled = true;
      window.removeEventListener('resize', remeasure);
      clearTimeout(t);
    };
  }, [measure]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const pillStyle = {
    transform: `translate(${pill.left}px, ${pill.top}px)`,
    width: pill.width,
    height: pill.height,
    opacity: pill.ready ? 1 : 0,
  };

  return { containerRef, setItemRef, pillStyle, moving };
}
