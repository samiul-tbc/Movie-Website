import Link from 'next/link';
import './globals.css';
import TelegramPopup from '../components/TelegramPopup';
import BottomNav from '../components/BottomNav';
import { IconSearch, IconSend, IconArrowRight } from '../components/icons';

export const metadata = {
  title: {
    default: 'HubCart Movie — Korean, Chinese Dramas & Anime in Hindi Dubbed',
    template: '%s — HubCart Movie',
  },
  description:
    'Watch Korean dramas, Chinese dramas and Anime in Hindi Dubbed. Episode-wise updates in 720p HD and 1080p Full HD.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="header-inner">
            <Link href="/" className="logo">
              <span className="logo-dot" aria-hidden="true" />
              HubCart <span>Movie</span>
            </Link>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/category/korean">Korean</Link>
              <Link href="/category/chinese">Chinese</Link>
              <Link href="/category/anime">Anime</Link>
              <Link href="/category/movies">Movies</Link>
            </nav>
            <Link href="/search" className="search-link" aria-label="Search">
              <IconSearch size={16} /> Search
            </Link>
          </div>
        </header>

        <main className="main">{children}</main>

        <section className="tg-cta" aria-label="Join our Telegram channel">
          <span className="tg-cta-watermark" aria-hidden="true">
            <IconSend size={320} />
          </span>
          <div className="tg-cta-inner">
            <div className="tg-cta-main">
              <span className="tg-cta-logo" aria-hidden="true">
                <IconSend size={32} />
              </span>
              <div className="tg-cta-text">
                <h2>Get Episodes First on Telegram</h2>
                <p>
                  New episodes and dramas are announced on our Telegram channel
                  before anywhere else.
                </p>
                <span className="tg-cta-handle">
                  <IconSend size={13} /> @Rdx_kdrama_hindi
                </span>
              </div>
            </div>
            <a
              href="https://t.me/Rdx_kdrama_hindi"
              target="_blank"
              rel="noopener noreferrer"
              className="tg-cta-btn"
            >
              <IconSend size={18} /> Join Channel{' '}
              <IconArrowRight size={17} className="tg-cta-btn-arrow" />
            </a>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-grid">
              <div>
                <p className="footer-brand">
                  <span className="logo-dot" aria-hidden="true" />
                  HubCart <span>Movie</span>
                </p>
                <p className="footer-tag">
                  Korean, Chinese dramas &amp; Anime in Hindi Dubbed — episode-wise
                  updates in 720p HD and 1080p Full HD, announced first on Telegram.
                </p>
              </div>
              <div>
                <h4>Categories</h4>
                <div className="footer-col">
                  <Link href="/category/korean">Korean Drama</Link>
                  <Link href="/category/chinese">Chinese Drama</Link>
                  <Link href="/category/anime">Anime</Link>
                  <Link href="/category/movies">Movies</Link>
                </div>
              </div>
              <div>
                <h4>Quick Links</h4>
                <div className="footer-col">
                  <Link href="/">Home</Link>
                  <Link href="/search">Search</Link>
                  <a
                    href="https://t.me/Rdx_kdrama_hindi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram Channel
                  </a>
                  <Link href="/admin">Admin</Link>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-note">
                Disclaimer: HubCart Movie is a catalog demo. All sample titles,
                posters and images are placeholders — only publish content you
                have the rights to share.
              </p>
              <p className="footer-copy">© 2026 HubCart Movie</p>
            </div>
          </div>
        </footer>

        <BottomNav />
        <TelegramPopup />
      </body>
    </html>
  );
}
