import RequestForm from '../../components/RequestForm';
import { IconSend } from '../../components/icons';

export const metadata = {
  title: 'Request a Drama',
  description: 'Ask for a Korean, Chinese drama or Anime to be added to HubCart Movie.',
};

export default function Page() {
  return (
    <div className="shell">
      <h1 className="page-title">
        <IconSend size={26} className="section-title-icon" /> Request a Drama
      </h1>
      <p className="detail-sub" style={{ marginBottom: 10, maxWidth: 560 }}>
        Can&apos;t find a drama? Tell us its name — requests are reviewed from
        Telegram and added based on demand.
      </p>
      <RequestForm />
    </div>
  );
}
