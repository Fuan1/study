/** van Buuren, Flexible Imputation of Missing Data, 표 1.1 의 "편향 없는 추정에 필요한 결측 유형" 을 옮겼다. */
type Need = 'MCAR' | 'MAR' | '불가';
const COLS = ['평균', '회귀계수', '상관'];
const ROWS: { label: string; needs: Need[] }[] = [
  { label: '행 제외', needs: ['MCAR', 'MCAR', 'MCAR'] },
  { label: '평균으로 채움', needs: ['MCAR', '불가', '불가'] },
  { label: '회귀로 채움', needs: ['MAR', 'MAR', '불가'] },
  { label: '빈칸 표시 변수', needs: ['불가', '불가', '불가'] },
];

// 여백 기준: 칸 높이 40(한 줄 글자 위아래 12px 이상), 칸 사이 8.
const X0 = 126; // 첫 칸 x
const CW = 70;
const CG = 6;
const RH = 40;
const PITCH = 48;
const TOP = 60;
const VH = TOP + (ROWS.length - 1) * PITCH + RH + 1 + 8;

const cellClass = (n: Need) => (n === 'MCAR' ? 'svg-box' : n === 'MAR' ? 'svg-berg' : 'svg-box-bad');

export default function MissingGrid() {
  return (
    <svg viewBox={`0 0 360 ${VH}`} role="img" aria-label="처리 방법별로 평균, 회귀계수, 상관이 편향 없이 나오려면 필요한 결측 유형. 행 제외는 세 가지 모두 완전 무작위 결측이어야 한다. 평균으로 채우면 평균만 완전 무작위일 때 맞고, 회귀로 채우면 평균과 회귀계수가 무작위 결측일 때 맞다. 빈칸 표시 변수는 어느 조건에서도 보장되지 않는다.">
      <text className="t-sub" x="8" y="20">편향 없이 추정하려면 필요한 결측 유형</text>
      {COLS.map((c, j) => (
        <text key={c} className="t-strong" x={X0 + j * (CW + CG) + CW / 2} y="48" textAnchor="middle">{c}</text>
      ))}
      {ROWS.map((r, i) => {
        const y = TOP + i * PITCH;
        return (
          <g key={r.label}>
            <text className="t-strong" x="8" y={y + 25}>{r.label}</text>
            {r.needs.map((n, j) => {
              const x = X0 + j * (CW + CG);
              return (
                <g key={j}>
                  <rect className={cellClass(n)} x={x} y={y} width={CW} height={RH} rx="6" />
                  <text className={n === '불가' ? 't-bad' : 't-strong'} x={x + CW / 2} y={y + 25} textAnchor="middle">{n}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
