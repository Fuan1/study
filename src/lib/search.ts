import { courses } from './catalog';
import { slugify } from '../kit/blocks';

// 글 원문(MDX)을 검색할 때만 불러온다. 홈·글 화면의 첫 로딩에는 들어가지 않는다.
const raws = import.meta.glob<string>('/[0-9][0-9]-*/lessons/*/index.mdx', { query: '?raw', import: 'default' });

export type Entry = { slug: string; unitId: string; unitTitle: string; sectionId: string; heading: string; text: string };
export type Hit = Entry & { snippet: string };

const clean = (t: string) =>
  t.replace(/^```\w*\s*$/gm, ' ').replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ').replace(/<[^>]+>/g, ' ').replace(/[|*`>]/g, ' ').replace(/^\s*[-\d.]+\s+/gm, ' ').replace(/\s+/g, ' ').trim();

function parse(raw: string, slug: string, unitId: string, unitTitle: string): Entry[] {
  const out: Entry[] = [];
  let heading = '핵심 규칙';
  let sectionId = '__top';
  let buf: string[] = [];
  const flush = () => {
    const text = clean(buf.join('\n'));
    if (text || heading) out.push({ slug, unitId, unitTitle, sectionId, heading, text });
    buf = [];
  };
  for (const line of raw.split('\n')) {
    const m = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (m) {
      flush();
      heading = m[2];
      sectionId = slugify(m[2]);
    } else if (!/^\s*import\s/.test(line)) buf.push(line);
  }
  flush();
  return out.filter((e) => !/^(출처|관련 글)$/.test(e.heading));
}

let cache: Promise<Entry[]> | null = null;
export function loadIndex(): Promise<Entry[]> {
  cache ??= (async () => {
    const all: Entry[] = [];
    for (const c of courses) {
      for (const u of c.units) {
        if (!u.lessonKey || !raws[u.lessonKey]) continue;
        all.push(...parse(await raws[u.lessonKey](), c.slug, u.id, u.title));
      }
    }
    return all;
  })();
  return cache;
}

export const tokensOf = (q: string) => q.toLowerCase().split(/\s+/).filter(Boolean);

/** 모든 검색어가 제목+본문에 들어 있는 섹션을 찾는다. 제목에 걸리면 앞에 둔다. */
export function search(entries: Entry[], q: string, limit = 30): Hit[] {
  const toks = tokensOf(q);
  if (!toks.length) return [];
  const scored: { e: Entry; score: number }[] = [];
  for (const e of entries) {
    const h = e.heading.toLowerCase();
    const t = e.text.toLowerCase();
    if (!toks.every((k) => h.includes(k) || t.includes(k))) continue;
    const score = toks.reduce((s, k) => s + (h.includes(k) ? 10 : 0) + Math.min(t.split(k).length - 1, 5), 0);
    scored.push({ e, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(({ e }) => {
    const t = e.text.toLowerCase();
    const at = Math.max(0, t.indexOf(toks.find((k) => t.includes(k)) ?? ''));
    const from = Math.max(0, at - 28);
    const snippet = (from > 0 ? '…' : '') + e.text.slice(from, from + 90) + (from + 90 < e.text.length ? '…' : '');
    return { ...e, snippet };
  });
}
