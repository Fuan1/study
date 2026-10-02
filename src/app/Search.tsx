import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import TopBar, { SearchIcon } from './TopBar';
import { loadIndex, search, tokensOf, type Entry } from '../lib/search';

// 막혔을 때 떠오르는 말을 미리 보여 준다(떠올려서 입력하지 않아도 되게).
const SUGGESTIONS = ['로딩', '버튼 크기', '메뉴 항목 수', '오류 메시지', '인터뷰 질문', '대비', '다크패턴', '가설', 'A/B'];

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (!tokens.length) return <>{text}</>;
  const re = new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  return <>{text.split(re).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : <Fragment key={i}>{p}</Fragment>))}</>;
}

export default function Search() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { document.title = '검색 · 학습'; input.current?.focus(); }, []);
  useEffect(() => { loadIndex().then(setEntries); }, []);

  const hits = useMemo(() => (entries ? search(entries, q) : []), [entries, q]);
  const toks = tokensOf(q);

  return (
    <div className="app">
      <TopBar title="상황·증상으로 찾기" />
      <main className="page">
        <form className="searchbox" role="search" onSubmit={(e) => e.preventDefault()}>
          <SearchIcon size={20} />
          <input ref={input} type="search" inputMode="search" enterKeyHint="search" autoComplete="off" placeholder="상황이나 증상을 입력 (예: 로딩이 길다)" aria-label="검색어" value={q} onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })} />
        </form>

        {!q && (
          <>
            <p className="hint-line">막혔을 때 떠오르는 말로 찾아보세요. 글은 "…할 때" 단위로 나뉘어 있습니다.</p>
            <div className="chips">
              {SUGGESTIONS.map((s) => <Link key={s} className="chip press" to={`/search?q=${encodeURIComponent(s)}`} replace>{s}</Link>)}
            </div>
          </>
        )}

        {q && !entries && <p className="muted">색인을 만드는 중</p>}
        {q && entries && hits.length === 0 && (
          <>
            <p className="muted">"{q}"에 맞는 섹션이 없습니다. 더 짧은 말로 바꿔 보세요.</p>
            <div className="chips">{SUGGESTIONS.map((s) => <Link key={s} className="chip press" to={`/search?q=${encodeURIComponent(s)}`} replace>{s}</Link>)}</div>
          </>
        )}
        {hits.length > 0 && (
          <>
            <p className="hint-line" aria-live="polite">{hits.length}개 섹션</p>
            <div className="results">
              {hits.map((h, i) => (
                <Link key={`${h.unitId}-${h.sectionId}-${i}`} className="result press" to={`/${h.slug}/${h.unitId}`} state={{ section: h.sectionId }}>
                  <small>{h.unitTitle}</small>
                  <b><Highlight text={h.heading} tokens={toks} /></b>
                  <p><Highlight text={h.snippet} tokens={toks} /></p>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
