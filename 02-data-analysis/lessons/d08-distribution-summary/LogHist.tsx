/** 같은 가상 체류 시간 1,000세션. 위: 원래 값(구간 폭 40초, 마지막 칸 400초 이상). 아래: log10 값(구간 폭 0.25). 개수와 왜도는 python 으로 계산했다. */
const RAW = [501, 238, 106, 66, 33, 12, 9, 8, 6, 4, 17];
const LOG = [0, 9, 15, 54, 129, 197, 236, 159, 123, 51, 21, 6];
const SKEW_RAW = 3.44;
const SKEW_LOG = 0.05;
const X0 = 16;
const W = 328;
const BAR_H = 72;
const panel = (counts: number[], base: number, tipLast: boolean) => {
  const step = W / counts.length;
  const max = Math.max(...counts);
  return counts.map((c, i) => {
    const h = (c / max) * BAR_H;
    return h > 0 ? <rect key={i} className={tipLast && i === counts.length - 1 ? 'svg-tip' : 'svg-berg'} x={X0 + i * step + 2} y={base - h} width={step - 4} height={h} /> : null;
  });
};
const T1 = 20; // 첫 패널 제목 baseline
const B1 = T1 + 20 + BAR_H; // 첫 패널 바닥 112
const L1 = B1 + 18; // 첫 패널 눈금 글자 baseline 130
const T2 = L1 + 34; // 둘째 패널 제목 baseline
const B2 = T2 + 20 + BAR_H;
const L2 = B2 + 18;
const H = L2 + 6 + 12;
const stepLog = W / LOG.length;
const lx = (v: number) => X0 + (v / 3) * W; // log10 값 0에서 3까지

export default function LogHist() {
  const stepRaw = W / RAW.length;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="같은 체류 시간 데이터의 두 히스토그램. 원래 값은 0초에서 40초 구간에 절반이 몰리고 오른쪽으로 길게 늘어나며 왜도 3.44다. 로그를 취하면 좌우가 비슷해져 왜도 0.05다.">
      <text className="t-strong" x={X0} y={T1}>원래 값</text>
      <text className="t-sub" x={X0 + W} y={T1} textAnchor="end">왜도 {SKEW_RAW.toFixed(2)}</text>
      {panel(RAW, B1, true)}
      <line x1={X0} y1={B1} x2={X0 + W} y2={B1} stroke="var(--line)" strokeWidth="1.5" />
      <text className="t-sub" x={X0} y={L1}>0초</text>
      <text className="t-sub" x={X0 + 5 * stepRaw} y={L1} textAnchor="middle">200</text>
      <text className="t-sub" x={X0 + W} y={L1} textAnchor="end">400 이상</text>
      <text className="t-strong" x={X0} y={T2}>로그를 취한 값(log10)</text>
      <text className="t-sub" x={X0 + W} y={T2} textAnchor="end">왜도 {SKEW_LOG.toFixed(2)}</text>
      {panel(LOG, B2, false)}
      <line x1={X0} y1={B2} x2={X0 + W} y2={B2} stroke="var(--line)" strokeWidth="1.5" />
      {[1, 2, 3].map((v) => (
        <text key={v} className="t-sub" x={lx(v)} y={L2} textAnchor={v === 3 ? 'end' : 'middle'}>{`${10 ** v}초`}</text>
      ))}
      <text className="t-sub" x={X0} y={L2}>1초</text>
    </svg>
  );
}
