type Step = { kw: string; desc: string; key?: boolean };

const STEPS: Step[] = [
  { kw: 'FROM', desc: '테이블 · JOIN 결과' },
  { kw: 'WHERE', desc: '행 거르기 · 별칭 아직 없음' },
  { kw: 'GROUP BY', desc: '그룹 만들기' },
  { kw: 'HAVING', desc: '그룹 거르기 · 집계 가능' },
  { kw: 'SELECT', desc: '열 계산 · 별칭 생성', key: true },
  { kw: 'ORDER BY', desc: '정렬 · 별칭 사용 가능' },
  { kw: 'LIMIT', desc: '앞에서 N행만' },
];

// 여백 기준: 상자 높이 40 에 한 줄(위아래 15 이상), 글자는 왼쪽에서 12 이상, 상자 사이 24 에 화살표.
const BOX_H = 40;
const GAP = 24;
const TOP = 8;
const y = (i: number) => TOP + i * (BOX_H + GAP);

export default function ExecOrder() {
  const lastBottom = y(STEPS.length - 1) + BOX_H;
  const h = Math.ceil(lastBottom + 0.75 + 8); // 아랫변 + 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${h}`} role="img" aria-label="쿼리의 논리적 실행 순서. FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT 순이다. SELECT 에서 별칭이 생기므로 WHERE 는 별칭을 볼 수 없고 ORDER BY 는 볼 수 있다.">
      <defs>
        <marker id="d04-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.kw}>
          <rect className={s.key ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width="344" height={BOX_H} rx="8" />
          <text className="t-strong" x="20" y={y(i) + 25}>{i + 1}  {s.kw}</text>
          <text className={s.key ? 't-accent' : 't-sub'} x="138" y={y(i) + 25}>{s.desc}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + BOX_H + 4} x2="180" y2={y(i) + BOX_H + GAP - 4} markerEnd="url(#d04-ar)" />
          )}
        </g>
      ))}
    </svg>
  );
}
