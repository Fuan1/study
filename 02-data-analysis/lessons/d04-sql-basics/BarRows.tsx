// 여백 기준: 막대 높이 20(36 미만)이라 숫자는 막대 밖 8px, 라벨은 막대 위 8px, 묶음 사이 24px.
export type BarRow = { label: string; value: number; unit: string; kind: 'rows' | 'groups' };

const X0 = 8;
const UNIT_W = 28; // 값 1 당 폭. 값 10 = 280
const BAR_H = 20;
const LABEL_H = 12; // 라벨 baseline 까지
const LABEL_GAP = 12; // 라벨 baseline 에서 막대 윗변까지(글자 아래쪽 여백 포함 8 이상)
const GROUP_GAP = 24;
const PITCH = LABEL_H + LABEL_GAP + BAR_H + GROUP_GAP;

export default function BarRows({ rows, aria }: { rows: BarRow[]; aria: string }) {
  const top = (i: number) => 8 + i * PITCH;
  const lastBottom = top(rows.length - 1) + LABEL_H + LABEL_GAP + BAR_H;
  const h = Math.ceil(lastBottom + 0.75 + 8); // 아랫변 + 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${h}`} role="img" aria-label={aria}>
      {rows.map((r, i) => {
        const y = top(i);
        const w = r.value * UNIT_W;
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y + LABEL_H}>{r.label}</text>
            <rect className={r.kind === 'rows' ? 'svg-berg' : 'svg-tip'} x={X0} y={y + LABEL_H + LABEL_GAP} width={w} height={BAR_H} rx="4" />
            <text className="t-strong" x={X0 + w + 8} y={y + LABEL_H + LABEL_GAP + 15}>{r.value}{r.unit}</text>
          </g>
        );
      })}
    </svg>
  );
}
