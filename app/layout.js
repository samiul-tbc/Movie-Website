import Link from 'next/link';
import './globals.css';
import TelegramPopup from '../components/TelegramPopup';
import BottomNav from '../components/BottomNav';

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
              🔍 Search
            </Link>
          </div>
        </header>

        <main className="main">{children}</main>

        <section className="join-banner">
          <h2>Join our Telegram Channel</h2>
          <p>New episode updates are announced on Telegram first.</p>
          <a
            href="https://t.me/Rdx_kdrama_hindi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-telegram"
          >
            ✈ Join on Telegram
          </a>
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
