import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: {
    default: 'DramaHub — Korean, Chinese Dramas & Anime in Hindi Dubbed',
    template: '%s — DramaHub',
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
              Drama<span>Hub</span>
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
          {/* TODO: replace '#' with the real channel link when the site is renamed */}
          <a href="#" className="btn-telegram">Join on Telegram</a>
        </section>

        <footer className="footer">
          <p className="footer-brand">Drama<span>Hub</span></p>
          <nav className="footer-nav">
            <Link href="/">Home</Link>
            <Link href="/category/korean">Korean Drama</Link>
            <Link href="/category/chinese">Chinese Drama</Link>
            <Link href="/category/anime">Anime</Link>
            <Link href="/category/movies">Movies</Link>
            <Link href="/admin">Admin</Link>
          </nav>
          <p className="footer-note">
            DramaHub is a catalog demo. All sample titles and images are
            placeholders — only publish content you have the rights to share.
          </p>
        </footer>
      </body>
    </html>
  );
}
