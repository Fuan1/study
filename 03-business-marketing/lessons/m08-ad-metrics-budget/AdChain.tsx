/** 광고비가 매출이 되기까지의 사슬. 값은 모두 가정이고, 노출부터 매출까지 코드로 계산한다. */
const SPEND = 1_000_000;
const CPM = 10_000;
const CTR = 0.01;
const CVR = 0.03;
const AOV = 100_000; // 객단가: 전환 1건당 매출
const IMP = Math.round((SPEND / CPM) * 1000);
const CLK = Math.round(IMP * CTR);
const CONV = Math.round(CLK * CVR);
const REV = CONV * AOV;
const fmt = (n: number) => n.toLocaleString('en-US');

const BW = 176;
const BH = 40;
const GAP = 36;
const X = 8;
const Y0 = 36;
const RX = X + BW + 24; // 오른쪽 열 x
const yOf = (i: number) => Y0 + i * (BH + GAP);

const BOXES = [
  { k: '광고비', v: `${fmt(SPEND)}원`, right: '' },
  { k: '노출', v: `${fmt(IMP)}회`, right: '' },
  { k: '클릭', v: `${fmt(CLK)}회`, right: `CPC ${fmt(Math.round(SPEND / CLK))}원` },
  { k: '전환', v: `${fmt(CONV)}건`, right: `CPA ${fmt(Math.round(SPEND / CONV))}원` },
  { k: '매출', v: `${fmt(REV)}원`, right: `ROAS ${(REV / SPEND).toFixed(2)}` },
];
const LINKS = [`CPM ${fmt(CPM)}원`, `CTR ${(CTR * 100).toFixed(1)}%`, `CVR ${(CVR * 100).toFixed(1)}%`, `객단가 ${fmt(AOV)}원`];

const LAST_BOTTOM = yOf(BOXES.length - 1) + BH;
const VB_H = LAST_BOTTOM + 1 + 16; // 아랫변 + 선 두께 절반 + 아래 여백

export default function AdChain() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`광고비 ${fmt(SPEND)}원이 노출 ${fmt(IMP)}회, 클릭 ${fmt(CLK)}회, 전환 ${fmt(CONV)}건, 매출 ${fmt(REV)}원이 된다. 단계마다 CPM, CTR, CVR, 객단가가 걸리고 그 결과 CPC ${fmt(SPEND / CLK)}원, CPA ${fmt(Math.round(SPEND / CONV))}원, ROAS ${(REV / SPEND).toFixed(2)}가 나온다.`}>
      <defs>
        <marker id="ar-m08a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x={X} y="18">양 (가정)</text>
      <text className="t-sub" x={RX} y="18">단가·효율</text>
      {BOXES.map((b, i) => (
        <g key={b.k}>
          <rect className={i === 0 ? 'svg-box-key' : 'svg-box'} x={X} y={yOf(i)} width={BW} height={BH} rx="8" />
          <text className="t-strong" x={X + 14} y={yOf(i) + 26}>{b.k} {b.v}</text>
          {b.right && <text className="t-warm" x={RX} y={yOf(i) + 26}>{b.right}</text>}
          {i < LINKS.length && (
            <g>
              <line className="svg-flow" x1={X + BW / 2} y1={yOf(i) + BH + 6} x2={X + BW / 2} y2={yOf(i) + BH + GAP - 6} markerEnd="url(#ar-m08a)" />
              <text className="t-sub" x={X + BW / 2 + 14} y={yOf(i) + BH + GAP / 2 + 5}>{LINKS[i]}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
