// 형태 예시(가상 값): 같은 선 네 개를 나쁜 방식과 고친 방식으로 그린다. 좌표는 값에서 코드로 계산한다.
const DATA: Record<string, number[]> = {
  A안: [40, 38, 39, 37, 36, 34],
  B안: [55, 52, 54, 50, 51, 48],
  C안: [20, 28, 35, 42, 52, 63],
  D안: [78, 77, 76, 77, 78, 77],
};
const NAMES = Object.keys(DATA);
const RAINBOW = ['var(--accent)', 'var(--warm)', 'var(--good)', 'var(--bad)'];

const X0 = 16;
const X1 = 270;
const PLOT = 160; // 값 0에서 80까지의 높이. 선 끝 값 사이가 14 이상이면 라벨 중심 간격이 28px 이상이다
const MAX = 80;
const px = (i: number) => X0 + (i * (X1 - X0)) / 5;

function Panel({ y0, fixed }: { y0: number; fixed: boolean }) {
  const top = y0 + 58;
  const bottom = top + PLOT;
  const py = (v: number) => bottom - (v / MAX) * PLOT;
  return (
    <g>
      <text className={fixed ? 't-good' : 't-bad'} x="8" y={y0 + 14}>{fixed ? '고친 예' : '나쁜 예'}</text>
      <text className="t-strong" x="8" y={y0 + 40}>{fixed ? 'C안만 여섯 분기 내내 올랐다' : '분기별 지표 추이'}</text>
      <line x1={X0} y1={bottom} x2={X1} y2={bottom} stroke="var(--line)" />
      {NAMES.map((n, k) => {
        const pts = DATA[n].map((v, i) => `${px(i)},${py(v)}`).join(' ');
        const hot = n === 'C안';
        const stroke = fixed ? (hot ? 'var(--accent)' : 'var(--muted)') : RAINBOW[k];
        return (
          <g key={n}>
            <polyline points={pts} fill="none" stroke={stroke} strokeWidth={fixed && hot ? 3 : 1.5} strokeLinejoin="round" />
            {fixed && <text className={hot ? 't-strong' : 't-sub'} x={X1 + 8} y={py(DATA[n][5]) + 4}>{n}</text>}
          </g>
        );
      })}
      <text className="t-sub" x={X0} y={bottom + 22}>1분기</text>
      <text className="t-sub" x={X1} y={bottom + 22} textAnchor="end">6분기</text>
      {!fixed && NAMES.map((n, k) => (
        <g key={n}>
          <rect x={16 + k * 80} y={bottom + 38} width="10" height="10" rx="2" fill={RAINBOW[k]} />
          <text className="t-sub" x={32 + k * 80} y={bottom + 48}>{n}</text>
        </g>
      ))}
    </g>
  );
}

// 첫 패널: y0=8 → 범례 글자 baseline 8+58+160+48 = 274. 구분선 298, 둘째 패널 y0=314.
// 둘째 패널: 314+58+160+22 = 554(1·6분기 글자 baseline) + 4(글자 아래) = 558 → 높이 568.
export default function ChartFix() {
  return (
    <svg viewBox="0 0 360 568" role="img" aria-label="같은 선 네 개를 두 방식으로 그린 비교. 위는 제목이 주제만 쓰고 선마다 다른 색을 쓰며 범례로 찾게 한다. 아래는 제목에 결론을 쓰고, 강조할 C안만 밝고 굵게, 나머지는 회색으로 두고 선 끝에 이름을 직접 붙인다.">
      <Panel y0={8} fixed={false} />
      <line x1="8" y1="298" x2="352" y2="298" stroke="var(--line)" />
      <Panel y0={314} fixed />
    </svg>
  );
}
