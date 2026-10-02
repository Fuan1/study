import { Children, cloneElement, isValidElement, useEffect, useLayoutEffect, useRef, useState, type ComponentProps, type ReactElement, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../lib/catalog';

const textOf = (children: ReactNode) =>
  Children.toArray(children).map((c) => (typeof c === 'string' || typeof c === 'number' ? String(c) : '')).join('');
export const slugify = (s: string) => s.trim().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '');

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

const RULE_TAGS: Record<string, string> = { 해라: 'rule-do', '하지 마라': 'rule-dont', 기준값: 'rule-val' };

/** "해라:", "하지 마라:", "기준값:" 로 시작하는 목록 항목은 앞에 색 태그를 붙여 훑어보기 쉽게 한다. 다른 항목은 그대로 둔다. */
function tagRules(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement(child) || child.type !== 'ul') return child;
    const ul = child as ReactElement<{ children?: ReactNode }>;
    const items = Children.map(ul.props.children, (li) => {
      if (!isValidElement(li)) return li;
      const item = li as ReactElement<{ children?: ReactNode }>;
      const kids = Children.toArray(item.props.children);
      const first = kids[0];
      const m = typeof first === 'string' ? first.match(/^(해라|하지 마라|기준값)\s*:\s*/) : null;
      if (!m) return li;
      return cloneElement(item, {}, <span className={`rule-tag ${RULE_TAGS[m[1]]}`}>{m[1]}</span>, <span>{(first as string).slice(m[0].length)}{kids.slice(1)}</span>);
    });
    return cloneElement(ul, { className: 'rules' } as object, items);
  });
}

/** 글 맨 위의 핵심 규칙 요약(명령형 3~5개). */
export function Overview({ label = '핵심 규칙', children }: { label?: string; children: ReactNode }) {
  return <section className="overview" aria-label={label}><div className="label">{label}</div>{tagRules(children)}</section>;
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
    <details className="toc-inline">
      <summary>
        <span>목차<small>{items.filter((it) => it.level === 2).length}개 섹션</small></span>
      </summary>
      <ol>
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? 'sub' : undefined}>
            <a href={`#${it.id}`} onClick={go(it.id)}><span className="num">{it.num}</span>{it.text}</a>
          </li>
        ))}
      </ol>
    </details>
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
export function Rel({ to, note, course }: { to: string; note?: string; course?: string }) {
  const { slug: here = '' } = useParams();
  const slug = course ?? here;
  const target = getCourse(slug);
  const unit = target?.units.find((u) => u.id === to);
  if (!target || !unit) return null;
  // 다른 과정의 글이면 과정 이름을 앞에 붙인다.
  const label = course && course !== here ? `${target.title} · ${unit.title}` : unit.title;
  return (
    <li>
      <Link to={`/${slug}/${to}`}>{label}{unit.lessonKey ? '' : ' (준비 중)'}</Link>
      {note && <span className="muted"> — {note}</span>}
    </li>
  );
}
