/** NN/g 의 두 축(행동 대 태도, 정성 대 정량)에 방법을 놓은 것. 방법 배치는 출처 그대로다. */
const COLS = [
  { x: 8, title: '행동: 하는 것' },
  { x: 184, title: '태도: 말하는 것' },
];
const ROWS = [
  {
    label: '정성: 왜, 어떻게 고치나',
    cells: [
      ['사용성 테스트', '현장 연구', '맥락 조사'],
      ['인터뷰', '포커스 그룹', '참여 설계'],
    ],
  },
  {
    label: '정량: 얼마나, 몇 명',
    cells: [
      ['A/B 테스트', '분석 로그', '클릭 흐름'],
      ['설문', '카드 소팅', '선호도 조사'],
    ],
  },
];

// 여백 기준: 상자 폭 168, 세 줄 상자 높이 92(글자 위아래 12px 이상), 행 라벨은 위 상자에서 18px 이상 띄운다.
const W = 168;
const BH = 92;
const R0 = 62; // 첫 행 상자 y
const R1 = R0 + BH + 52; // 둘째 행 상자 y

export default function Quadrants() {
  const rowY = [R0, R1];
  const bottom = R1 + BH;
  return (
    <svg viewBox={`0 0 360 ${bottom + 9}`} role="img" aria-label="행동과 태도, 정성과 정량으로 나눈 네 칸. 행동·정성은 사용성 테스트, 현장 연구, 맥락 조사. 태도·정성은 인터뷰, 포커스 그룹, 참여 설계. 행동·정량은 A/B 테스트, 분석 로그, 클릭 흐름. 태도·정량은 설문, 카드 소팅, 선호도 조사.">
      {COLS.map((c) => (
        <text key={c.title} className="t-strong" x={c.x} y="22">{c.title}</text>
      ))}
      {ROWS.map((r, ri) => (
        <g key={r.label}>
          <text className="t-accent" x="8" y={rowY[ri] - 10}>{r.label}</text>
          {r.cells.map((cell, ci) => {
            const x = COLS[ci].x;
            const key = ri === 1 && ci === 0; // 로그·거래 같은 행동 기록이 들어오는 칸
            return (
              <g key={ci}>
                <rect className={key ? 'svg-berg' : 'svg-box'} x={x} y={rowY[ri]} width={W} height={BH} rx="8" />
                {cell.map((m, mi) => (
                  <text key={m} x={x + 14} y={rowY[ri] + 29 + mi * 20} fontSize="13">{m}</text>
                ))}
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
