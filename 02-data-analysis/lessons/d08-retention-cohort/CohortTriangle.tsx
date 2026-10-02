/** 형태 예시(가상 값). 마지막 칸(*)은 아직 끝나지 않은 기간이다. */
const ROWS: { name: string; v: number[] }[] = [
  { name: '1월 가입', v: [100, 42, 31, 27, 22] },
  { name: '2월 가입', v: [100, 44, 33, 24] },
  { name: '3월 가입', v: [100, 41, 24] },
  { name: '4월 가입', v: [100, 33] },
  { name: '5월 가입', v: [100] },
];
const COLS = 5;
const X0 = 84; // 첫 칸 x
const PITCH = 52;
const CW = 48;
const Y0 = 58; // 첫 행 y
const RP = 46;
const CH = 40; // 숫자(약 10px)와 칸 가장자리 사이 15px
const LAST_BOTTOM = Y0 + (ROWS.length - 1) * RP + CH; // 마지막 칸 아랫변
const LEGEND_Y = LAST_BOTTOM + 8 + 13; // 상자 아래 8px 뒤 글자 baseline
const HEIGHT = LEGEND_Y + 4 + 10; // 글자 아래 여백

export default function CohortTriangle() {
  return (
    <svg viewBox={`0 0 360 ${HEIGHT}`} role="img" aria-label="코호트 유지율 표의 모양. 행은 가입 월 코호트, 열은 가입 후 경과 개월이다. 첫 열은 모두 100이고 오른쪽으로 갈수록 값이 내려가며, 최근 코호트일수록 칸이 적어 삼각형 모양이 된다. 각 행의 마지막 칸은 아직 끝나지 않은 기간이라 별표를 붙였다.">
      <text className="t-sub" x="8" y="18">유지율(%)  ·  가로축은 가입 후 경과 개월</text>
      {Array.from({ length: COLS }).map((_, c) => (
        <text key={c} className="t-sub" x={X0 + c * PITCH + CW / 2} y="46" textAnchor="middle">{c}개월</text>
      ))}
      {ROWS.map((r, i) => {
        const y = Y0 + i * RP;
        return (
          <g key={r.name}>
            <text className="t-strong" x="8" y={y + 25}>{r.name}</text>
            {r.v.map((v, c) => {
              const last = c === r.v.length - 1;
              return (
                <g key={c}>
                  <rect x={X0 + c * PITCH} y={y} width={CW} height={CH} rx="4" fill="var(--accent)" fillOpacity={0.06 + 0.3 * (v / 100)} stroke={last ? 'var(--warm)' : 'none'} strokeWidth="1.5" />
                  <text className={last ? 't-warm' : 't-strong'} x={X0 + c * PITCH + CW / 2} y={y + 25} textAnchor="middle">{v}{last ? '*' : ''}</text>
                </g>
              );
            })}
          </g>
        );
      })}
      <text className="t-warm" x="8" y={LEGEND_Y}>* 아직 끝나지 않은 기간. 최종 값이 아니다</text>
    </svg>
  );
}
