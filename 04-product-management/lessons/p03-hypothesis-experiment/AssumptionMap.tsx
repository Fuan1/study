/** 형태 예시(가상 값). 직장인 도시락 구독 기획안의 가정 5개를 중요도와 근거 강도로 배치한 가정 지도. */
type Dot = { n: number; col: 0 | 1; row: 0 | 1; dx: number };

const DOTS: Dot[] = [
  { n: 2, col: 0, row: 0, dx: 40 },
  { n: 3, col: 0, row: 0, dx: 100 },
  { n: 1, col: 1, row: 0, dx: 60 },
  { n: 4, col: 0, row: 1, dx: 60 },
  { n: 5, col: 1, row: 1, dx: 60 },
];

const QUADS = [
  { col: 0, row: 0, title: '먼저 검증', sub: '중요 · 근거 약함', key: true },
  { col: 1, row: 0, title: '그대로 진행', sub: '중요 · 근거 강함', key: false },
  { col: 0, row: 1, title: '나중에', sub: '덜 중요 · 근거 약함', key: false },
  { col: 1, row: 1, title: '신경 쓰지 않음', sub: '덜 중요 · 근거 강함', key: false },
];

const LEGEND: [number, string, string][] = [
  [1, '점심 준비가 번거롭다', '고객·문제'],
  [2, '월 구독료를 낸다', '사업'],
  [3, '점심 전에 도착시킨다', '실현'],
  [4, '메뉴를 매주 바꾸고 싶다', '해결'],
  [5, '간편결제를 쓴다', '사용'],
];

const TOP = 34;
const QW = 170;
const QH = 126;
const GAP = 4;
const qx = (c: number) => 8 + c * (QW + GAP);
const qy = (r: number) => TOP + r * (QH + GAP);
const PLOT_BOTTOM = qy(1) + QH;
const LEG0 = PLOT_BOTTOM + 24 + 11; // 첫 범례 원의 중심
const PITCH = 30;
const lastCy = LEG0 + (LEGEND.length - 1) * PITCH;
// 마지막 원 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = lastCy + 11 + 1 + 8;

export default function AssumptionMap() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="가정 지도. 가로는 근거의 강도, 세로는 중요도다. 중요하고 근거가 약한 왼쪽 위 칸에 가정 2번과 3번이 있어 먼저 검증한다. 1번은 중요하지만 근거가 강하고, 4번은 덜 중요하고 근거가 약하며, 5번은 덜 중요하고 근거가 강하다.">
      <text className="t-sub" x="8" y="20">← 근거 약함</text>
      <text className="t-sub" x="352" y="20" textAnchor="end">근거 강함 →</text>
      {QUADS.map((q) => (
        <g key={q.title}>
          <rect className={q.key ? 'svg-box-key' : 'svg-box'} x={qx(q.col)} y={qy(q.row)} width={QW} height={QH} rx="8" />
          <text className={q.key ? 't-warm' : 't-strong'} x={qx(q.col) + 14} y={qy(q.row) + 28}>{q.title}</text>
          <text className="t-sub" x={qx(q.col) + 14} y={qy(q.row) + 50}>{q.sub}</text>
        </g>
      ))}
      {DOTS.map((d) => (
        <g key={d.n}>
          <circle cx={qx(d.col) + d.dx} cy={qy(d.row) + 94} r="14" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <text className="t-strong" x={qx(d.col) + d.dx} y={qy(d.row) + 99} textAnchor="middle">{d.n}</text>
        </g>
      ))}
      {LEGEND.map(([n, text, kind], i) => {
        const cy = LEG0 + i * PITCH;
        return (
          <g key={n}>
            <circle cx="22" cy={cy} r="11" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
            <text className="t-sub" x="22" y={cy + 4.5} textAnchor="middle">{n}</text>
            <text x="44" y={cy + 5} fontSize="13">{text}</text>
            <text className="t-sub" x="352" y={cy + 5} textAnchor="end">{kind}</text>
          </g>
        );
      })}
    </svg>
  );
}
