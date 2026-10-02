/** 새 롱테일 쿼리가 늘면 기존 순위가 그대로여도 노출 가중 평균 순위가 나빠 보인다. 노출수와 순위는 가정한 값이다. */
type Seg = { imp: number; pos: number; cls: string };
type Case = { label: string; segs: Seg[] };

const CASES: Case[] = [
  { label: '변경 전', segs: [{ imp: 1000, pos: 3, cls: 'svg-berg' }] },
  { label: '롱테일 추가 후', segs: [{ imp: 1000, pos: 3, cls: 'svg-berg' }, { imp: 1000, pos: 30, cls: 'svg-tip' }] },
];

const avg = (c: Case) => c.segs.reduce((a, s) => a + s.imp * s.pos, 0) / c.segs.reduce((a, s) => a + s.imp, 0);

const X0 = 8;
const PX = 150 / 1000; // 노출 1,000건 = 150px
const BAR_H = 40;
const PITCH = 98; // 라벨 18 + 막대 40 + 아래 24 이상
const TOP = 8;
const STROKE = 1.5;
const barY = (i: number) => TOP + i * PITCH + 26;
const noteY = barY(CASES.length - 1) + BAR_H + 28;
const VB_H = Math.ceil(noteY + 4 + 8);
const fmt = (n: number) => n.toLocaleString('en-US');

export default function AvgPosition() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가정한 값. 변경 전에는 3위 노출 1,000건이라 평균 순위 ${avg(CASES[0]).toFixed(1)}. 30위 노출 1,000건이 새로 생기면 평균 순위가 ${avg(CASES[1]).toFixed(1)}로 나빠지지만 기존 3위 노출은 그대로다.`}>
      {CASES.map((c, i) => {
        let x = X0;
        return (
          <g key={c.label}>
            <text className="t-strong" x={X0} y={TOP + i * PITCH + 14}>{c.label}</text>
            <text className="t-strong" x={352} y={TOP + i * PITCH + 14} textAnchor="end">{`평균 ${avg(c).toFixed(1)}위`}</text>
            {c.segs.map((s) => {
              const w = s.imp * PX;
              const sx = x;
              x += w;
              return (
                <g key={s.pos}>
                  <rect className={s.cls} x={sx} y={barY(i)} width={w} height={BAR_H} rx="6" />
                  <text className="t-sub" x={sx + 14} y={barY(i) + 25}>{`${s.pos}위 · ${fmt(s.imp)}`}</text>
                </g>
              );
            })}
          </g>
        );
      })}
      <text className="t-good" x={X0} y={noteY}>기존 3위 노출은 그대로 3.0위</text>
    </svg>
  );
}
