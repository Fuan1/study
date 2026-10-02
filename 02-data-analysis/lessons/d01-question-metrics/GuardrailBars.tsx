// 출처 값(Kohavi 외 2012): 버그가 든 실험에서 사용자당 고유 질의 10퍼센트 초과, 사용자당 수익 30퍼센트 초과 상승. 막대는 이 하한값을 그린 것이다.
const PER_PCT = 5.6;
const BARS = [
  { label: '사용자당 수익', pct: 30, y: 24 },
  { label: '사용자당 고유 질의', pct: 10, y: 88 },
];
const BOX_Y = 146;
const BOX_H = 66;
const VB_H = BOX_Y + BOX_H + 12;

export default function GuardrailBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="버그가 든 실험 변경에서 사용자당 수익은 30퍼센트 넘게, 사용자당 고유 질의는 10퍼센트 넘게 올랐지만 검색 결과 품질은 크게 나빠졌다.">
      {BARS.map((b) => (
        <g key={b.label}>
          <text className="t-strong" x="8" y={b.y}>{b.label}</text>
          <rect className="svg-berg" x="8" y={b.y + 10} width={b.pct * PER_PCT} height="24" rx="4" />
          <text className="t-warm" x={8 + b.pct * PER_PCT + 8} y={b.y + 28}>+{b.pct}퍼센트 넘게</text>
        </g>
      ))}
      <rect className="svg-box-bad" x="8" y={BOX_Y} width="344" height={BOX_H} rx="8" />
      <text className="t-strong" x="22" y={BOX_Y + 29}>검색 결과 품질: 크게 나빠짐</text>
      <text className="t-sub" x="22" y={BOX_Y + 51}>원인은 아주 나쁜 결과를 보여 준 버그</text>
    </svg>
  );
}
