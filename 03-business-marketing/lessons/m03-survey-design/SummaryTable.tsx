/** 결과 요약표의 모양. 형태 예시(가상 값). 구간은 비율 표준오차식(z 1.96, 단순 무작위 표본 가정)에서 계산한다. */
type Row = { label: string; p: number; n: number; note?: string };

const ROWS: Row[] = [
  { label: '신기능 만족 (전체)', p: 0.72, n: 385 },
  { label: '재구매 의향 (전체)', p: 0.55, n: 385 },
  { label: '60대 이상 만족', p: 0.65, n: 40, note: '참고용' },
];

const Z = 1.959964;
const half = (r: Row) => 100 * Z * Math.sqrt((r.p * (1 - r.p)) / r.n);
const X0 = 24;
const X1 = 336;
const x = (v: number) => X0 + (v / 100) * (X1 - X0);

const TOP = 8;
const HEAD = 40; // 제목 줄
const META = 56; // 메타 두 줄
const ROW = 76;
const rowsTop = TOP + HEAD + META;
const rowsEnd = rowsTop + ROW * ROWS.length;
const AXIS = rowsEnd + 4;
const CARD_BOTTOM = AXIS + 32;
const VB_H = CARD_BOTTOM + 1 + 8;
const TICKS = [0, 50, 100];

export default function SummaryTable() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="결과 요약표의 모양. 위쪽에 대상과 방법, 발송 수와 응답 수를 적고, 항목마다 비율과 오차 범위 구간을 그린다. 응답이 40명뿐인 하위 집단은 구간이 넓어 참고용으로 표시한다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={CARD_BOTTOM - TOP} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>결과 요약표</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">가상 예시</text>
      <line x1="8" y1={TOP + HEAD} x2="352" y2={TOP + HEAD} stroke="var(--line)" />
      <text className="t-sub" x="22" y={TOP + HEAD + 22}>명단 무작위 추출 · 이메일 · 9월 1~7일</text>
      <text className="t-sub" x="22" y={TOP + HEAD + 44}>발송 1,200 · 응답 385 · 응답률 32%</text>
      {ROWS.map((r, i) => {
        const top = rowsTop + i * ROW;
        const h = half(r);
        const cy = top + 58;
        const lo = 100 * r.p - h;
        const hi = 100 * r.p + h;
        const color = r.note ? 'var(--warm)' : 'var(--accent)';
        return (
          <g key={r.label}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className="t-strong" x="22" y={top + 24}>{r.label}</text>
            {r.note && <text className="t-warm" x="338" y={top + 24} textAnchor="end">{r.note}</text>}
            <text className="t-sub" x="22" y={top + 44}>{Math.round(100 * r.p)}% · ±{h.toFixed(1)}%p · n={r.n}</text>
            <line x1={x(lo)} y1={cy} x2={x(hi)} y2={cy} stroke={color} strokeWidth="3" />
            <line x1={x(lo)} y1={cy - 6} x2={x(lo)} y2={cy + 6} stroke={color} strokeWidth="2" />
            <line x1={x(hi)} y1={cy - 6} x2={x(hi)} y2={cy + 6} stroke={color} strokeWidth="2" />
            <circle cx={x(100 * r.p)} cy={cy} r="4.5" fill={color} />
          </g>
        );
      })}
      <line x1={X0} y1={AXIS} x2={X1} y2={AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {TICKS.map((t) => (
        <text key={t} className="t-sub" x={x(t)} y={AXIS + 22} textAnchor={t === 0 ? 'start' : t === 100 ? 'end' : 'middle'}>{t}%</text>
      ))}
    </svg>
  );
}
