/**
 * 출처 값: Oxford Learner's Dictionaries 의 Oxford 3000 목록 페이지(2026년 10월 확인)에 적힌 항목별 CEFR 등급.
 * 같은 철자가 품사(뜻)마다 다른 등급으로 올라 있는 예.
 */
type Chip = { pos: string; gloss: string; level: string };
type Row = { word: string; chips: [Chip, Chip] };

const ROWS: Row[] = [
  { word: 'book', chips: [{ pos: '명사', gloss: '책', level: 'A1' }, { pos: '동사', gloss: '예약하다', level: 'A2' }] },
  { word: 'water', chips: [{ pos: '명사', gloss: '물', level: 'A1' }, { pos: '동사', gloss: '물을 주다', level: 'B1' }] },
  { word: 'run', chips: [{ pos: '동사', gloss: '달리다', level: 'A1' }, { pos: '명사', gloss: '달리기', level: 'A2' }] },
];

const cls = (lv: string) => (lv === 'A1' ? 'svg-berg' : lv === 'A2' ? 'svg-box' : 'svg-tip');
const CW = 128;
const CH = 66;
const GAP = 16;
const X0 = 84;

export default function WordSenses() {
  const VB_H = 8 + ROWS.length * CH + (ROWS.length - 1) * GAP + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="같은 철자도 뜻마다 등급이 다르다. book 은 명사 A1 동사 A2, water 는 명사 A1 동사 B1, run 은 동사 A1 명사 A2.">
      {ROWS.map((r, i) => {
        const y = 8 + i * (CH + GAP);
        return (
          <g key={r.word}>
            <text className="t-strong" x="8" y={y + CH / 2 + 5}>{r.word}</text>
            {r.chips.map((c, j) => {
              const cx = X0 + j * (CW + GAP);
              return (
                <g key={c.pos}>
                  <rect className={cls(c.level)} x={cx} y={y} width={CW} height={CH} rx="8" />
                  <text className="t-strong" x={cx + 14} y={y + 28}>{c.pos} · {c.level}</text>
                  <text className="t-sub" x={cx + 14} y={y + 48}>{c.gloss}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
