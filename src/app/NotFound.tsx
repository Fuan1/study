import { Link } from 'react-router-dom';
import TopBar from './TopBar';

export default function NotFound({ message = '찾을 수 없는 주소입니다.' }: { message?: string }) {
  return (
    <div className="app">
      <TopBar />
      <main className="page">
        <h1>열 수 없습니다</h1>
        <p className="muted">{message}</p>
        <Link className="btn" to="/">목록으로</Link>
      </main>
    </div>
  );
}
