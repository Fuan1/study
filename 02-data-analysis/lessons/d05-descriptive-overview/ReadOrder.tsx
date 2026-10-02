/** 현황 파악 순서: 각 단계에서 남기는 결과물이 마지막 현황 요약표를 이룬다. 개념 흐름도라 수치는 없다. */
type Step = { q: string; sub: string; out: string };

const STEPS: Step[] = [
  { q: '1. 범위 확인', sub: '건수·기간·단위', out: '범위 메모' },
  { q: '2. 빠짐 확인', sub: '결측과 0을 따로 센다', out: '결측률' },
  { q: '3. 분포 그림', sub: '히스토그램, 상자 그림', out: '분포 그림' },
  { q: '4. 요약 숫자', sub: '대표값·퍼짐·분위수', out: '현황 요약표' },
  { q: '5. 이상 구간', sub: '꼬리, 빈 곳, 몰린 값', out: '이상 구간 메모' },
];

const LW = 180; // 단계 상자 폭
const RW = 128; // 결과물 상자 폭
const RX = 360 - 8 - RW; // 결과물 상자 x
const H = 66;
const GAP = 28;
const TOP = 8;

export default function ReadOrder() {
  const y = (i: number) => TOP + i * (H + GAP);
  // 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
  const vbH = y(STEPS.length - 1) + H + 1 + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="현황을 파악하는 다섯 단계와 각 단계의 결과물. 범위 확인은 범위 메모, 빠짐 확인은 결측률, 분포 그림은 분포 그림, 요약 숫자는 현황 요약표, 이상 구간은 이상 구간 메모를 남긴다.">
      <defs>
        <marker id="d05-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
        </marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="20" y={y(i) + 27}>{s.q}</text>
          <text className="t-sub" x="20" y={y(i) + 47}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#d05-arrow)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-sub" x={RX + 12} y={y(i) + 27}>남기는 것</text>
          <text className="t-strong" x={RX + 12} y={y(i) + 47}>{s.out}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#d05-arrow)" />
          )}
        </g>
      ))}
    </svg>
  );
}
