/**
 * Hu & Nation (2000) 의 표 4. 66명이 673단어 이야기를 사전 없이 읽고 객관식 14문항 중 12개 이상 맞힌 사람 수.
 * 100% 15/17, 95% 6/17, 90% 4/16, 80% 0/16. 비율은 코드로 계산한다.
 */
type Row = { cover: string; ok: number; total: number };

const ROWS: Row[] = [
  { cover: '100%', ok: 15, total: 17 },
  { cover: '95%', ok: 6, total: 17 },
  { cover: '90%', ok: 4, total: 16 },
  { cover: '80%', ok: 0, total: 16 },
];

const BX = 64;
const BW = 176;
const BH = 28;
const PITCH = 48;
const TOP = 56;

export default function HuNationBars() {
  const VB_H = TOP + (ROWS.length - 1) * PITCH + BH + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="글의 아는 단어 비율별로 객관식 14문항 중 12개 이상 맞힌 학습자. 100퍼센트 17명 중 15명, 95퍼센트 17명 중 6명, 90퍼센트 16명 중 4명, 80퍼센트 16명 중 0명.">
      <text className="t-sub" x="8" y="18">왼쪽: 글에서 아는 단어 비율</text>
      <text className="t-sub" x="8" y="38">막대: 12문항 이상 맞힌 학습자 비율</text>
      {ROWS.map((r, i) => {
        const y = TOP + i * PITCH;
        const w = (r.ok / r.total) * BW;
        return (
          <g key={r.cover}>
            <text className="t-strong" x="8" y={y + 19}>{r.cover}</text>
            <rect className="svg-box" x={BX} y={y} width={BW} height={BH} rx="4" />
            {w > 0 && <rect className="svg-berg" x={BX} y={y} width={w} height={BH} rx="4" />}
            <text className="t-sub" x={BX + BW + 10} y={y + 19}>{r.ok} / {r.total}명</text>
          </g>
        );
      })}
    </svg>
  );
}
