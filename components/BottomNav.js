'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { IconHome, IconSearch, IconGrid, IconSend } from './icons';
import { useLiquidPill } from './useLiquid';

const TELEGRAM_URL = 'https://t.me/Rdx_kdrama_hindi';

const ITEMS = [
  { href: '/', label: 'Home', Icon: IconHome, match: (p) => p === '/' },
  {
    href: '/search',
    label: 'Search',
    Icon: IconSearch,
    match: (p) => p.startsWith('/search'),
  },
  {
    href: '/#categories',
    label: 'Categories',
    Icon: IconGrid,
    match: (p) => p.startsWith('/category'),
  },
  {
    href: TELEGRAM_URL,
    label: 'Telegram',
    Icon: IconSend,
    external: true,
    match: () => false,
  },
];

function matchIndex(pathname) {
  return ITEMS.findIndex((item) => item.match(pathname));
}

export default function BottomNav() {
  const pathname = usePathname() || '/';
  // Active index is local state (not just the route) so a tap slides the
  // liquid pill to the tapped item BEFORE navigation happens.
  const [active, setActive] = useState(() => matchIndex(pathname));
  const { containerRef, setItemRef, pillStyle, moving } = useLiquidPill(active);

  // Re-sync with the route on real navigation (back/forward, deep links).
  useEffect(() => {
    setActive(matchIndex(pathname));
  }, [pathname]);

  const handleClick = (item, i) => {
    setActive(i);
    if (item.external) {
      // Telegram opens in a new tab; glide the pill back to the current
      // route's item shortly after the tap.
      setTimeout(() => setActive(matchIndex(pathname)), 950);
    }
  };

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation" ref={containerRef}>
      <span
        className={moving ? 'bn-pill moving' : 'bn-pill'}
        style={pillStyle}
        aria-hidden="true"
      >
        <span className="bn-pill-inner" />
      </span>
      {ITEMS.map((item, i) => {
        const Icon = item.Icon;
        const inner = (
          <>
            <span className="bn-icon" aria-hidden="true">
              <Icon size={24} />
            </span>
            {item.label}
          </>
        );
        const shared = {
          ref: setItemRef(i),
          className: i === active ? 'active' : undefined,
          onClick: () => handleClick(item, i),
        };
        return item.external ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            {...shared}
          >
            {inner}
          </a>
        ) : (
          <Link key={item.label} href={item.href} {...shared}>
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
