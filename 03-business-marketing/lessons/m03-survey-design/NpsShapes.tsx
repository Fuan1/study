/** 같은 NPS(+10)를 만드는 서로 다른 응답 분포. 응답 200명은 가정이고 점수별 개수는 직접 정했다. */
const A = [12, 6, 6, 6, 6, 12, 12, 30, 30, 30, 50]; // 양극화, 0점부터 10점까지 점수별 응답 수
const B = [2, 2, 2, 4, 4, 6, 10, 60, 60, 30, 20]; // 대부분 7-8점
const PANELS = [
  { name: 'A 양극화', c: A },
  { name: 'B 중립 다수', c: B },
];
const sum = (c: number[], a: number, b: number) => c.slice(a, b + 1).reduce((s, v) => s + v, 0);
const nps = (c: number[]) => (100 * (sum(c, 9, 10) - sum(c, 0, 6))) / sum(c, 0, 10);
const pct = (c: number[], a: number, b: number) => Math.round((100 * sum(c, a, b)) / sum(c, 0, 10));

const X0 = 12;
const SLOT = 336 / 11;
const BW = 22;
const BAR_MAX = 60; // 높이(px) = 응답 수
const color = (k: number) => (k <= 6 ? 'var(--bad)' : k <= 8 ? 'var(--muted)' : 'var(--good)');
const PANEL_H = 140; // 제목 baseline 에서 다음 패널 제목까지
const T0 = 20;
const baseOf = (i: number) => T0 + i * PANEL_H + 16 + BAR_MAX;
const LEG_Y = baseOf(1) + 18 + 38;
const VB_H = LEG_Y + 12;
const LEGEND = [
  { x: 12, label: '0-6 비추천', k: 0 },
  { x: 128, label: '7-8 중립', k: 7 },
  { x: 232, label: '9-10 추천', k: 9 },
];

export default function NpsShapes() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="응답 200명의 점수 분포 두 가지. A는 비추천 30퍼센트, 중립 30퍼센트, 추천 40퍼센트이고 B는 비추천 15퍼센트, 중립 60퍼센트, 추천 25퍼센트인데 둘 다 NPS는 플러스 10이다.">
      {PANELS.map((p, i) => (
        <g key={p.name}>
          <text className="t-strong" x="12" y={T0 + i * PANEL_H}>{p.name}</text>
          <text className="t-sub" x="348" y={T0 + i * PANEL_H} textAnchor="end">
            추천 {pct(p.c, 9, 10)}% - 비추천 {pct(p.c, 0, 6)}% = {nps(p.c) >= 0 ? '+' : ''}{nps(p.c)}
          </text>
          {p.c.map((v, k) => (
            <g key={k}>
              <rect x={X0 + k * SLOT + (SLOT - BW) / 2} y={baseOf(i) - v} width={BW} height={v} rx="2" fill={color(k)} opacity="0.85" />
              <text className="t-sub" x={X0 + k * SLOT + SLOT / 2} y={baseOf(i) + 18} textAnchor="middle">{k}</text>
            </g>
          ))}
          <line x1="8" y1={baseOf(i)} x2="352" y2={baseOf(i)} stroke="var(--line)" strokeWidth="1.5" />
        </g>
      ))}
      {LEGEND.map((l) => (
        <g key={l.label}>
          <rect x={l.x} y={LEG_Y - 10} width="10" height="10" rx="2" fill={color(l.k)} opacity="0.85" />
          <text className="t-sub" x={l.x + 18} y={LEG_Y}>{l.label}</text>
        </g>
      ))}
    </svg>
  );
}
