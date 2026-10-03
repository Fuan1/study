/** 출처의 값. Kohavi 외(2013)의 Microsoft 약 3분의 1과 Google 약 10퍼센트(인용), Kohavi 외(2014)의 Bing 10~20퍼센트. */
type Row = { name: string; value: string; def: string; from: number; to: number };

const ROWS: Row[] = [
  { name: 'Microsoft', value: '약 3분의 1', def: '지표를 개선한 아이디어의 비율', from: 0, to: 100 / 3 },
  { name: 'Bing', value: '10~20%', def: '아이디어의 성공률', from: 10, to: 20 },
  { name: 'Google', value: '약 10%', def: '실험 중 사업 변경으로 이어진 비율', from: 0, to: 10 },
];

const MAX = 40;
const X0 = 24;
const X1 = 336;
const x = (v: number) => X0 + (v / MAX) * (X1 - X0);
const TOP = 8;
const PITCH = 90;
const BAR_H = 20;
const lastY = TOP + (ROWS.length - 1) * PITCH;
const AXIS = lastY + 66 + 24;
const TICKS = [0, 10, 20, 30, 40];
// 눈금 baseline 은 축 아래 20px. 글자 아래 여백 4 + 바깥 여백 8
const VB_H = AXIS + 20 + 4 + 8;

export default function IdeaSuccess() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="출처가 보고한 아이디어 성공률. Microsoft는 약 3분의 1, Bing은 10에서 20퍼센트, Google은 실험 중 사업 변경으로 이어진 비율이 약 10퍼센트다. 정의가 서로 다르다.">
      {ROWS.map((r, i) => {
        const y = TOP + i * PITCH;
        return (
          <g key={r.name}>
            <text className="t-strong" x="16" y={y + 14}>{r.name}</text>
            <text className="t-accent" x="344" y={y + 14} textAnchor="end">{r.value}</text>
            <rect x={x(r.from)} y={y + 24} width={x(r.to) - x(r.from)} height={BAR_H} rx="3" fill="var(--accent)" />
            <text className="t-sub" x="16" y={y + 66}>{r.def}</text>
          </g>
        );
      })}
      <line x1={X0} y1={AXIS} x2={X1} y2={AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {TICKS.map((t) => (
        <text key={t} className="t-sub" x={x(t)} y={AXIS + 20} textAnchor="middle">{t}%</text>
      ))}
    </svg>
  );
}
