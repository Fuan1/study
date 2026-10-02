/** 채널 6개 기준의 가중합 점수(1~5점 -> 100점 환산). 점수와 가중치는 모두 가정이다. */
// 기준 순서: 의도, 도달, 비용, 시간, 측정, 통제
const W_BASE = [25, 15, 15, 15, 20, 10];
const W_TIME = [20, 10, 15, 30, 15, 10]; // 시간을 중시하는 경우(가정)
const CHANNELS: { name: string; s: number[] }[] = [
  { name: '검색 광고', s: [5, 3, 3, 5, 5, 4] },
  { name: '이메일', s: [4, 2, 5, 4, 5, 5] },
  { name: '소셜 유료', s: [2, 5, 3, 5, 4, 3] },
  { name: '콘텐츠·검색 최적화', s: [4, 4, 3, 1, 3, 2] },
  { name: '인플루언서', s: [2, 3, 2, 3, 2, 2] },
];
const score = (s: number[], w: number[]) => (s.reduce((a, v, i) => a + v * w[i], 0) / w.reduce((a, v) => a + v, 0)) * 20;
const fmt = (v: number) => `${Math.round(v)}`;

const X0 = 150;
const MAXW = 160; // 100점의 폭
const BH = 14;
const ROW_H = BH * 2 + 4; // 32
const GAP = 20;
const Y0 = 64;
const rowY = (i: number) => Y0 + i * (ROW_H + GAP);
const VB_H = Math.ceil(rowY(CHANNELS.length - 1) + ROW_H + 0.75 + 12);

export default function ChannelScore() {
  const rows = CHANNELS.map((c) => ({ ...c, base: score(c.s, W_BASE), time: score(c.s, W_TIME) }));
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`채널 우선순위 점수. ${rows.map((r) => `${r.name} 기본 ${fmt(r.base)}점, 시간 중시 ${fmt(r.time)}점`).join('. ')}. 가중치를 바꿔도 순서가 같은지 본다.`}>
      <rect x="12" y="6" width="12" height="12" rx="2" fill="var(--accent)" />
      <text className="t-sub" x="32" y="17">기본 가중치</text>
      <rect x="12" y="28" width="12" height="12" rx="2" fill="var(--warm)" />
      <text className="t-sub" x="32" y="39">시간 중시 가중치</text>
      {rows.map((r, i) => (
        <g key={r.name}>
          <text className="t-sub" x="12" y={rowY(i) + 21}>{r.name}</text>
          <rect x={X0} y={rowY(i)} width={(r.base / 100) * MAXW} height={BH} rx="2" fill="var(--accent)" />
          <text className="t-sub" x={X0 + (r.base / 100) * MAXW + 8} y={rowY(i) + 12}>{fmt(r.base)}</text>
          <rect x={X0} y={rowY(i) + BH + 4} width={(r.time / 100) * MAXW} height={BH} rx="2" fill="var(--warm)" />
          <text className="t-sub" x={X0 + (r.time / 100) * MAXW + 8} y={rowY(i) + BH + 4 + 12}>{fmt(r.time)}</text>
        </g>
      ))}
    </svg>
  );
}
