type Step = { t: string; s: string };

const STEPS: Step[] = [
  { t: '데이터', s: '사용자별 첫 행동 날짜와 이후 활동 기록' },
  { t: '코호트', s: '같은 기간에 시작한 사용자 묶음' },
  { t: '결과물', s: '유지율 표, 유지 곡선, 코호트 비교표' },
  { t: '결정', s: '초기 이탈 개선, 장기 사용자 확보' },
];
const LABELS = ['첫 행동 시점으로 묶는다', '경과 기간별 활동 비율을 센다', '모양과 코호트 차이를 읽는다'];

// 상자 안 글자는 가장자리에서 14px 띄우고, 화살표 라벨은 선에서 12px 띄운다.
const W = 344;
const H = 66;
const GAP = 44;
const y = (i: number) => 8 + i * (H + GAP);
const HEIGHT = y(STEPS.length - 1) + H + 1 + 16; // 마지막 아랫변 + 선 두께 절반 + 아래 여백 16

export default function RetentionFlow() {
  return (
    <svg viewBox={`0 0 360 ${HEIGHT}`} role="img" aria-label="데이터에서 결정까지의 흐름. 사용자별 첫 행동과 활동 기록을 첫 행동 시점으로 묶어 코호트를 만들고, 경과 기간별 활동 비율을 세어 유지율 표와 곡선과 비교표를 만든 뒤, 모양과 코호트 차이를 읽어 초기 이탈 개선이나 장기 사용자 확보를 결정한다.">
      <defs>
        <marker id="ar8a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((st, i) => (
        <g key={st.t}>
          <rect className={i === 2 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{st.t}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{st.s}</text>
          {i < STEPS.length - 1 && (
            <g>
              <line className="svg-flow" x1="30" y1={y(i) + H + 6} x2="30" y2={y(i) + H + GAP - 6} markerEnd="url(#ar8a)" />
              <text className="t-sub" x="42" y={y(i) + H + GAP / 2 + 4}>{LABELS[i]}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
