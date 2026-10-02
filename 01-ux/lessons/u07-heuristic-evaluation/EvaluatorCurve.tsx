/** 발견 모형 found(i) = 1 - (1 - L)^i 를 직접 계산해 그린다. 정수 평가자 수의 점만 잇는다. */
const L = 56;
const R = 344;
const T = 44;
const B = 244;
const MAX = 10;
const px = (i: number) => L + (i / MAX) * (R - L);
const py = (p: number) => B - p * (B - T);
const found = (l: number, i: number) => 1 - (1 - l) ** i;
const path = (l: number) => Array.from({ length: MAX + 1 }, (_, i) => `${px(i).toFixed(1)},${py(found(l, i)).toFixed(1)}`).join(' ');
const pct = (l: number, i: number) => `${Math.round(found(l, i) * 100)}%`;

// 여백 기준: 그래프 위 라벨 12px, 눈금 글자는 축에서 9px, 축 제목과 범례는 24px 이상 띄운다.
export default function EvaluatorCurve() {
  return (
    <svg viewBox="0 0 360 378" role="img" aria-label="평가자 수에 따른 문제 발견율 곡선. 한 명이 35퍼센트를 찾는다고 가정하면 3명에서 약 73퍼센트, 5명에서 약 88퍼센트이고 이후 증가폭이 줄어든다.">
      <rect x={px(3)} y={T} width={px(5) - px(3)} height={B - T} style={{ fill: 'var(--accent-soft)' }} />
      <text className="t-accent" x={(px(3) + px(5)) / 2} y={T - 12} textAnchor="middle">3-5명</text>
      {[0, 0.5, 1].map((p) => (
        <g key={p}>
          <line x1={L} y1={py(p)} x2={R} y2={py(p)} style={{ stroke: 'var(--line)', strokeWidth: 1 }} />
          <text className="t-sub" x={L - 8} y={py(p) + 4} textAnchor="end">{Math.round(p * 100)}%</text>
        </g>
      ))}
      {[0, 1, 3, 5, 10].map((i) => (
        <text key={i} className="t-sub" x={px(i)} y={B + 22} textAnchor="middle">{i}</text>
      ))}
      <text className="t-sub" x={(L + R) / 2} y={B + 46} textAnchor="middle">평가자 수</text>
      <polyline points={path(0.2)} fill="none" style={{ stroke: 'var(--muted)', strokeWidth: 2, strokeDasharray: '5 4' }} />
      <polyline points={path(0.35)} fill="none" style={{ stroke: 'var(--accent)', strokeWidth: 2.5 }} />
      {[1, 3, 5].map((i) => (
        <g key={i}>
          <circle cx={px(i)} cy={py(found(0.35, i))} r="4" style={{ fill: 'var(--accent)' }} />
          {i === 1
            ? <text className="t-accent" x={px(i)} y={py(found(0.35, i)) - 12} textAnchor="end">{pct(0.35, i)}</text>
            : <text className="t-accent" x={px(i) + 8} y={py(found(0.35, i)) + 20}>{pct(0.35, i)}</text>}
        </g>
      ))}
      <circle cx={px(5)} cy={py(found(0.2, 5))} r="4" style={{ fill: 'var(--muted)' }} />
      <text className="t-sub" x={px(5) + 8} y={py(found(0.2, 5)) + 20}>{pct(0.2, 5)}</text>
      <line x1="8" y1="312" x2="352" y2="312" style={{ stroke: 'var(--line)', strokeWidth: 1 }} />
      <line x1="8" y1="332" x2="34" y2="332" style={{ stroke: 'var(--accent)', strokeWidth: 2.5 }} />
      <text className="t-sub" x="42" y="336">한 명 35% (6개 프로젝트 평균)</text>
      <line x1="8" y1="356" x2="34" y2="356" style={{ stroke: 'var(--muted)', strokeWidth: 2, strokeDasharray: '5 4' }} />
      <text className="t-sub" x="42" y="360">한 명 20% (가정한 낮은 값)</text>
    </svg>
  );
}
