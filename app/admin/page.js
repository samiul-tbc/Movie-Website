import AdminForm from '../../components/AdminForm';

export const metadata = {
  title: 'Admin — Add a Drama',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="shell">
      <div className="page-head">
        <h1 className="page-title">Admin (v1)</h1>
      </div>
      <p className="page-sub">
        Phase 1 has no database or login yet. Dramas live in{' '}
        <code>lib/dramas.js</code> — use the form below to generate a ready-to-paste
        entry, add it to the <code>dramas</code> array, commit and redeploy.
        A database-backed admin panel is planned for Phase 2.
      </p>
      <AdminForm />
    </section>
  );
}
