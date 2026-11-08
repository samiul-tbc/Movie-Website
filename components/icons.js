// HubCart Movie — inline SVG icon set (Lucide-style, 24px viewBox).
// Stroke icons use stroke="currentColor" strokeWidth={1.8}, round caps/joins.
// Filled icons (Play, Star, Send) use fill="currentColor".
// Every icon accepts { size = 24, className }.

function Svg({ size = 24, className, filled = false, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? undefined : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconPlay({ size = 24, className, circle = false }) {
  if (circle) {
    return (
      <Svg size={size} className={className}>
        <circle cx="12" cy="12" r="9.2" />
        <path
          d="M10 8.6v6.8c0 .6.65.97 1.16.66l5.4-3.4a.78.78 0 0 0 0-1.32l-5.4-3.4A.78.78 0 0 0 10 8.6Z"
          fill="currentColor"
          stroke="none"
        />
      </Svg>
    );
  }
  return (
    <Svg size={size} className={className} filled>
      <path d="M7 4.8v14.4c0 .62.68 1 1.2.67l11.5-7.2a.8.8 0 0 0 0-1.34L8.2 4.13A.8.8 0 0 0 7 4.8Z" />
    </Svg>
  );
}

export function IconStar({ size = 24, className }) {
  return (
    <Svg size={size} className={className} filled>
      <path d="M12 2.6l2.9 6.27 6.9.83-5.1 4.73 1.34 6.83L12 17.83l-6.04 3.43L7.3 14.43 2.2 9.7l6.9-.83L12 2.6Z" />
    </Svg>
  );
}

export function IconEye({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0Z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

export function IconFlame({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </Svg>
  );
}

export function IconHome({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="m3 9.5 9-7 9 7V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22v-8h6v8" />
    </Svg>
  );
}

export function IconSearch({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="11" cy="11" r="7.5" />
      <path d="m21 21-4.35-4.35" />
    </Svg>
  );
}

export function IconGrid({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

// Official Telegram paper-plane glyph (same path as the popup logo).
export function IconSend({ size = 24, className }) {
  return (
    <Svg size={size} className={className} filled>
      <path d="M9.04 15.31l-.38 4.24c.55 0 .79-.24 1.08-.53l2.6-2.48 5.38 3.94c.99.55 1.69.26 1.96-.91L22.9 4.6c.31-1.45-.52-2.02-1.48-1.66L2.4 10.6c-1.42.55-1.4 1.34-.24 1.7l4.86 1.52L18.3 6.36c.53-.35 1.01-.16.62.19L9.04 15.31z" />
    </Svg>
  );
}

export function IconX({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Svg>
  );
}

export function IconChevronLeft({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="m15 18-6-6 6-6" />
    </Svg>
  );
}

export function IconChevronRight({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="m9 18 6-6-6-6" />
    </Svg>
  );
}

export function IconArrowRight({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Svg>
  );
}

export function IconDownload({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </Svg>
  );
}

export function IconInfo({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 16v-4.5" />
      <path d="M12 8h.01" />
    </Svg>
  );
}

export function IconCheck({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M20 6 9 17l-5-5" />
    </Svg>
  );
}

export function IconBolt({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </Svg>
  );
}

export function IconClapper({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
      <path d="m6.2 5.3 3.1 3.9" />
      <path d="m12.4 3.4 3.1 4" />
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    </Svg>
  );
}

export function IconClock({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 6.5V12l3.5 2" />
    </Svg>
  );
}

export function IconCalendar({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="4.5" width="18" height="17" rx="2" />
      <path d="M16 2.5v4" />
      <path d="M8 2.5v4" />
      <path d="M3 10h18" />
    </Svg>
  );
}

export function IconGlobe({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M2.8 12h18.4" />
      <path d="M12 2.8a15.3 15.3 0 0 1 4 9.2 15.3 15.3 0 0 1-4 9.2 15.3 15.3 0 0 1-4-9.2 15.3 15.3 0 0 1 4-9.2z" />
    </Svg>
  );
}

export function IconMonitor({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <rect x="2.5" y="3.5" width="19" height="13.5" rx="2" />
      <path
        d="M10.2 8.1v4.3c0 .45.5.73.9.5l3.6-2.15a.62.62 0 0 0 0-1.05L11.1 7.6a.62.62 0 0 0-.9.5Z"
        fill="currentColor"
        stroke="none"
      />
      <path d="M8.5 20.8h7" />
      <path d="M12 17v3.8" />
    </Svg>
  );
}

export function IconSparkles({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
      <path d="M19.5 2.5v3" />
      <path d="M21 4h-3" />
    </Svg>
  );
}

export function IconLayers({ size = 24, className }) {
  return (
    <Svg size={size} className={className}>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </Svg>
  );
}
