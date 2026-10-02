import { Suspense, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import TopBar from './TopBar';
import NotFound from './NotFound';
import { getCourse, getLessonComponent } from '../lib/catalog';
import type { Course, FlatUnit } from '../lib/types';
import { components } from '../kit';

function Toc({ course, currentId }: { course: Course; currentId: string }) {
  return (
    <nav id="toc" className="toc" aria-label="글 목록">
      <Link className="toc-back" to="/">← 과정 목록</Link>
      <h2 className="toc-title">{course.title}</h2>
      {course.stages.map((s) => (
        <section className="toc-stage" key={s.title}>
          <h3>{s.title}</h3>
          <ol>
            {s.units.map((u) => {
              const ready = course.units.find((x) => x.id === u.id)?.lessonKey;
              return (
                <li key={u.id}>
                  <Link className={`toc-unit${ready ? '' : ' soon'}`} to={`/${course.slug}/${u.id}`} aria-current={u.id === currentId ? 'page' : undefined}>
                    {u.title}
                    {!ready && <span className="soon-tag">준비 중</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </nav>
  );
}

function Pager({ course, idx }: { course: Course; idx: number }) {
  const prev = course.units[idx - 1];
  const next = course.units[idx + 1];
  const cell = (u: FlatUnit | undefined, dir: 'prev' | 'next') =>
    u ? (
      <Link className={`pg pg-${dir}`} to={`/${course.slug}/${u.id}`} rel={dir}>
        <small>{dir === 'prev' ? '← 이전' : '다음 →'}</small>
        <span>{u.title}</span>
      </Link>
    ) : (
      <span className={`pg pg-${dir} off`} aria-hidden="true" />
    );
  return <nav className="pager" aria-label="글 이동">{cell(prev, 'prev')}{cell(next, 'next')}</nav>;
}

function ArticleHead({ course, unit }: { course: Course; unit: FlatUnit }) {
  return (
    <header className="article-head">
      <div className="kicker">{course.title} · {unit.stage}</div>
      <h1>{unit.title}</h1>
    </header>
  );
}

export default function UnitPage() {
  const { slug = '', unitId = '' } = useParams();
  const navigate = useNavigate();
  const course = getCourse(slug);
  const [tocOpen, setTocOpen] = useState(false);
  const idx = course ? course.units.findIndex((u) => u.id === unitId) : -1;

  useEffect(() => {
    window.scrollTo(0, 0);
    setTocOpen(false);
  }, [slug, unitId]);

  useEffect(() => {
    if (course && idx >= 0) document.title = `${course.units[idx].title} · ${course.title}`;
  }, [course, idx]);

  useEffect(() => {
    if (!course || idx < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const to = e.key === 'ArrowRight' ? course.units[idx + 1] : e.key === 'ArrowLeft' ? course.units[idx - 1] : undefined;
      if (to) navigate(`/${course.slug}/${to.id}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [course, idx, navigate]);

  if (!course || idx < 0) return <NotFound message={course ? `글을 찾지 못했습니다: ${unitId}` : `과정을 찾지 못했습니다: ${slug}`} />;

  const unit = course.units[idx];
  const Lesson = unit.lessonKey ? getLessonComponent(unit.lessonKey) : null;

  return (
    <div className={`app${tocOpen ? ' toc-open' : ''}`}>
      <TopBar crumb={unit.title} menu={{ open: tocOpen, onToggle: () => setTocOpen((o) => !o) }} />
      <div className="layout">
        <Toc course={course} currentId={unit.id} />
        <button className="scrim" type="button" aria-label="목차 닫기" tabIndex={-1} onClick={() => setTocOpen(false)} />
        <main className="main">
          <article className="article">
            <ArticleHead course={course} unit={unit} />
            <div className="article-body">
              {Lesson ? (
                <MDXProvider components={components}>
                  <Suspense fallback={<p className="muted">불러오는 중</p>}>
                    <Lesson />
                  </Suspense>
                </MDXProvider>
              ) : (
                <p className="muted">
                  아직 쓰지 않은 글입니다.{unit.summary ? ` 다룰 내용: ${unit.summary}` : ''}
                </p>
              )}
            </div>
          </article>
        </main>
      </div>
      <Pager course={course} idx={idx} />
    </div>
  );
}
