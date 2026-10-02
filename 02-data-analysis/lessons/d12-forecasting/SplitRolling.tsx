/** 형태 예시. 시간 축 위에서 학습(모델이 보는 구간)과 검증(가려 둔 구간)을 나누는 두 방식. 비율은 관행 20%를 그린 것이다. */
const X0 = 8;
const W = 344;
const BH = 24; // 막대 높이 24 < 36 이므로 글자는 막대 밖에 둔다
const px = (frac: number) => X0 + frac * W;

const ROLL = [0.5, 0.62, 0.74]; // 학습이 끝나는 지점(전체 길이 대비)
const CHUNK = 0.1; // 한 번에 맞혀 보는 길이

const Bar = ({ x, y, w, kind }: { x: number; y: number; w: number; kind: 'train' | 'test' }) => (
  <rect className={kind === 'train' ? 'svg-berg' : 'svg-tip'} x={x} y={y} width={w} height={BH} rx="4" />
);

export default function SplitRolling() {
  const y1 = 34;
  const yLab2 = 100;
  const y2 = (i: number) => 112 + i * 38;
  const yAxis = y2(2) + BH + 20;
  return (
    <svg viewBox="0 0 360 292" role="img" aria-label="시간 축에서 학습 구간과 검증 구간을 나누는 두 방식. 한 번 나누기는 앞 80퍼센트로 학습하고 뒤 20퍼센트를 가려 둔다. 롤링은 학습 구간을 늘려 가며 바로 다음 구간을 맞혀 본다. 검증은 항상 학습보다 뒤의 시간이다.">
      <defs>
        <marker id="spAr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-strong" x={X0} y="20">한 번 나누기</text>
      <Bar x={px(0)} y={y1} w={0.8 * W} kind="train" />
      <Bar x={px(0.8)} y={y1} w={0.2 * W} kind="test" />
      <text className="t-strong" x={X0} y={yLab2}>시점을 옮겨 가며 반복(롤링)</text>
      {ROLL.map((end, i) => (
        <g key={end}>
          <Bar x={px(0)} y={y2(i)} w={end * W} kind="train" />
          <Bar x={px(end)} y={y2(i)} w={CHUNK * W} kind="test" />
        </g>
      ))}
      <line className="svg-flow" x1={X0} y1={yAxis} x2="352" y2={yAxis} markerEnd="url(#spAr)" />
      <text className="t-sub" x="180" y={yAxis + 22} textAnchor="middle">시간 순서</text>
      <rect className="svg-berg" x="8" y={yAxis + 36} width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y={yAxis + 48}>학습: 모델이 보는 곳</text>
      <rect className="svg-tip" x="186" y={yAxis + 36} width="14" height="14" rx="3" />
      <text className="t-sub" x="208" y={yAxis + 48}>검증: 가려 둔 곳</text>
    </svg>
  );
}
