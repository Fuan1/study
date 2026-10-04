/**
 * 제안, 조언, 의무의 강도. could 는 제안, should 는 조언, must 는 강한 조언이나 의무다.
 * 문장은 이 글에서 직접 쓴 예이고 순서는 영국 문화원 자료의 용법 설명을 이 글이 정리한 것이다.
 */
const STEPS = [
  { w: 'could', ko: '제안', ex: 'We could go.' },
  { w: 'should', ko: '조언', ex: 'We should go.' },
  { w: 'must', ko: '강한 의무', ex: 'We must go.' },
];

const BW = 108;
const GAP = 10;
const TOP = 52;
const H = 104;

export default function AdviceScale() {
  const vbH = TOP + H + 8 + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="could는 제안, should는 조언, must는 강한 의무로 갈수록 강해진다.">
      <defs>
        <marker id="ar9b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x="8" y="18">약함</text>
      <text className="t-sub" x="352" y="18" textAnchor="end">강함</text>
      <line className="svg-flow" x1="52" y1="14" x2="306" y2="14" markerEnd="url(#ar9b)" />
      {STEPS.map((s, i) => {
        const x = 8 + i * (BW + GAP);
        const cls = i === 2 ? 'svg-box-key' : 'svg-box';
        return (
          <g key={s.w}>
            <rect className={cls} x={x} y={TOP} width={BW} height={H} rx="8" />
            <text className="t-strong" x={x + BW / 2} y={TOP + 30} textAnchor="middle">{s.w}</text>
            <text className="t-sub" x={x + BW / 2} y={TOP + 50} textAnchor="middle">{s.ko}</text>
            <text className="t-sub" x={x + BW / 2} y={TOP + 82} textAnchor="middle">{s.ex}</text>
          </g>
        );
      })}
    </svg>
  );
}
