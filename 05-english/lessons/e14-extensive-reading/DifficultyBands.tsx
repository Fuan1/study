/**
 * 출처(ERF Guide)의 구간 경계 98%, 90%에서 100단어당 모르는 단어 수를 계산한다.
 * 98% 이상 아는 책 = 100단어에 모르는 단어 2개 이하, 90% 미만 = 10개 초과.
 */
const HI = 98;
const LO = 90;
const unknown = (known: number) => 100 - known;

type Row = { cls: string; tagCls: string; title: string; sub: string; tag: string };

const ROWS: Row[] = [
  { cls: 'svg-box-good', tagCls: 't-good', title: `아는 단어 ${HI}% 이상`, sub: `100단어에 모르는 단어 ${unknown(HI)}개 이하`, tag: '다독 구간' },
  { cls: 'svg-box', tagCls: 't-sub', title: `아는 단어 ${LO}에서 ${HI}%`, sub: `100단어에 모르는 단어 ${unknown(HI)}에서 ${unknown(LO)}개`, tag: '공부하며 읽기' },
  { cls: 'svg-box-bad', tagCls: 't-bad', title: `아는 단어 ${LO}% 미만`, sub: `100단어에 모르는 단어 ${unknown(LO)}개 초과`, tag: '너무 어려움' },
];

const H = 68;
const GAP = 20;

export default function DifficultyBands() {
  const vbH = 8 + ROWS.length * H + (ROWS.length - 1) * GAP + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="한 쪽에서 아는 단어 비율에 따른 세 구간. 98퍼센트 이상이면 다독 구간, 90에서 98퍼센트면 공부하며 읽기, 90퍼센트 미만이면 너무 어렵다.">
      {ROWS.map((r, i) => {
        const y = 8 + i * (H + GAP);
        return (
          <g key={r.title}>
            <rect className={r.cls} x="8" y={y} width="344" height={H} rx="8" />
            <text className="t-strong" x="22" y={y + 29}>{r.title}</text>
            <text className={r.tagCls} x="338" y={y + 29} textAnchor="end">{r.tag}</text>
            <text className="t-sub" x="22" y={y + 51}>{r.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}
