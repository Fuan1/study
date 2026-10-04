/**
 * British Council TeachingEnglish 페이지의 예: A pint of beer, fish and chips, Have you finished? / Yes, I have.
 * 구조어(전치사·접속사·관사)는 약하게, 내용을 싣는 말은 또렷하게. 같은 have 도 자리에 따라 약형과 완전형이 갈린다.
 */
type W = { t: string; w: number; weak?: boolean };

const BH = 36;
const ROWS: { label: string; words: W[]; note: string }[] = [
  {
    label: 'a pint of beer',
    words: [{ t: 'a', w: 30, weak: true }, { t: 'pint', w: 56 }, { t: 'of', w: 34, weak: true }, { t: 'beer', w: 56 }],
    note: 'a, of 는 약하게 지나간다',
  },
  {
    label: 'fish and chips',
    words: [{ t: 'fish', w: 56 }, { t: 'and', w: 42, weak: true }, { t: 'chips', w: 64 }],
    note: 'and 는 짧아져 앞말에 붙는다',
  },
];

const PITCH = 100;
const Y0 = 76;

export default function WeakForms() {
  const r3 = Y0 + 2 * PITCH; // 세 번째 줄 라벨 baseline
  const bt3 = r3 + 12;
  const VB_H = r3 + 70 + 14;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="약하게 지나가는 말과 또렷한 말. a pint of beer 에서 a 와 of 는 약하고, fish and chips 에서 and 는 약하다. Have you finished 의 Have 는 약하고 Yes, I have 의 have 는 또렷하다.">
      <rect className="svg-box" x="8" y="7" width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y="20">약하게 지나가는 말</text>
      <rect className="svg-berg" x="8" y="27" width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y="40">또렷하게 들리는 말</text>
      {ROWS.map((r, i) => {
        const ly = Y0 + i * PITCH;
        const bt = ly + 12;
        let x = 8;
        return (
          <g key={r.label}>
            <text className="t-sub" x="8" y={ly}>{r.label}</text>
            {r.words.map((w) => {
              const cx = x + w.w / 2;
              const el = (
                <g key={w.t + x}>
                  <rect className={w.weak ? 'svg-box' : 'svg-berg'} x={x} y={bt} width={w.w} height={BH} rx="4" />
                  <text className={w.weak ? 't-sub' : 't-strong'} x={cx} y={bt + 23} textAnchor="middle">{w.t}</text>
                </g>
              );
              x += w.w + 8;
              return el;
            })}
            <text className="t-sub" x="8" y={bt + BH + 22}>{r.note}</text>
          </g>
        );
      })}
      <text className="t-sub" x="8" y={r3}>같은 have, 다른 자리</text>
      <rect className="svg-box" x="8" y={bt3} width="54" height={BH} rx="4" />
      <text className="t-sub" x="35" y={bt3 + 23} textAnchor="middle">Have</text>
      <text className="t-sub" x="70" y={bt3 + 23}>you finished?</text>
      <text className="t-sub" x="176" y={bt3 + 23}>Yes, I</text>
      <rect className="svg-berg" x="222" y={bt3} width="56" height={BH} rx="4" />
      <text className="t-strong" x="250" y={bt3 + 23} textAnchor="middle">have</text>
      <text className="t-sub" x="8" y={bt3 + BH + 22}>질문의 Have 는 약하고 대답의 have 는 또렷하다</text>
    </svg>
  );
}
