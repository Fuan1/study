/** 가정한 숫자열(실제 카드나 전화번호가 아님)을 묶는 방식에 따라 기억할 단위 수가 달라지는 것을 보인다. */
const BOX = 17;
const STEP = 19;

function Row({ y, digits, groups, x0, gap, tone }: { y: number; digits: string; groups: number[]; x0: number; gap: number; tone: 'bad' | 'good' }) {
  let x = x0;
  let k = 0;
  return (
    <g>
      {groups.map((g, gi) => {
        const gx = x;
        const w = g * STEP - (STEP - BOX);
        const cells = Array.from({ length: g }, (_, i) => {
          const d = digits[k++];
          return (
            <g key={i}>
              <rect className="svg-box" x={gx + i * STEP} y={y} width={BOX} height="26" rx="3" />
              <text x={gx + i * STEP + BOX / 2} y={y + 18} textAnchor="middle" fontSize="13">{d}</text>
            </g>
          );
        });
        x += w + gap;
        return (
          <g key={gi}>
            {cells}
            {tone === 'good' && <rect className="svg-box-good" x={gx - 3} y={y - 4} width={w + 6} height="34" rx="6" />}
          </g>
        );
      })}
    </g>
  );
}

export default function Chunking() {
  return (
    <svg viewBox="0 0 360 292" role="img" aria-label="가정한 16자리 숫자를 낱개 16개로 보면 기억할 단위가 16개이고, 4개씩 묶으면 4덩어리다. 가정한 11자리 번호는 3덩어리로 묶인다.">
      <text className="t-bad" x="8" y="18">묶지 않은 16자리: 낱개 16개</text>
      <Row y={28} digits="1234567890123456" groups={Array(16).fill(1)} x0={28} gap={2} tone="bad" />
      <text className="t-good" x="8" y="104">4자리씩 묶은 16자리: 4덩어리</text>
      <Row y={116} digits="1234567890123456" groups={[4, 4, 4, 4]} x0={14} gap={12} tone="good" />
      <text className="t-good" x="8" y="192">3·4·4로 묶은 11자리: 3덩어리</text>
      <Row y={204} digits="01012345678" groups={[3, 4, 4]} x0={14} gap={12} tone="good" />
      <text className="t-sub" x="8" y="266">숫자는 모두 가정한 예시다.</text>
      <text className="t-sub" x="8" y="284">묶음 경계에 뜻이 있어야 덩어리가 된다.</text>
    </svg>
  );
}
