type Row = { n: number; head: string; sample: string; cls: string };

// 칸 구성만 보인다. 실제 항목의 글을 옮기지 않고 자리 표시(word, A1 등)를 썼다.
const ROWS: Row[] = [
  { n: 1, head: '표제어 · 품사', sample: 'word  noun / verb', cls: 'svg-berg' },
  { n: 2, head: '안내어 · 수준 · 문법 표시', sample: '(GUIDE)  A1  [C]', cls: 'svg-box' },
  { n: 3, head: '뜻', sample: '영어 정의, 번역이 붙는 항목은 한국어도', cls: 'svg-box' },
  { n: 4, head: '예문', sample: 'an example sentence', cls: 'svg-box' },
  { n: 5, head: '같이 쓰는 말 · 구 동사', sample: 'word about something', cls: 'svg-box' },
  { n: 6, head: '발음', sample: '/IPA 기호/  영국 · 미국 소리', cls: 'svg-box' },
];

const H = 66;
const GAP = 12;

export default function EntryAnatomy() {
  const y = (i: number) => 8 + i * (H + GAP);
  const bottom = y(ROWS.length - 1) + H;
  return (
    <svg viewBox={`0 0 360 ${bottom + 12}`} role="img" aria-label="사전 항목의 칸 구성. 표제어와 품사, 안내어와 수준과 문법 표시, 뜻, 예문, 같이 쓰는 말과 구 동사, 발음 순서로 훑는다.">
      {ROWS.map((r, i) => (
        <g key={r.n}>
          <rect className={r.cls} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-warm" x="22" y={y(i) + 29}>{r.n}</text>
          <text className="t-strong" x="44" y={y(i) + 29}>{r.head}</text>
          <text className="t-sub" x="44" y={y(i) + 51}>{r.sample}</text>
        </g>
      ))}
    </svg>
  );
}
