/** 평균 게재순위는 쿼리 전체의 평균이라, 기존 순위가 그대로여도 낮은 순위의 신규 쿼리가 늘면 나빠 보인다.
 *  2위·3위는 구글 공식 문서의 계산 예(평균 2.5)이고 40위 쿼리는 가정한 값이다. */
type Q = { label: string; pos: number; cls: string };
type Panel = { title: string; qs: Q[] };

const PANELS: Panel[] = [
  { title: '변경 전', qs: [
    { label: '쿼리 1', pos: 2, cls: 'svg-berg' },
    { label: '쿼리 2', pos: 3, cls: 'svg-berg' },
  ] },
  { title: '신규 쿼리 추가 후', qs: [
    { label: '쿼리 1', pos: 2, cls: 'svg-berg' },
    { label: '쿼리 2', pos: 3, cls: 'svg-berg' },
    { label: '쿼리 3 신규', pos: 40, cls: 'svg-tip' },
  ] },
];

const avg = (p: Panel) => p.qs.reduce((a, q) => a + q.pos, 0) / p.qs.length;

const BX = 100; // 막대 시작 x
const PX = 5; // 순위 1 = 5px
const BAR_H = 16;
const ROW = 30;
const HEAD = 30;
const PANEL_GAP = 28;
const TOP = 8;
const panelTop = (i: number) => TOP + PANELS.slice(0, i).reduce((a, p) => a + HEAD + p.qs.length * ROW + PANEL_GAP, 0);
const last = PANELS[PANELS.length - 1];
// 마지막 막대 아랫변 + 아래 여백 8
const VB_H = Math.ceil(panelTop(PANELS.length - 1) + HEAD + (last.qs.length - 1) * ROW + BAR_H + 8);

export default function AvgPosition() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`평균 게재순위 계산. 쿼리 1이 2위, 쿼리 2가 3위이면 평균 ${avg(PANELS[0]).toFixed(1)}위. 가정한 신규 쿼리가 40위로 더해지면 기존 순위가 그대로여도 평균 ${avg(PANELS[1]).toFixed(1)}위가 된다.`}>
      {PANELS.map((p, i) => (
        <g key={p.title}>
          <text className="t-strong" x="8" y={panelTop(i) + 14}>{p.title}</text>
          <text className="t-strong" x="352" y={panelTop(i) + 14} textAnchor="end">{`평균 ${avg(p).toFixed(1)}위`}</text>
          {p.qs.map((q, j) => {
            const by = panelTop(i) + HEAD + j * ROW;
            return (
              <g key={q.label}>
                <text className="t-sub" x="8" y={by + 13}>{q.label}</text>
                <rect className={q.cls} x={BX} y={by} width={q.pos * PX} height={BAR_H} rx="4" />
                <text className="t-sub" x={BX + q.pos * PX + 8} y={by + 13}>{`${q.pos}위`}</text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
