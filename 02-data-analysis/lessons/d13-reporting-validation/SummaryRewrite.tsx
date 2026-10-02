/** 같은 가정 숫자를 나쁜 요약과 고친 요약으로 쓴다. 숫자는 코드로 계산한다(가정한 앱 전환율 예시). */
const A = { x: 48, n: 400 }; // 9월
const B = { x: 42, n: 400 }; // 8월
const pa = (A.x / A.n) * 100;
const pb = (B.x / B.n) * 100;
const diff = pa - pb;
const pct = (v: number) => `${v.toFixed(1)}%`;

type Line = { k?: string; v: string };

const BAD: Line[] = [
  { v: '9월 앱 분석 결과 공유합니다.' },
  { v: '여러 지표를 살펴보았습니다.' },
  { v: '전반적으로 개선된 모습입니다.' },
  { v: '세부 내용은 첨부를 참고하세요.' },
];
const GOOD: Line[] = [
  { k: '결론', v: `전환율 ${pct(pa)}, 8월 대비 +${diff.toFixed(1)}%p.` },
  { v: '이 차이는 오차 범위 안이다.' },
  { k: '근거', v: `9월 ${A.x}/${A.n}, 8월 ${B.x}/${B.n}` },
  { k: '한계', v: '앱 방문만 집계, 웹 제외' },
  { k: '다음', v: '2주 더 모아 같은 식으로 재확인' },
];

// 여백 기준: 상자 안 위 26(첫 baseline) 아래 16, 줄 간격 22, 상자 바깥 제목은 상자에서 10 이상, 두 묶음 사이 24 이상.
const X = 8;
const W = 344;
const PITCH = 22;
const boxH = (n: number) => 26 + (n - 1) * PITCH + 16;
const T1 = 18; // 첫 제목 baseline
const B1 = T1 + 12; // 첫 상자 y
const B1H = boxH(BAD.length);
const T2 = B1 + B1H + 36; // 둘째 제목 baseline (첫 상자 아랫변과 제목 윗부분 사이 약 26)
const B2 = T2 + 12;
const B2H = boxH(GOOD.length);
const VB_H = Math.ceil(B2 + B2H + 1 + 8); // 점선 두께 2의 절반 + 아래 여백 8

function Panel({ y, h, cls, lines }: { y: number; h: number; cls: string; lines: Line[] }) {
  return (
    <g>
      <rect className={cls} x={X} y={y} width={W} height={h} rx="8" />
      {lines.map((l, i) => (
        <text key={i} x={X + 14} y={y + 26 + i * PITCH} fontSize={13}>
          {l.k && <tspan fontWeight={700}>{l.k}: </tspan>}
          {l.v}
        </text>
      ))}
    </g>
  );
}

export default function SummaryRewrite() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`나쁜 보고 요약은 결론과 숫자가 없다. 고친 요약은 첫 줄에 전환율 ${pct(pa)}와 8월 대비 +${diff.toFixed(1)}퍼센트포인트를 쓰고, 오차 범위, 근거, 한계, 다음 행동 순서로 쓴다.`}>
      <text className="t-bad" x={X} y={T1}>나쁜 요약: 결론과 숫자가 없다</text>
      <Panel y={B1} h={B1H} cls="svg-box-bad" lines={BAD} />
      <text className="t-good" x={X} y={T2}>고친 요약: 첫 줄에 결론과 숫자</text>
      <Panel y={B2} h={B2H} cls="svg-box-good" lines={GOOD} />
    </svg>
  );
}
