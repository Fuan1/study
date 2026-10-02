const R = 42;
const D = Math.sqrt(3) * R; // 이웃 육각형 중심 간 거리(= 육각형 폭)
const CX = 180;
const CY = 146;

const hex = (cx: number, cy: number) =>
  [30, 90, 150, 210, 270, 330].map((deg) => `${(cx + R * Math.cos((deg * Math.PI) / 180)).toFixed(1)},${(cy + R * Math.sin((deg * Math.PI) / 180)).toFixed(1)}`).join(' ');

const CELLS = [
  { ko: '유용', en: 'Useful', dx: -D / 2, dy: -D * 0.866 },
  { ko: '사용 가능', en: 'Usable', dx: D / 2, dy: -D * 0.866 },
  { ko: '바람직', en: 'Desirable', dx: D, dy: 0 },
  { ko: '신뢰', en: 'Credible', dx: D / 2, dy: D * 0.866 },
  { ko: '접근 가능', en: 'Accessible', dx: -D / 2, dy: D * 0.866 },
  { ko: '찾기 쉬움', en: 'Findable', dx: -D, dy: 0 },
];

export default function Honeycomb() {
  return (
    <svg viewBox="0 0 360 290" role="img" aria-label="UX 허니콤. 가운데 가치 있음을 유용, 사용 가능, 바람직, 신뢰, 접근 가능, 찾기 쉬움 여섯 요소가 둘러싼 도식">
      <polygon className="svg-berg" points={hex(CX, CY)} />
      <g textAnchor="middle">
        <text className="t-strong" x={CX} y={CY - 2}>가치 있음</text>
        <text className="t-sub" x={CX} y={CY + 16} fontSize="11">Valuable</text>
        {CELLS.map((c) => {
          const x = CX + c.dx;
          const y = CY + c.dy;
          return (
            <g key={c.en}>
              <polygon className="svg-box" points={hex(x, y)} />
              <text className="t-strong" x={x} y={y - 2} fontSize="13">{c.ko}</text>
              <text className="t-sub" x={x} y={y + 15} fontSize="10.5">{c.en}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
