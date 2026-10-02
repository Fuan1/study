/** 평균 대체가 분포를 한 칸에 몰아넣는 것을 보인다.
 * 가상 데이터: 감마(4, 12) 10,000건, 결측 무작위 약 29%(2,923건). python3 random.seed(7) 로 계산한 구간별 건수(구간 폭 10, 마지막은 150 이상). */
const OBS = [80, 535, 1061, 1387, 1195, 947, 674, 458, 304, 182, 112, 56, 30, 17, 16, 23]; // 관측된 7,077건
const N_MISSING = 2923;
const MEAN_BIN = 4; // 관측 평균 48.2 가 들어가는 구간(40~50)
const SD_OBS = '24.5';
const SD_IMP = '20.6';

// 여백 기준: 패널 제목과 막대 사이 11px, 눈금 글자는 축에서 18px, 패널 사이 24px 이상, 주석은 막대에서 8px 이상.
const BW = 19;
const X0 = 28;
const MAX_H = 90;
const TOP = 28; // 패널 시작에서 막대 영역 윗변까지
const PANEL = 160;
const TICK_BELOW = 18;
const total = (counts: number[], extra: number) => Math.max(...counts.map((c, i) => c + (i === MEAN_BIN ? extra : 0)));
const MAX = total(OBS, N_MISSING);
const scale = (c: number) => (c / MAX) * MAX_H;
const lastBottom = 8 + PANEL + TOP + MAX_H + TICK_BELOW + 3; // 마지막 눈금 글자 baseline 아래 3px
const H = lastBottom + 12;

function Panel({ y0, title, extra }: { y0: number; title: string; extra: number }) {
  const base = y0 + TOP + MAX_H;
  return (
    <g>
      <text className="t-strong" x="8" y={y0 + 14}>{title}</text>
      {OBS.map((c, i) => {
        const h = scale(c);
        const x = X0 + i * BW;
        return <rect key={i} className="svg-berg" x={x + 1} y={base - h} width={BW - 2} height={h} />;
      })}
      {extra > 0 && (
        <rect className="svg-tip" x={X0 + MEAN_BIN * BW + 1} y={base - scale(OBS[MEAN_BIN] + extra)} width={BW - 2} height={scale(extra)} />
      )}
      <line className="svg-flow" x1={X0} y1={base} x2={X0 + OBS.length * BW} y2={base} />
      {[0, 5, 10, 15].map((b) => (
        <text key={b} className="t-sub" x={X0 + b * BW} y={base + TICK_BELOW} textAnchor="middle">{b === 15 ? '150+' : b * 10}</text>
      ))}
      {extra > 0 && (
        <text className="t-warm" x={X0 + (MEAN_BIN + 1) * BW + 8} y={y0 + TOP + 14}>채운 {extra.toLocaleString()}건</text>
      )}
    </g>
  );
}

export default function MeanImpute() {
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`관측된 7,077건의 표준편차는 ${SD_OBS}. 빈 2,923건을 평균 48.2 로 채우면 평균 구간에 건수가 몰려 표준편차가 ${SD_IMP} 로 줄어든다.`}>
      <Panel y0={8} title={`관측된 7,077건 · 표준편차 ${SD_OBS}`} extra={0} />
      <Panel y0={8 + PANEL} title={`평균으로 채운 10,000건 · 표준편차 ${SD_IMP}`} extra={N_MISSING} />
    </svg>
  );
}
