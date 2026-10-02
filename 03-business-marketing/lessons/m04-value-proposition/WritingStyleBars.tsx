/** Morkes and Nielsen (1997) 3번째 연구, 홍보체 기준 대비 측정 사용성 향상(%). 출처 값. */
const ROWS: { name: string; v: number; cls: string }[] = [
  { name: '홍보체(기준)', v: 0, cls: 'svg-box' },
  { name: '간결하게(분량 절반)', v: 58, cls: 'svg-berg' },
  { name: '훑기 쉬운 배치', v: 47, cls: 'svg-berg' },
  { name: '객관적 문체', v: 27, cls: 'svg-berg' },
  { name: '셋을 합친 버전', v: 124, cls: 'svg-box-key' },
];

const SCALE = 2.2; // 퍼센트 1당 px. 124% = 272.8px
const X0 = 8;
const PITCH = 60;
const BAR_H = 22;
const TOP = 8;
const VB_H = Math.ceil(TOP + (ROWS.length - 1) * PITCH + 26 + BAR_H + 1 + 8);

export default function WritingStyleBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="같은 정보를 다르게 쓴 사이트 비교. 홍보체 기준 대비 간결하게 58퍼센트, 훑기 쉬운 배치 47퍼센트, 객관적 문체 27퍼센트, 세 가지를 합치면 124퍼센트 사용성이 높았다.">
      {ROWS.map((r, i) => {
        const y0 = TOP + i * PITCH;
        const w = r.v * SCALE;
        return (
          <g key={r.name}>
            <text className="t-strong" x={X0} y={y0 + 14}>{r.name}</text>
            {r.v > 0 ? (
              <g>
                <rect className={r.cls} x={X0} y={y0 + 26} width={w} height={BAR_H} rx="3" />
                <text className="t-sub" x={X0 + w + 8} y={y0 + 26 + 16}>+{r.v}%</text>
              </g>
            ) : (
              <text className="t-sub" x={X0} y={y0 + 26 + 16}>0% (비교 기준)</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
