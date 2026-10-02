/** 하락률 d 에서 원래 값으로 돌아오려면 d / (1 - d) 만큼 올라야 한다. 정의에서 계산한다. */
const DROPS = [10, 20, 30, 50];
const X0 = 84;
const SCALE = 1.9; // 퍼센트 1당 px. 100% = 190px
const PITCH = 76;

export default function BaseEffect() {
  const H = 40 + DROPS.length * PITCH;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="값이 10, 20, 30, 50퍼센트 떨어졌을 때 원래 값으로 돌아오기 위해 필요한 상승률. 각각 11.1, 25.0, 42.9, 100.0퍼센트로 하락률보다 항상 크다.">
      <rect className="svg-box" x="8" y="6" width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y="18">하락률</text>
      <rect className="svg-berg" x="108" y="6" width="14" height="14" rx="3" />
      <text className="t-sub" x="130" y="18">복구에 필요한 상승률</text>
      {DROPS.map((d, i) => {
        const y = 40 + i * PITCH;
        const need = (d / (100 - d)) * 100;
        return (
          <g key={d}>
            <text className="t-strong" x="8" y={y + 30}>{d}% 하락</text>
            <rect className="svg-box" x={X0} y={y + 8} width={d * SCALE} height="20" rx="3" />
            <text className="t-sub" x={X0 + d * SCALE + 8} y={y + 23}>-{d}%</text>
            <rect className="svg-berg" x={X0} y={y + 36} width={need * SCALE} height="20" rx="3" />
            <text className="t-warm" x={X0 + need * SCALE + 8} y={y + 51}>+{need.toFixed(1)}%</text>
          </g>
        );
      })}
    </svg>
  );
}
