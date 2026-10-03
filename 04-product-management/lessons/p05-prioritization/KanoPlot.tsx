/**
 * 출처 값: Sauerwein 외(1996) 그림 10의 스키 설문(고객 1,500명 이상) 유형 비율(%).
 * 만족계수 = (A + O) ÷ (A + O + M + I), 불만계수 = (O + M) ÷ (A + O + M + I). 이 글이 표 값으로 계산했다.
 */
type Row = { name: string; kind: string; A: number; O: number; M: number; I: number; side: 'left' | 'right' };
const ROWS: Row[] = [
  { name: '엣지 그립', kind: '기본', A: 7, O: 32.3, M: 49.3, I: 9.5, side: 'left' },
  { name: '회전 용이', kind: '성능', A: 10.4, O: 45.1, M: 30.5, I: 11.5, side: 'left' },
  { name: '정비 서비스', kind: '감동', A: 63.8, O: 21.6, M: 2.9, I: 8.5, side: 'right' },
];

const PX0 = 44;
const PX1 = 336;
const PY0 = 40;
const PY1 = 220;
const VB_H = PY1 + 56 + 10;

export default function KanoPlot() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="Kano 설문 결과. 엣지 그립은 기본, 회전 용이는 성능, 정비 서비스는 감동 쪽에 놓인다.">
      <text className="t-sub" x="8" y="20">↑ 있으면 만족이 느는 정도</text>
      <line x1={PX0} y1={PY0} x2={PX0} y2={PY1} stroke="var(--line)" />
      <line x1={PX0} y1={PY1} x2={PX1} y2={PY1} stroke="var(--line)" />
      {[0, 0.5, 1].map((t) => (
        <g key={t}>
          <text className="t-sub" x={PX0 - 8} y={PY1 - t * (PY1 - PY0) + 4} textAnchor="end">{t}</text>
          <text className="t-sub" x={PX0 + t * (PX1 - PX0)} y={PY1 + 20} textAnchor="middle">{t}</text>
        </g>
      ))}
      <text className="t-sub" x="352" y={PY1 + 56} textAnchor="end">없으면 불만이 생기는 정도 →</text>
      {ROWS.map((r) => {
        const d = r.A + r.O + r.M + r.I;
        const better = (r.A + r.O) / d;
        const worse = (r.O + r.M) / d;
        const cx = PX0 + worse * (PX1 - PX0);
        const cy = PY1 - better * (PY1 - PY0);
        const left = r.side === 'left';
        return (
          <g key={r.name}>
            <circle className="svg-berg" cx={cx} cy={cy} r="6" />
            <text className="t-strong" x={left ? cx - 14 : cx + 14} y={cy + 5} textAnchor={left ? 'end' : 'start'}>{r.name} · {r.kind}</text>
          </g>
        );
      })}
    </svg>
  );
}
