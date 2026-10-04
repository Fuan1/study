/**
 * Cambridge Dictionary 발음 기호 안내의 예: surprise /səˈpraɪz/, system /ˈsɪs.təm/.
 * sheep /ʃiːp/, ship /ʃɪp/ 는 Cambridge 안내의 모음 표에 나오는 예다.
 */
type Row = { mark: string; title: string; sub: string };
const ROWS: Row[] = [
  { mark: 'ˈ', title: 'surprise /səˈpraɪz/', sub: '기호 뒤 음절이 가장 세다' },
  { mark: 'ː', title: 'sheep /ʃiːp/ ≠ ship /ʃɪp/', sub: 'ː 가 붙은 소리는 다른 소리' },
  { mark: '.', title: 'system /ˈsɪs.təm/', sub: '점에서 음절이 나뉜다' },
];

const BH = 66;
const GAP = 14;
const MW = 56;
const RX = 8 + MW + 8;
const RW = 360 - 8 - RX;

export default function IpaMarks() {
  const VB_H = 8 + ROWS.length * BH + (ROWS.length - 1) * GAP + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="발음 기호에서 먼저 볼 세 가지. 강세 기호, 길이 기호, 음절 나눔 점.">
      {ROWS.map((r, i) => {
        const y = 8 + i * (BH + GAP);
        return (
          <g key={r.mark}>
            <rect className="svg-berg" x="8" y={y} width={MW} height={BH} rx="8" />
            <text className="t-strong" x={8 + MW / 2} y={y + BH / 2 + 5} textAnchor="middle">{r.mark}</text>
            <rect className="svg-box" x={RX} y={y} width={RW} height={BH} rx="8" />
            <text className="t-strong" x={RX + 14} y={y + 28}>{r.title}</text>
            <text className="t-sub" x={RX + 14} y={y + 50}>{r.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}
