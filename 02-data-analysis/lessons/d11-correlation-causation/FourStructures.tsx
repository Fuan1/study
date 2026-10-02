/** 같은 상관을 만드는 네 가지 구조. 실선 화살표는 원인에서 결과로, 점선은 데이터에 보이는 겉보기 연관이다. */
type P = { x: number; y: number };

const R = 15; // 노드 반지름
const CW = 168;
const CH = 172;
const PITCH = CH + 8;

// 화살표 시작·끝을 노드 가장자리에서 4px 띄운다.
function edge(a: P, b: P, ra: number, rb: number) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const d = Math.hypot(dx, dy);
  const ux = dx / d;
  const uy = dy / d;
  return { x1: a.x + ux * (ra + 4), y1: a.y + uy * (ra + 4), x2: b.x - ux * (rb + 4), y2: b.y - uy * (rb + 4) };
}

type Cell = { title: string; l1: string; l2: string };
const CELLS: Cell[] = [
  { title: '① 진짜 원인', l1: 'A 가 B 를 바꾼다', l2: '(찾으려는 답)' },
  { title: '② 방향이 반대', l1: 'B 가 A 를 바꾼다', l2: '(역인과)' },
  { title: '③ 제3요인', l1: 'Z 가 둘을 함께', l2: '바꾼다(교란)' },
  { title: '④ 선택된 집단', l1: 'C 로 걸러 보면', l2: 'A 와 B 가 엮인다' },
];

function Node({ p, label, cls = 'svg-box' }: { p: P; label: string; cls?: string }) {
  return (
    <g>
      <circle className={cls} cx={p.x} cy={p.y} r={R} />
      <text className="t-strong" x={p.x} y={p.y + 5} textAnchor="middle">{label}</text>
    </g>
  );
}

function Arrow({ a, b, ra = R, rb = R }: { a: P; b: P; ra?: number; rb?: number }) {
  return <line className="svg-flow" {...edge(a, b, ra, rb)} markerEnd="url(#fs-ar)" />;
}

export default function FourStructures() {
  const height = 8 + 2 * PITCH - 8 + 8;
  return (
    <svg viewBox={`0 0 360 ${height}`} role="img" aria-label="A와 B가 같이 움직이는 네 가지 구조. A가 B의 원인인 경우, B가 A의 원인인 경우, 제3요인 Z가 둘의 공통 원인인 경우, A와 B의 공통 결과 C로 걸러서 본 경우.">
      <defs>
        <marker id="fs-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {CELLS.map((c, k) => {
        const ox = 8 + (k % 2) * (CW + 8);
        const oy = 8 + Math.floor(k / 2) * PITCH;
        const at = (x: number, y: number): P => ({ x: ox + x, y: oy + y });
        return (
          <g key={c.title}>
            <rect className="svg-box" x={ox} y={oy} width={CW} height={CH} rx="8" />
            <text className="t-strong" x={ox + 12} y={oy + 26}>{c.title}</text>
            {k === 0 && (
              <>
                <Node p={at(40, 78)} label="A" />
                <Node p={at(128, 78)} label="B" />
                <Arrow a={at(40, 78)} b={at(128, 78)} />
              </>
            )}
            {k === 1 && (
              <>
                <Node p={at(40, 78)} label="A" />
                <Node p={at(128, 78)} label="B" />
                <Arrow a={at(128, 78)} b={at(40, 78)} />
              </>
            )}
            {k === 2 && (
              <>
                <Node p={at(84, 58)} label="Z" cls="svg-box-key" />
                <Node p={at(40, 100)} label="A" />
                <Node p={at(128, 100)} label="B" />
                <Arrow a={at(84, 58)} b={at(40, 100)} />
                <Arrow a={at(84, 58)} b={at(128, 100)} />
                <line x1={ox + 40 + R + 6} y1={oy + 100} x2={ox + 128 - R - 6} y2={oy + 100} stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
              </>
            )}
            {k === 3 && (
              <>
                <Node p={at(40, 54)} label="A" />
                <Node p={at(128, 54)} label="B" />
                <line x1={ox + 40 + R + 6} y1={oy + 54} x2={ox + 128 - R - 6} y2={oy + 54} stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
                <rect className="svg-box-bad" x={ox + 84 - 20} y={oy + 96 - 19} width="40" height="38" rx="6" />
                <text className="t-strong" x={ox + 84} y={oy + 101} textAnchor="middle">C</text>
                <Arrow a={at(40, 54)} b={at(84, 96)} rb={27} />
                <Arrow a={at(128, 54)} b={at(84, 96)} rb={27} />
              </>
            )}
            <text className="t-sub" x={ox + 12} y={oy + 134}>{c.l1}</text>
            <text className="t-sub" x={ox + 12} y={oy + 154}>{c.l2}</text>
          </g>
        );
      })}
    </svg>
  );
}
