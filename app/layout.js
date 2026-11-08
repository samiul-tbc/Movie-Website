import Link from 'next/link';
import './globals.css';
import TelegramPopup from '../components/TelegramPopup';

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

        <main className="shell">{children}</main>

        <section className="join-banner">
          <h2>Join our Telegram Channel</h2>
          <p>New episode updates are announced on Telegram first.</p>
          <a
            href="https://t.me/Rdx_kdrama_hindi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-telegram"
          >
            Join on Telegram
          </a>
        </section>

        <footer className="footer">
          <p className="footer-brand">HubCart <span>Movie</span></p>
          <nav className="footer-nav">
            <Link href="/">Home</Link>
            <Link href="/category/korean">Korean Drama</Link>
            <Link href="/category/chinese">Chinese Drama</Link>
            <Link href="/category/anime">Anime</Link>
            <Link href="/category/movies">Movies</Link>
            <Link href="/admin">Admin</Link>
          </nav>
          <p className="footer-note">
            HubCart Movie is a catalog demo. All sample titles and images are
            placeholders — only publish content you have the rights to share.
          </p>
        </footer>

        <TelegramPopup />
      </body>
    </html>
  );
}
