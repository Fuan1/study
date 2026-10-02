/** 형태 예시(가상 값): 같은 소재의 4주 추이. 1주차를 100으로 놓은 지수. 빈도·CTR·CPM 이 움직이고 CVR 은 그대로인 피로 모양. */
const WEEKS = ['1주', '2주', '3주', '4주'];
const FREQ = [1.3, 1.9, 2.6, 3.4];
const CTR = [1.0, 0.92, 0.8, 0.66];
const CPM = [10_000, 10_800, 11_800, 13_000];
const CVR = [3.0, 3.0, 3.0, 3.0];
const idx = (a: number[]) => a.map((v) => (v / a[0]) * 100);
const SERIES = [
  { name: '빈도', v: idx(FREQ), color: 'var(--bad)', cls: 't-bad' },
  { name: 'CPM', v: idx(CPM), color: 'var(--warm)', cls: 't-warm' },
  { name: 'CVR', v: idx(CVR), color: 'var(--muted)', cls: 't-sub' },
  { name: 'CTR', v: idx(CTR), color: 'var(--accent)', cls: 't-accent' },
];

const X0 = 40;
const X1 = 278;
const YT = 36;
const YB = 214;
const V_MIN = 50;
const V_MAX = 280;
const xOf = (i: number) => X0 + (i / (WEEKS.length - 1)) * (X1 - X0);
const yOf = (v: number) => YB - ((v - V_MIN) / (V_MAX - V_MIN)) * (YB - YT);
const YTICKS = [100, 200];
const VB_H = YB + 20 + 14;
// 끝점 라벨은 값 순서대로 두고, 서로 30px(글자 사이 12px 이상) 떨어지도록 y 를 벌린다.
const MIN_GAP = 30;
const labelY = (() => {
  const order = SERIES.map((s, i) => ({ i, y: yOf(s.v[3]) })).sort((a, b) => a.y - b.y);
  for (let k = 0; k < 50; k++) {
    for (let j = 1; j < order.length; j++) {
      const d = MIN_GAP - (order[j].y - order[j - 1].y);
      if (d > 0) { order[j - 1].y -= d / 2; order[j].y += d / 2; }
    }
  }
  const out: number[] = [];
  order.forEach((o) => { out[o.i] = o.y; });
  return out;
})();

export default function FatigueTrend() {
  const ends = SERIES.map((s) => `${s.name} ${Math.round(s.v[3])}`).join(', ');
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`같은 소재의 4주 추이를 1주차 100으로 놓은 지수. 4주차에 ${ends}. 빈도와 CPM 이 오르고 CTR 이 내리는 동안 CVR 은 100으로 그대로다.`}>
      <text className="t-sub" x="8" y="18">1주차 = 100 (형태 예시, 가상 값)</text>
      {YTICKS.map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke={v === 100 ? 'var(--strong)' : 'var(--line)'} strokeWidth={v === 100 ? 1.5 : 1} strokeDasharray={v === 100 ? '4 3' : undefined} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      <line x1={X0} y1={YB} x2={X1} y2={YB} stroke="var(--line)" strokeWidth="1.5" />
      {WEEKS.map((w, i) => (
        <text key={w} className="t-sub" x={xOf(i)} y={YB + 20} textAnchor={i === 0 ? 'start' : i === WEEKS.length - 1 ? 'end' : 'middle'}>{w}</text>
      ))}
      {SERIES.map((s, k) => (
        <g key={s.name}>
          <polyline points={s.v.map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ')} fill="none" stroke={s.color} strokeWidth="2.5" />
          <circle cx={xOf(3)} cy={yOf(s.v[3])} r="4" fill={s.color} />
          <line x1={xOf(3) + 4} y1={yOf(s.v[3])} x2={X1 + 10} y2={labelY[k]} stroke={s.color} strokeWidth="1" />
          <text className={s.cls} x={X1 + 12} y={labelY[k] + 4}>{s.name} {Math.round(s.v[3])}</text>
        </g>
      ))}
    </svg>
  );
}
