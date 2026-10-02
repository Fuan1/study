/** Van Westendorp 결과의 모양. 형태 예시(가상 값): 위치와 간격은 데이터마다 다르다. */
const X0 = 16;
const X1 = 344;
const PMC = 108;
const OPP = 170;
const IPP = 224;
const PME = 280;
const BAR_Y = 38;
const BAR_H = 28;
const BAR_B = BAR_Y + BAR_H;
const LABEL_Y = BAR_B + 36; // 눈금 끝(+8)에서 라벨 윗변까지 10px 이상
const DIV = LABEL_Y + 4 + 24;
const PITCH = 32; // 설명 줄 baseline 간격
const L0 = DIV + 30;
const LEGEND = [
  ['PMC', '허용 구간의 싼 쪽 끝'],
  ['OPP', '너무 싸다와 너무 비싸다 곡선이 만나는 점'],
  ['IPP', '싸다와 비싸다 곡선이 만나는 점'],
  ['PME', '허용 구간의 비싼 쪽 끝'],
];
const VB_H = L0 + (LEGEND.length - 1) * PITCH + 4 + 12;

export default function AcceptRange() {
  const marks = [['PMC', PMC], ['OPP', OPP], ['IPP', IPP], ['PME', PME]] as const;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="Van Westendorp 결과의 모양. 가격 축에서 너무 싼 구간, 허용 구간, 너무 비싼 구간이 나뉘고, 허용 구간의 양 끝이 PMC와 PME이며 그 안에 OPP와 IPP가 놓인다. 가상 값이다.">
      <rect className="svg-box-bad" x={X0} y={BAR_Y} width={PMC - X0} height={BAR_H} rx="4" />
      <rect className="svg-berg" x={PMC} y={BAR_Y} width={PME - PMC} height={BAR_H} rx="2" />
      <rect className="svg-box-bad" x={PME} y={BAR_Y} width={X1 - PME} height={BAR_H} rx="4" />
      <text className="t-sub" x={(X0 + PMC) / 2} y={BAR_Y - 10} textAnchor="middle">너무 싸다</text>
      <text className="t-accent" x={(PMC + PME) / 2} y={BAR_Y - 10} textAnchor="middle">허용 구간</text>
      <text className="t-sub" x={(PME + X1) / 2} y={BAR_Y - 10} textAnchor="middle">너무 비싸다</text>
      {marks.map(([k, x]) => (
        <g key={k}>
          <line x1={x} y1={BAR_Y} x2={x} y2={BAR_B + 8} stroke="var(--strong)" strokeWidth="1.5" />
          <text className="t-strong" x={x} y={LABEL_Y} textAnchor="middle">{k}</text>
        </g>
      ))}
      <text className="t-sub" x={X1} y={LABEL_Y} textAnchor="end" dx="8">가격 →</text>
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      {LEGEND.map(([k, v], i) => (
        <g key={k}>
          <text className="t-strong" x={X0} y={L0 + i * PITCH}>{k}</text>
          <text className="t-sub" x={X0 + 44} y={L0 + i * PITCH}>{v}</text>
        </g>
      ))}
    </svg>
  );
}
