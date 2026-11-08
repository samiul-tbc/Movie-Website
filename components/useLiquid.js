'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Shared "liquid glass" sliding-indicator logic with the FLUID LENS
// animation (ported from Hub Cart's bottom nav, commit e9bcfa2):
//
// On a real switch (target more than 24px away) the pill does NOT slide
// rigidly. Phase 1 (180ms ease-out): it stretches like a lens to cover
// the UNION of the old and new positions. Phase 2 (0.45s spring
// cubic-bezier(.34, 1.45, .44, 1)): it settles onto the target item.
// Short hops and first placement skip the stretch and spring directly.
//
// Usage: put `containerRef` on a position:relative container, register
// each item with `ref={setItemRef(i)}`, and render one absolutely
// positioned pill element with `style={pillStyle}` behind the items.
// The pill is invisible until the first measurement lands (no flash),
// and when no item is active (index < 0) the stored position resets so
// a later appearance never stretches from a stale spot.
const SPRING =
  'transform .45s cubic-bezier(.34, 1.45, .44, 1), width .45s cubic-bezier(.34, 1.45, .44, 1), height .45s cubic-bezier(.34, 1.45, .44, 1), opacity .2s ease';
const STRETCH =
  'transform .18s ease-out, width .18s ease-out, height .18s ease-out, opacity .2s ease';

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
  const [trans, setTrans] = useState(SPRING);
  const [moving, setMoving] = useState(false);
  const pillRef = useRef({ left: 0, top: 0, width: 0, height: 0, ready: false });
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;
  const timerRef = useRef(null);
  const moveTimerRef = useRef(null);

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
      // No active item: hide the pill and forget the position, so the
      // next appearance never stretches from a stale spot.
      pillRef.current = { left: 0, top: 0, width: 0, height: 0, ready: false };
      if (timerRef.current) clearTimeout(timerRef.current);
      setPill((p) => (p.ready ? { ...p, ready: false } : p));
      return;
    }

    const target = {
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      ready: true,
    };
    const prev = pillRef.current;
    const dx = Math.abs(target.left - prev.left);
    const dy = Math.abs(target.top - prev.top);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (animate && prev.ready && (dx > 24 || dy > 24)) {
      // Fluid lens: stretch to the union of old + new, then spring-settle.
      const l = Math.min(prev.left, target.left);
      const t = Math.min(prev.top, target.top);
      const r = Math.max(prev.left + prev.width, target.left + target.width);
      const b = Math.max(prev.top + prev.height, target.top + target.height);
      const stretched = { left: l, top: t, width: r - l, height: b - t, ready: true };
      setTrans(STRETCH);
      pillRef.current = stretched;
      setPill(stretched);
      setMoving(true);
      timerRef.current = setTimeout(() => {
        setTrans(SPRING);
        pillRef.current = target;
        setPill(target);
      }, 185);
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
      moveTimerRef.current = setTimeout(() => setMoving(false), 660);
    } else {
      setTrans(SPRING);
      pillRef.current = target;
      setPill(target);
      if (animate && prev.ready) {
        setMoving(true);
        if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
        moveTimerRef.current = setTimeout(() => setMoving(false), 480);
      }
    }
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
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    },
    []
  );

  const pillStyle = {
    transform: `translate(${pill.left}px, ${pill.top}px)`,
    width: pill.width,
    height: pill.height,
    opacity: pill.ready ? 1 : 0,
    transition: trans,
  };

  return { containerRef, setItemRef, pillStyle, moving };
}
