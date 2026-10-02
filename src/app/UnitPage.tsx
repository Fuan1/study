import { Suspense, useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import TopBar from './TopBar';
import NotFound from './NotFound';
import { getCourse, getLessonComponent } from '../lib/catalog';
import type { Course, FlatUnit } from '../lib/types';
import { components } from '../kit';

type Section = { id: string; text: string; num: string };

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollToId = (id: string, smooth = true) =>
  document.getElementById(id)?.scrollIntoView({ behavior: smooth && !reduceMotion() ? 'smooth' : 'auto', block: 'start' });

/** 지금 글의 ## 섹션 목록과, 스크롤 위치에 해당하는 섹션(현재 위치)을 계산한다. */
function useSections(unitId: string) {
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    setSections([]);
    setActive('');
    const root = document.querySelector('.article-body');
    if (!root) return;
    let last = '';
    const read = () => {
      const hs = [...root.querySelectorAll<HTMLElement>('h2')];
      const key = hs.map((h) => h.id).join('|');
      if (key === last) return;
      last = key;
      setSections(hs.map((h, i) => ({ id: h.id, text: h.textContent ?? '', num: `${i + 1}.` })));
    };
    read();
    const mo = new MutationObserver(read); // 단원이 늦게 불러와져도 따라간다
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [unitId]);

  useEffect(() => {
    if (!sections.length) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let cur = '';
        for (const s of sections) {
          const el = document.getElementById(s.id);
          if (el && el.getBoundingClientRect().top <= 110) cur = s.id; else if (el) break;
        }
        setActive(cur);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [sections]);

  return { sections, active };
}

function Toc({ course, currentId, sections, active, onPick }: { course: Course; currentId: string; sections: Section[]; active: string; onPick: (id: string) => void }) {
  return (
    <nav id="toc" className="toc" aria-label="글 목록">
      <Link className="toc-back press" to="/">← 과정 목록</Link>
      <h2 className="toc-title">{course.title}</h2>
      {course.stages.map((s) => (
        <section className="toc-stage" key={s.title}>
          <h3>{s.title}</h3>
          <ol>
            {s.units.map((u) => {
              const unit = course.units.find((x) => x.id === u.id);
              const current = u.id === currentId;
              return (
                <li key={u.id}>
                  <Link className={`toc-unit press${unit?.lessonKey ? '' : ' soon'}`} to={`/${course.slug}/${u.id}`} aria-current={current ? 'page' : undefined}>
                    {u.title}
                    {!unit?.lessonKey && <span className="soon-tag">준비 중</span>}
                  </Link>
                  {current && sections.length > 0 && (
                    <ol className="toc-sections" aria-label="이 글의 섹션">
                      {sections.map((sec) => (
                        <li key={sec.id}>
                          <button type="button" className="toc-sec press" aria-current={sec.id === active ? 'true' : undefined} onClick={() => onPick(sec.id)}>
                            {sec.text}
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
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
      <Link className={`pg pg-${dir} press`} to={`/${course.slug}/${u.id}`} rel={dir}>
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

const Skeleton = () => <div className="skel" aria-busy="true" aria-label="불러오는 중">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>;

export default function UnitPage() {
  const { slug = '', unitId = '' } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const course = getCourse(slug);
  const [tocOpen, setTocOpen] = useState(false);
  const idx = course ? course.units.findIndex((u) => u.id === unitId) : -1;
  const { sections, active } = useSections(unitId);
  const pendingSection = (location.state as { section?: string } | null)?.section;

  useEffect(() => {
    window.scrollTo(0, 0);
    setTocOpen(false);
  }, [slug, unitId]);

  // 검색 결과에서 섹션을 골라 들어온 경우 그 섹션으로 이동
  useEffect(() => {
    if (!pendingSection || !sections.some((s) => s.id === pendingSection) && pendingSection !== '__top') return;
    if (pendingSection !== '__top') requestAnimationFrame(() => scrollToId(pendingSection, false));
    navigate(location.pathname, { replace: true, state: null });
  }, [pendingSection, sections, navigate, location.pathname]);

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

  const pick = useCallback((id: string) => { setTocOpen(false); scrollToId(id); }, []);

  if (!course || idx < 0) return <NotFound message={course ? `글을 찾지 못했습니다: ${unitId}` : `과정을 찾지 못했습니다: ${slug}`} />;

  const unit = course.units[idx];
  const Lesson = unit.lessonKey ? getLessonComponent(unit.lessonKey) : null;
  const current = sections.find((s) => s.id === active);

  return (
    <div className={`app${tocOpen ? ' toc-open' : ''}`}>
      <TopBar title={unit.title} section={current ? `${current.num} ${current.text}` : undefined} menu={{ open: tocOpen, onToggle: () => setTocOpen((o) => !o) }} />
      <div className="layout">
        <Toc course={course} currentId={unit.id} sections={sections} active={active} onPick={pick} />
        <button className="scrim" type="button" aria-label="목차 닫기" tabIndex={-1} onClick={() => setTocOpen(false)} />
        <main className="main">
          <article className="article">
            <ArticleHead course={course} unit={unit} />
            <div className="article-body">
              {Lesson ? (
                <MDXProvider components={components}>
                  <Suspense fallback={<Skeleton />}>
                    <Lesson />
                  </Suspense>
                </MDXProvider>
              ) : (
                <p className="muted">아직 쓰지 않은 글입니다.{unit.summary ? ` 다룰 내용: ${unit.summary}` : ''}</p>
              )}
            </div>
          </article>
        </main>
      </div>
      <Pager course={course} idx={idx} />
    </div>
  );
}
