'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconHome, IconSearch, IconGrid, IconSend } from './icons';

const ITEMS = [
  { href: '/', label: 'Home', Icon: IconHome, match: (p) => p === '/' },
  { href: '/search', label: 'Search', Icon: IconSearch, match: (p) => p.startsWith('/search') },
  {
    href: '/#categories',
    label: 'Categories',
    Icon: IconGrid,
    match: (p) => p.startsWith('/category'),
  },
];

export default function BottomNav() {
  const pathname = usePathname() || '/';

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {ITEMS.map((item) => {
        const Icon = item.Icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={item.match(pathname) ? 'active' : undefined}
          >
            <span className="bn-icon" aria-hidden="true">
              <Icon size={24} />
            </span>
            {item.label}
          </Link>
        );
      })}
      <a href="https://t.me/Rdx_kdrama_hindi" target="_blank" rel="noopener noreferrer">
        <span className="bn-icon" aria-hidden="true">
          <IconSend size={24} />
        </span>
        Telegram
      </a>
    </nav>
  );
}
