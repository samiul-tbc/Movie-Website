import MyListPage from '../../components/MyListPage';
import { IconBookmark } from '../../components/icons';

export const metadata = {
  title: 'My List',
  description: 'Dramas you saved on this device.',
};

export default function Page() {
  return (
    <div className="shell">
      <h1 className="page-title">
        <IconBookmark size={26} className="section-title-icon" /> My List
      </h1>
      <MyListPage />
    </div>
  );
}
