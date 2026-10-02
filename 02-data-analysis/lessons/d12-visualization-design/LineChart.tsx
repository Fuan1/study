/** 한 계열만 강조하고 나머지는 회색, 라벨은 선 끝에 직접 붙인 선 차트. 값은 가정이다. */
type Series = { name: string; v: number[]; hi?: boolean };

const SERIES: Series[] = [
  { name: '서울', v: [100, 104, 109, 115, 121, 128], hi: true },
  { name: '부산', v: [100, 103, 102, 106, 108, 111] },
  { name: '대구', v: [100, 99, 101, 102, 103, 104] },
  { name: '광주', v: [100, 98, 99, 97, 98, 97] },
];
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월'];

const X0 = 44;
const X1 = 282;
const VMIN = 90;
const VMAX = 130;
const YTOP = 70;
const PX = 4; // 지수 1당 픽셀
const YB = YTOP + (VMAX - VMIN) * PX; // 축 아래끝 y
const xOf = (i: number) => X0 + (i / (MONTHS.length - 1)) * (X1 - X0);
const yOf = (v: number) => YB - (v - VMIN) * PX;

export default function LineChart() {
  const hi = SERIES.find((s) => s.hi)!;
  const growth = Math.round((hi.v[hi.v.length - 1] / hi.v[0] - 1) * 100);
  const noteY = YB + 44;
  const srcY = noteY + 22;
  const vbH = srcY + 4 + 12;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label={`서울만 색을 준 선 차트. 6월 서울 매출 지수는 1월 100보다 ${growth}퍼센트 높은 128이고, 부산 111, 대구 104, 광주 97은 회색이다.`}>
      <text className="t-strong" x="8" y="20">6월 서울 매출이 1월보다 {growth}% 높다</text>
      <text className="t-sub" x="8" y="40">월 매출 지수(1월=100), 2025년 1~6월</text>
      {[100, 120].map((t) => (
        <g key={t}>
          <line x1={X0} y1={yOf(t)} x2={X1} y2={yOf(t)} stroke="var(--line)" strokeWidth="1" />
          <text className="t-sub" x={X0 - 6} y={yOf(t) + 4} textAnchor="end">{t}</text>
        </g>
      ))}
      <line x1={X0} y1={YB} x2={X1} y2={YB} stroke="var(--muted)" strokeWidth="1.5" />
      <text className="t-sub" x={X0 - 6} y={YB + 4} textAnchor="end">{VMIN}</text>
      {MONTHS.map((m, i) => (
        <text key={m} className="t-sub" x={xOf(i)} y={YB + 22} textAnchor="middle">{m}</text>
      ))}
      {SERIES.filter((s) => !s.hi).concat(hi).map((s) => {
        const pts = s.v.map((v, i) => `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ');
        const end = s.v[s.v.length - 1];
        return (
          <g key={s.name}>
            <polyline points={pts} fill="none" stroke={s.hi ? 'var(--warm)' : 'var(--muted)'} strokeWidth={s.hi ? 3 : 2} strokeLinejoin="round" />
            <circle cx={X1} cy={yOf(end)} r={s.hi ? 4 : 3} fill={s.hi ? 'var(--warm)' : 'var(--muted)'} />
            <text className={s.hi ? 't-warm' : 't-sub'} x={X1 + 10} y={yOf(end) + 4}>{s.name} {end}</text>
          </g>
        );
      })}
      <text className="t-sub" x="8" y={noteY}>세로축은 {VMIN}부터 시작</text>
      <text className="t-sub" x="8" y={srcY}>자료: 가정 데이터, 기준일 7월 1일</text>
    </svg>
  );
}
