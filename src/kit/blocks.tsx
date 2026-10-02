import { Children, useEffect, useLayoutEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../lib/catalog';

const textOf = (children: ReactNode) =>
  Children.toArray(children).map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : '')).join('');
const slugify = (s: string) => s.trim().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '');

/** 번호는 CSS counter 로 붙고(1., 1.1), 목차는 이 id 로 이동한다. */
export const H2 = ({ children }: { children?: ReactNode }) => <h2 id={slugify(textOf(children))}>{children}</h2>;
export const H3 = ({ children }: { children?: ReactNode }) => <h3 id={slugify(textOf(children))}>{children}</h3>;

/** 3열 이상 표는 좁은 화면에서 행을 카드로 쌓는다(CSS). 열 제목을 각 칸의 data-label 로 복사해 둔다. */
export function Table(props: ComponentProps<'table'>) {
  const wrap = useRef<HTMLDivElement>(null);
  const [stack, setStack] = useState(false);
  useLayoutEffect(() => {
    const table = wrap.current?.querySelector('table');
    if (!table) return;
    const labels = [...table.querySelectorAll('thead th')].map((th) => th.textContent ?? '');
    table.querySelectorAll('tbody tr').forEach((tr) => [...tr.children].forEach((td, i) => td.setAttribute('data-label', labels[i] ?? '')));
    setStack(labels.length >= 3);
  }, []);
  return <div ref={wrap} className={`table-wrap${stack ? ' stack' : ''}`}><table {...props} /></div>;
}

export function A({ href = '', children }: { href?: string; children?: ReactNode }) {
  const external = /^https?:/.test(href);
  return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
}

/** 글머리 요약. 글 맨 위에 둔다. */
export function Overview({ children }: { children: ReactNode }) {
  return <section className="overview" aria-label="개요"><div className="label">개요</div>{children}</section>;
}

/** 본문의 h2/h3 로 목차를 자동 생성한다. 개요 바로 아래에 `<Toc />` 를 둔다. */
export function Toc() {
  const [items, setItems] = useState<{ id: string; text: string; level: 2 | 3; num: string }[]>([]);
  useEffect(() => {
    const hs = document.querySelectorAll<HTMLElement>('.article-body h2, .article-body h3');
    let a = 0;
    let b = 0;
    setItems([...hs].map((h) => {
      if (h.tagName === 'H2') { a += 1; b = 0; return { id: h.id, text: h.textContent ?? '', level: 2, num: `${a}.` }; }
      b += 1;
      return { id: h.id, text: h.textContent ?? '', level: 3, num: `${a}.${b}` };
    }));
  }, []);
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault(); // 해시 라우팅과 충돌하지 않도록 직접 스크롤
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };
  return (
    <nav className="toc-inline" aria-label="이 글의 목차">
      <div className="label">목차</div>
      <ol>
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? 'sub' : undefined}>
            <a href={`#${it.id}`} onClick={go(it.id)}><span className="num">{it.num}</span>{it.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** kind: note = 참고, warn = 주의 */
export function Callout({ kind = 'note', title, children }: { kind?: 'note' | 'warn'; title?: string; children: ReactNode }) {
  return (
    <aside className={`callout ${kind}`}>
      <div className="callout-title">{title ?? (kind === 'warn' ? '주의' : '참고')}</div>
      {children}
    </aside>
  );
}

/** 도식 한 장 = 주장 하나. caption 에 그 주장을 쓴다. "그림 N." 은 자동으로 붙는다. */
export function Figure({ caption, children }: { caption?: ReactNode; children: ReactNode }) {
  return (
    <figure>
      <div className="fig">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** 본문 각주 번호. 맨 아래 <Sources> 의 같은 번호로 이동한다. */
export function Ref({ n }: { n: number }) {
  return (
    <sup>
      <button
        type="button"
        className="ref"
        aria-label={`출처 ${n}`}
        onClick={() => document.getElementById(`ref-${n}`)?.scrollIntoView({ block: 'center' })}
      >
        [{n}]
      </button>
    </sup>
  );
}
export function Sources({ children }: { children: ReactNode }) {
  return <ol className="sources">{children}</ol>;
}
export function Source({ n, children }: { n: number; children: ReactNode }) {
  return <li id={`ref-${n}`} value={n}>{children}</li>;
}

/** 관련 글 링크. to 는 같은 과정의 단원 id. 제목은 course.json 에서 가져온다. */
export function Related({ children }: { children: ReactNode }) {
  return <ul className="related">{children}</ul>;
}
export function Rel({ to, note }: { to: string; note?: string }) {
  const { slug = '' } = useParams();
  const unit = getCourse(slug)?.units.find((u) => u.id === to);
  if (!unit) return null;
  return (
    <li>
      <Link to={`/${slug}/${to}`}>{unit.title}{unit.lessonKey ? '' : ' (준비 중)'}</Link>
      {note && <span className="muted"> — {note}</span>}
    </li>
  );
}
