import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from './TopBar';
import { courses } from '../lib/catalog';

export default function Home() {
  useEffect(() => { document.title = '학습'; }, []);
  return (
    <div className="app">
      <TopBar />
      <main className="page">
        <h1>학습</h1>
        {courses.length ? (
          <div className="cards">
            {courses.map((c) => {
              const ready = c.units.filter((u) => u.lessonKey).length;
              return (
                <Link className="card" key={c.slug} to={`/${c.slug}`}>
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
