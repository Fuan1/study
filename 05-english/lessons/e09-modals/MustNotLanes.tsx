/**
 * 같은 동사 go 로 만든 세 문장. 의무, 의무 없음, 금지는 서로 다른 뜻이다.
 * 문장은 이 글에서 직접 쓴 예이고 뜻의 구분은 영국 문화원 자료를 따랐다.
 */
const LANES = [
  { ko: '해야 한다', en: 'You must go.', sub: '가야 한다. have to도 같음', cls: 'svg-box-key' },
  { ko: '안 해도 된다', en: "You don't have to go.", sub: '안 가도 된다. 금지 아님', cls: 'svg-box' },
  { ko: '하면 안 된다', en: "You mustn't go.", sub: '가면 안 된다. 금지', cls: 'svg-box-bad' },
];

const H = 66;
const GAP = 24;
const DIV = 124; // 구분선 x

export default function MustNotLanes() {
  const vbH = 8 + LANES.length * H + (LANES.length - 1) * GAP + 8 + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="You must go는 가야 한다, You don't have to go는 안 가도 된다, You mustn't go는 가면 안 된다는 뜻이다.">
      {LANES.map((l, i) => {
        const y = 8 + i * (H + GAP);
        return (
          <g key={l.en}>
            <rect className={l.cls} x="8" y={y} width="344" height={H} rx="8" />
            <text className="t-strong" x="22" y={y + H / 2 + 5}>{l.ko}</text>
            <line x1={DIV} y1={y + 12} x2={DIV} y2={y + H - 12} stroke="var(--line)" />
            <text className="t-strong" x={DIV + 14} y={y + 29}>{l.en}</text>
            <text className="t-sub" x={DIV + 14} y={y + 50}>{l.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}
