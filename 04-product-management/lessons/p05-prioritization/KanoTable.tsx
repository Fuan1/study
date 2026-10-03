/** 출처: Sauerwein 외(1996) 그림 6의 Kano 평가표. 기능이 있을 때(행)와 없을 때(열)의 답 조합이 유형을 정한다. */
const ANS = ['좋다', '당연', '중립', '감수', '싫다'];
const GRID: string[][] = [
  ['Q', 'A', 'A', 'A', 'O'],
  ['R', 'I', 'I', 'I', 'M'],
  ['R', 'I', 'I', 'I', 'M'],
  ['R', 'I', 'I', 'I', 'M'],
  ['R', 'R', 'R', 'R', 'Q'],
];
const CELL_CLS: Record<string, string> = { A: 'svg-berg', O: 'svg-berg', M: 'svg-berg', I: 'svg-box', R: 'svg-box-bad', Q: 'svg-box-bad' };
const TXT_CLS: Record<string, string> = { A: 't-strong', O: 't-strong', M: 't-strong', I: 't-sub', R: 't-bad', Q: 't-bad' };

const X0 = 72;
const CW = 56;
const CH = 48;
const GRID_TOP = 62;
const BOTTOM = GRID_TOP + 5 * CH;
const VB_H = BOTTOM + 24 + 20 + 12;

export default function KanoTable() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="Kano 평가표. 기능이 있을 때와 없을 때의 답 다섯 가지를 조합해 감동, 성능, 기본, 무관심, 반대, 의심 답으로 나눈다.">
      <text className="t-sub" x={X0 + (5 * CW) / 2} y="20" textAnchor="middle">기능이 없을 때의 답</text>
      <text className="t-sub" x="8" y="50">있을 때</text>
      {ANS.map((a, c) => (
        <text key={a} className="t-sub" x={X0 + c * CW + CW / 2} y="50" textAnchor="middle">{a}</text>
      ))}
      {GRID.map((row, r) => (
        <g key={r}>
          <text className="t-sub" x={X0 - 10} y={GRID_TOP + r * CH + CH / 2 + 5} textAnchor="end">{ANS[r]}</text>
          {row.map((k, c) => (
            <g key={c}>
              <rect className={CELL_CLS[k]} x={X0 + c * CW + 2} y={GRID_TOP + r * CH + 2} width={CW - 4} height={CH - 4} rx="4" />
              <text className={TXT_CLS[k]} x={X0 + c * CW + CW / 2} y={GRID_TOP + r * CH + CH / 2 + 5} textAnchor="middle">{k}</text>
            </g>
          ))}
        </g>
      ))}
      <text className="t-sub" x="8" y={BOTTOM + 24}>A 감동 · O 성능 · M 기본</text>
      <text className="t-sub" x="8" y={BOTTOM + 44}>I 무관심 · R 반대 · Q 의심 답</text>
    </svg>
  );
}
