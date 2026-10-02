import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar, { SearchIcon } from './TopBar';
import { courses } from '../lib/catalog';

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  useEffect(() => { document.title = '학습'; }, []);
  return (
    <div className="app">
      <TopBar />
      <main className="page">
        <h1>학습</h1>
        <form className="searchbox" role="search" onSubmit={(e) => { e.preventDefault(); navigate(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/search'); }}>
          <SearchIcon size={20} />
          <input type="search" inputMode="search" enterKeyHint="search" autoComplete="off" placeholder="상황이나 증상으로 찾기 (예: 로딩이 길다)" aria-label="검색어" value={q} onChange={(e) => setQ(e.target.value)} />
        </form>
        {courses.length ? (
          <div className="cards">
            {courses.map((c) => {
              const ready = c.units.filter((u) => u.lessonKey).length;
              return (
                <Link className="card press" key={c.slug} to={`/${c.slug}`}>
                  <h2>{c.title}</h2>
                  {c.description && <p>{c.description}</p>}
                  <span className="meta">{ready ? `글 ${ready}편` : '글 준비 중'}</span>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="muted">등록된 과정이 없습니다. 분야 폴더에 course.json 을 추가하세요.</p>
        )}
      </main>
    </div>
  );
}
