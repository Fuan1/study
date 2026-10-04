/**
 * 장소 전치사: 안(in), 면 위(on), 지점·활동 장소(at). 예시 표현은 British Council 문법 페이지의 용법에서 골랐다.
 * 세 줄 모두 높이 80, 줄 사이 12. 아이콘은 상자 안 왼쪽 20px 이상 띄운다.
 */
const ROW_H = 80;
const GAP = 12;

type Row = { title: string; line: string; kind: 'in' | 'on' | 'at' };
const ROWS: Row[] = [
  { kind: 'in', title: 'in · 공간 안', line: 'in the park · in a car' },
  { kind: 'on', title: 'on · 면 위, 대중교통', line: 'on the desk · on the bus' },
  { kind: 'at', title: 'at · 지점, 활동 장소', line: 'at school · at the entrance' },
];

function Icon({ kind, y }: { kind: Row['kind']; y: number }) {
  if (kind === 'in') {
    return (
      <g>
        <rect className="svg-box-key" x="24" y={y + 18} width="60" height="44" rx="6" />
        <circle className="svg-berg" cx="54" cy={y + 40} r="7" />
      </g>
    );
  }
  if (kind === 'on') {
    return (
      <g>
        <rect className="svg-berg" x="40" y={y + 28} width="28" height="26" rx="4" />
        <line className="svg-flow" x1="24" y1={y + 56} x2="84" y2={y + 56} />
      </g>
    );
  }
  return (
    <g>
      <circle className="svg-box-key" cx="54" cy={y + 40} r="19" />
      <circle className="svg-berg" cx="54" cy={y + 40} r="6" />
    </g>
  );
}

export default function PlaceThree() {
  const VB_H = 8 + ROWS.length * ROW_H + (ROWS.length - 1) * GAP + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="장소 전치사 세 가지. in은 공간 안, on은 면 위와 대중교통, at은 지점과 활동 장소.">
      {ROWS.map((r, i) => {
        const y = 8 + i * (ROW_H + GAP);
        return (
          <g key={r.kind}>
            <rect className="svg-box" x="8" y={y} width="344" height={ROW_H} rx="8" />
            <Icon kind={r.kind} y={y} />
            <text className="t-strong" x="112" y={y + 32}>{r.title}</text>
            <text className="t-sub" x="112" y={y + 54}>{r.line}</text>
          </g>
        );
      })}
    </svg>
  );
}
