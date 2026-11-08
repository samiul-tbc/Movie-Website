'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  { href: '/', label: 'Home', icon: '⌂', match: (p) => p === '/' },
  { href: '/search', label: 'Search', icon: '🔍', match: (p) => p.startsWith('/search') },
  {
    href: '/#categories',
    label: 'Categories',
    icon: '▦',
    match: (p) => p.startsWith('/category'),
  },
];

export default function BottomNav() {
  const pathname = usePathname() || '/';

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {ITEMS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={item.match(pathname) ? 'active' : undefined}
        >
          <span className="bn-icon" aria-hidden="true">{item.icon}</span>
          {item.label}
        </Link>
      ))}
      <a href="https://t.me/Rdx_kdrama_hindi" target="_blank" rel="noopener noreferrer">
        <span className="bn-icon" aria-hidden="true">✈</span>
        Telegram
      </a>
    </nav>
  );
}
