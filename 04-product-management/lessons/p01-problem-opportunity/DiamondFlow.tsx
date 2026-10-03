/**
 * Design Council 의 Double Diamond(발견, 정의, 개발, 전달)에 이 글의 결과물을 놓았다.
 * 이 글은 첫 번째 다이아몬드(발견, 정의)를 다룬다. 단계 이름과 발산·수렴 구분은 출처 설명을 따른 것이다.
 */
const MID1 = 92; // 첫 다이아몬드의 가장 넓은 곳
const MID2 = 268;
const TOP = 8;
const CY = 58; // 다이아몬드 세로 중심
const HALF = 50; // 가장 넓은 곳의 반높이
const poly = (l: number, m: number, r: number) => `${l},${CY} ${m},${CY - HALF} ${r},${CY} ${m},${CY + HALF}`;

const PHASES = [
  { x: 50, head: '발견', sub: '만나서 이해', mode: '발산' },
  { x: 134, head: '정의', sub: '문제를 정함', mode: '수렴' },
  { x: 226, head: '개발', sub: '여러 답 찾기', mode: '발산' },
  { x: 310, head: '전달', sub: '작게 시험', mode: '수렴' },
];

const PHASE_HEAD_Y = TOP + 2 * HALF + 32;
const BOX_Y = PHASE_HEAD_Y + 20 + 24;
const BOX_H = 116;
const VB_H = BOX_Y + BOX_H + 1 + 8;

export default function DiamondFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="두 개의 다이아몬드. 첫 번째는 발견에서 넓혀 정의에서 좁히고, 두 번째는 개발에서 넓혀 전달에서 좁힌다. 이 글의 결과물인 문제 정의서, 기회 평가표, 기회 구조도는 첫 번째 다이아몬드에서 나오고, 가설·실험, 명세, 우선순위는 두 번째 쪽의 다른 글이다.">
      <polygon className="svg-box-key" points={poly(8, MID1, 176)} />
      <polygon className="svg-box" points={poly(184, MID2, 352)} />
      {PHASES.map((p) => (
        <g key={p.head}>
          <text className="t-sub" x={p.x} y={CY + 4} textAnchor="middle">{p.mode}</text>
          <text className="t-strong" x={p.x} y={PHASE_HEAD_Y} textAnchor="middle">{p.head}</text>
          <text className="t-sub" x={p.x} y={PHASE_HEAD_Y + 20} textAnchor="middle">{p.sub}</text>
        </g>
      ))}
      <rect className="svg-berg" x="8" y={BOX_Y} width="168" height={BOX_H} rx="8" />
      <text className="t-accent" x="22" y={BOX_Y + 28}>이 글의 결과물</text>
      <text className="t-strong" x="22" y={BOX_Y + 54}>문제 정의서</text>
      <text className="t-strong" x="22" y={BOX_Y + 78}>기회 평가표</text>
      <text className="t-strong" x="22" y={BOX_Y + 102}>기회 구조도</text>
      <rect className="svg-box" x="184" y={BOX_Y} width="168" height={BOX_H} rx="8" />
      <text className="t-sub" x="198" y={BOX_Y + 28}>다른 글에서</text>
      <text className="t-sub" x="198" y={BOX_Y + 54}>가설·실험 p03</text>
      <text className="t-sub" x="198" y={BOX_Y + 78}>명세 p04</text>
      <text className="t-sub" x="198" y={BOX_Y + 102}>우선순위 p05</text>
    </svg>
  );
}
