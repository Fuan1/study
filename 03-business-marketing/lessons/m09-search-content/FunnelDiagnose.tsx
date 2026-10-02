/** 노출 x CTR x 전환율 = 전환. 가정한 월간 값을 코드로 계산하고 단계별로 고칠 곳을 붙인다. */
const IMP = 120000;
const CTR = 0.02;
const CVR = 0.015;
const CLICKS = IMP * CTR;
const CONV = CLICKS * CVR;

const STAGES = [
  { name: `노출 ${IMP.toLocaleString('en-US')}`, src: 'Search Console', fix: '색인·키워드·순위', fixSub: '노출이 적을 때' },
  { name: `클릭 ${CLICKS.toLocaleString('en-US')}`, src: 'Search Console', fix: '제목·설명·의도', fixSub: 'CTR 이 낮을 때' },
  { name: `전환 ${CONV.toLocaleString('en-US')}`, src: '분석 도구', fix: '랜딩·속도·제안', fixSub: '전환율이 낮을 때' },
];
const RATES = [`CTR ${(CTR * 100).toFixed(1)}%`, `전환율 ${(CVR * 100).toFixed(1)}%`];

const LX = 8;
const LW = 150;
const RW = 168;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 48;
const TOP = 8;
const STROKE = 1.5;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(STAGES.length - 1) + H + STROKE / 2 + 8);

export default function FunnelDiagnose() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가정한 월간 값. 노출 12만에서 클릭 ${CLICKS.toLocaleString('en-US')}, 전환 ${CONV}. 노출이 적으면 색인과 키워드와 순위, CTR 이 낮으면 제목과 설명과 의도, 전환율이 낮으면 랜딩과 속도와 제안을 본다.`}>
      <defs>
        <marker id="ar-m09c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.name}>
          <rect className="svg-box" x={LX} y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x={LX + 14} y={y(i) + 28}>{s.name}</text>
          <text className="t-sub" x={LX + 14} y={y(i) + 50}>{s.src}</text>
          <line className="svg-flow" x1={LX + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-m09c)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 28}>{s.fix}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fixSub}</text>
          {i < STAGES.length - 1 && (
            <g>
              <line className="svg-flow" x1={LX + LW / 2} y1={y(i) + H + 6} x2={LX + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-m09c)" />
              <text className="t-accent" x={LX + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>{RATES[i]}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
