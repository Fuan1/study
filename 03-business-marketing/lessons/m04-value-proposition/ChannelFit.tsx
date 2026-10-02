/** 채널이 좁을수록 5칸 중 넣을 수 있는 칸이 줄고, 결과 칸은 모든 채널에서 남긴다(관행 기준). */
const COLS = ['누구', '문제', '결과', '증거', '행동'];
// 1은 넣는다, 0은 공간이 되면 넣는다.
const ROWS: { name: string; v: number[] }[] = [
  { name: '검색 제목', v: [0, 0, 1, 0, 0] },
  { name: '검색 설명', v: [0, 0, 1, 1, 1] },
  { name: '이메일 제목', v: [0, 0, 1, 0, 0] },
  { name: '랜딩 첫 화면', v: [1, 0, 1, 0, 1] },
  { name: '랜딩 전체', v: [1, 1, 1, 1, 1] },
];

const CX0 = 124;
const STEP = 54;
const R = 10;
const HEAD = 20;
const ROW0 = 52; // 첫 행 중심 y
const PITCH = 40;
const cy = (i: number) => ROW0 + i * PITCH;
const LEG_Y = cy(ROWS.length - 1) + R + 30;
const VB_H = Math.ceil(LEG_Y + R + 1 + 8);

export default function ChannelFit() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="채널별로 담는 칸. 모든 채널이 결과 칸을 넣는다. 검색 제목과 이메일 제목은 결과만 확실히 넣고, 검색 설명은 결과, 증거, 행동을 넣고, 랜딩 첫 화면은 누구, 결과, 행동을 넣고, 랜딩 전체는 다섯 칸을 모두 넣는다.">
      {COLS.map((c, j) => (
        <text key={c} className="t-sub" x={CX0 + j * STEP} y={HEAD} textAnchor="middle">{c}</text>
      ))}
      {ROWS.map((r, i) => (
        <g key={r.name}>
          <text className="t-strong" x="8" y={cy(i) + 5}>{r.name}</text>
          {r.v.map((on, j) => (
            <circle key={j} className={on ? 'svg-berg' : 'svg-box'} cx={CX0 + j * STEP} cy={cy(i)} r={R} />
          ))}
        </g>
      ))}
      <circle className="svg-berg" cx="18" cy={LEG_Y} r="8" />
      <text className="t-sub" x="34" y={LEG_Y + 5}>넣는다</text>
      <circle className="svg-box" cx="112" cy={LEG_Y} r="8" />
      <text className="t-sub" x="128" y={LEG_Y + 5}>공간이 되면 넣는다</text>
    </svg>
  );
}
