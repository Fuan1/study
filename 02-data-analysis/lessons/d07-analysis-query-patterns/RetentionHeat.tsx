/** 가입일 코호트 쿼리 결과(가정 데이터)를 가입자 대비 비율로 바꿔 히트맵으로 그린다. 마지막 관측일 1/31 을 넘는 칸은 비운다. */
// 여백 기준: 칸 사이 4px, 범례는 마지막 줄 아래 24px 이상.
const FIRST_DAY = 25; // 1/25 코호트부터
const LAST_OBS = 31; // 마지막 관측일 1/31
const SIZE = [15, 16, 14, 14, 15, 16, 13];
const D = [
  [7, 7, 8, 7, 2, 2],
  [9, 7, 5, 3, 5, 0],
  [6, 5, 5, 6, 0, 0],
  [7, 5, 9, 0, 0, 0],
  [6, 5, 0, 0, 0, 0],
  [6, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
const CX = 96;
const CW = 38;
const CGAP = 4;
const CH = 34;
const Y0 = 30;
const PITCH = CH + CGAP;

export default function RetentionHeat() {
  const lastBottom = Y0 + (D.length - 1) * PITCH + CH; // 258
  const lgY = lastBottom + 28;
  const H = lgY + 14 + 1 + 12;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="1월 25일부터 31일까지 가입 코호트의 1일부터 6일 경과 리텐션 비율 히트맵. 마지막 관측일을 넘는 칸은 비어 있다.">
      <text className="t-sub" x="84" y="18" textAnchor="end">가입</text>
      {[1, 2, 3, 4, 5, 6].map((n, j) => (
        <text key={n} className="t-sub" x={CX + j * (CW + CGAP) + CW / 2} y="18" textAnchor="middle">D{n}</text>
      ))}
      {D.map((row, i) => {
        const y = Y0 + i * PITCH;
        const day = FIRST_DAY + i;
        return (
          <g key={day}>
            <text className="t-strong" x="8" y={y + 22}>1/{day}</text>
            <text className="t-sub" x="84" y={y + 22} textAnchor="end">{SIZE[i]}명</text>
            {row.map((v, j) => {
              const n = j + 1;
              const x = CX + j * (CW + CGAP);
              if (day + n > LAST_OBS) {
                return <rect key={n} className="svg-box" x={x} y={y} width={CW} height={CH} rx="4" strokeDasharray="3 3" />;
              }
              const p = v / SIZE[i];
              return (
                <g key={n}>
                  <rect x={x} y={y} width={CW} height={CH} rx="4" fill="var(--good)" fillOpacity={0.06 + 0.39 * Math.min(1, p / 0.6)} />
                  <text className="t-strong" x={x + CW / 2} y={y + 22} textAnchor="middle">{Math.round(p * 100)}</text>
                </g>
              );
            })}
          </g>
        );
      })}
      <rect className="svg-box" x="8" y={lgY} width="16" height="14" rx="3" strokeDasharray="3 3" />
      <text className="t-sub" x="32" y={lgY + 12}>아직 관측하지 못한 칸. 숫자는 가입자 대비 %</text>
    </svg>
  );
}
