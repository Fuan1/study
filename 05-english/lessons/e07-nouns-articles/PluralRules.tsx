const ROWS = [
  { l1: '대부분의 명사', l2: 'book → books', rule: '+ s', cls: 't-strong' },
  { l1: 's, ch, sh, ss, x, o 로 끝남', l2: 'box → boxes, potato → potatoes', rule: '+ es', cls: 't-strong' },
  { l1: '자음 + y 로 끝남', l2: 'party → parties', rule: 'y → ies', cls: 't-strong' },
  { l1: '모음 + y 로 끝남', l2: 'boy → boys', rule: '+ s', cls: 't-strong' },
  { l1: '불규칙', l2: 'man → men, child → children', rule: '외운다', cls: 't-warm' },
];

const RH = 60;
const STEP = 68;

export default function PluralRules() {
  const VB_H = 8 + (ROWS.length - 1) * STEP + RH + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="복수 만드는 규칙. 대부분 s, s ch sh ss x o 로 끝나면 es, 자음 뒤 y는 ies, 모음 뒤 y는 s, 불규칙은 외운다.">
      {ROWS.map((r, i) => {
        const y = 8 + i * STEP;
        return (
          <g key={r.l1}>
            <rect className="svg-box" x="8" y={y} width="344" height={RH} rx="8" />
            <text className="t-strong" x="22" y={y + 26}>{r.l1}</text>
            <text className="t-sub" x="22" y={y + 46}>{r.l2}</text>
            <text className={r.cls} x="272" y={y + 36}>{r.rule}</text>
          </g>
        );
      })}
    </svg>
  );
}
