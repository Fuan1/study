/** 가정한 숫자열(실제 카드나 전화번호가 아님)을 묶는 방식에 따라 기억할 단위 수가 달라지는 것을 보인다. */
// 여백 기준: 낱개 칸은 의도적으로 작은 칸이라 안 여백 예외, 칸 사이 6px. 묶음 상자는 글자 좌우 12px 이상, 위아래 12px 이상.
const CELL = 15;
const CELL_GAP = 6;
const CELL_H = 30;
const CHUNK_H = 40;
const CHUNK_GAP = 12;
const chunkW = (n: number) => 14 * n + 16; // 3자리 58, 4자리 72

function Singles({ y, digits, x0 }: { y: number; digits: string; x0: number }) {
  return (
    <g>
      {digits.split('').map((d, i) => (
        <g key={i}>
          <rect className="svg-box" x={x0 + i * (CELL + CELL_GAP)} y={y} width={CELL} height={CELL_H} rx="3" />
          <text x={x0 + i * (CELL + CELL_GAP) + CELL / 2} y={y + 20} textAnchor="middle" fontSize="13">{d}</text>
        </g>
      ))}
    </g>
  );
}

function Chunks({ y, digits, groups, x0 }: { y: number; digits: string; groups: number[]; x0: number }) {
  let x = x0;
  let k = 0;
  return (
    <g>
      {groups.map((g, gi) => {
        const w = chunkW(g);
        const gx = x;
        const txt = digits.slice(k, k + g);
        k += g;
        x += w + CHUNK_GAP;
        return (
          <g key={gi}>
            <rect className="svg-box-good" x={gx} y={y} width={w} height={CHUNK_H} rx="6" />
            <text x={gx + w / 2 + 1} y={y + 26} textAnchor="middle" fontSize="14" letterSpacing="2">{txt}</text>
          </g>
        );
      })}
    </g>
  );
}

export default function Chunking() {
  return (
    <svg viewBox="0 0 360 294" role="img" aria-label="가정한 16자리 숫자를 낱개 16개로 보면 기억할 단위가 16개이고, 4개씩 묶으면 4덩어리다. 가정한 11자리 번호는 3덩어리로 묶인다.">
      <text className="t-bad" x="8" y="20">묶지 않은 16자리: 낱개 16개</text>
      <Singles y={48} digits="1234567890123456" x0={15} />
      <text className="t-good" x="8" y="114">4자리씩 묶은 16자리: 4덩어리</text>
      <Chunks y={142} digits="1234567890123456" groups={[4, 4, 4, 4]} x0={18} />
      <text className="t-good" x="8" y="218">3·4·4로 묶은 11자리: 3덩어리</text>
      <Chunks y={246} digits="01012345678" groups={[3, 4, 4]} x0={18} />
    </svg>
  );
}
