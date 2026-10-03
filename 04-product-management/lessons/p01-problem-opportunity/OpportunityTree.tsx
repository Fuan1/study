/**
 * 형태 예시(가상 값): 목표 아래 기회, 하위 기회, 해결책으로 나눈 기회 구조도.
 * 구조(목표, 기회, 해결책, 가정 시험)는 Torres 의 설명을 따르고, 내용은 설명용으로 정한 것이다.
 */
type Node = { id: string; text: string; level: 0 | 1 | 2 | 3; cls: string; tag?: string };
const NODES: Node[] = [
  { id: 'O', text: '목표: 첫 달 이후에도 쓰는 점주 늘리기', level: 0, cls: 'svg-berg' },
  { id: 'A', text: 'A 숫자를 옮겨 적기 힘들다', level: 1, cls: 'svg-box' },
  { id: 'A1', text: 'A1 기간별로 한눈에 못 본다', level: 2, cls: 'svg-box-key', tag: '고른 기회' },
  { id: 'S1', text: 'S1 파일 내보내기 (요청)', level: 3, cls: 'svg-box' },
  { id: 'S2', text: 'S2 기간별 요약 화면', level: 3, cls: 'svg-box' },
  { id: 'S3', text: 'S3 요약 자동 발송', level: 3, cls: 'svg-box' },
  { id: 'A2', text: 'A2 세무사 전달 형식이 제각각', level: 2, cls: 'svg-box' },
  { id: 'B', text: 'B 신규 직원이 입력법을 모른다', level: 1, cls: 'svg-box' },
  { id: 'C', text: 'C 품절 알림을 못 받는다', level: 1, cls: 'svg-box' },
];

const H = 40;
const GAP = 14;
const TOP = 8;
const INDENT = 24;
const X = (level: number) => 8 + level * INDENT;
const layout = NODES.map((n, i) => ({ ...n, x: X(n.level), y: TOP + i * (H + GAP) }));
const byId = Object.fromEntries(layout.map((n) => [n.id, n]));
const parentOf: Record<string, string> = { A: 'O', B: 'O', C: 'O', A1: 'A', A2: 'A', S1: 'A1', S2: 'A1', S3: 'A1' };
const VB_H = layout[layout.length - 1].y + H + 1 + 8;

export default function OpportunityTree() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="기회 구조도. 목표 아래에 기회 A, B, C가 있고, A 아래에 하위 기회 A1, A2가 있다. 고른 기회 A1에는 파일 내보내기, 기간별 요약 화면, 요약 자동 발송 세 해결책이 있고 요청받은 파일 내보내기는 그중 하나다.">
      {layout.map((n) => {
        const p = parentOf[n.id] ? byId[parentOf[n.id]] : undefined;
        if (!p) return null;
        const trunkX = p.x + 10; // 부모 왼쪽 가장자리 안쪽의 줄기
        const cy = n.y + H / 2;
        return (
          <g key={`l-${n.id}`}>
            <line className="svg-flow" x1={trunkX} y1={p.y + H} x2={trunkX} y2={cy} />
            <line className="svg-flow" x1={trunkX} y1={cy} x2={n.x - 1} y2={cy} />
          </g>
        );
      })}
      {layout.map((n) => (
        <g key={n.id}>
          <rect className={n.cls} x={n.x} y={n.y} width={352 - n.x} height={H} rx="8" />
          <text className="t-strong" x={n.x + 14} y={n.y + H / 2 + 5}>{n.text}</text>
          {n.tag && <text className="t-accent" x="338" y={n.y + H / 2 + 5} textAnchor="end">{n.tag}</text>}
        </g>
      ))}
    </svg>
  );
}
