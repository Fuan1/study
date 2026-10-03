// 가상 예시: Now-Next-Later 로드맵 한 장. 아래 칸일수록 확신이 낮고 적는 깊이가 얕다.
type Card = { title: string; sub?: string };
type Lane = { name: string; hint: string; conf: string; cards: Card[]; kind: 'now' | 'next' | 'later' };

const LANES: Lane[] = [
  { name: 'Now', hint: '지금 하는 일', conf: '확신 높음', kind: 'now', cards: [{ title: '가입 첫 주 정착 늘리기', sub: '지표: 첫 주 재방문 비율' }] },
  {
    name: 'Next', hint: '다음에 할 일', conf: '확신 중간', kind: 'next',
    cards: [
      { title: '검색 포기 줄이기', sub: '문제: 결과를 못 찾고 나간다' },
      { title: '갱신 전 해지 줄이기', sub: '문제: 갱신 직전에 해지한다' },
    ],
  },
  {
    name: 'Later', hint: '나중에 볼 문제', conf: '확신 낮음', kind: 'later',
    cards: [{ title: '문제: 팀 단위 사용 요청이 늘어난다' }, { title: '문제: 해외 결제 실패가 보고된다' }],
  },
];

const LANE_GAP = 24;
const CARD_GAP = 12;
const HEAD = 40; // 레인 위에서 첫 카드까지
const PAD = 14; // 마지막 카드 아래 여백
const h2 = 66; // 두 줄 카드
const h1 = 44; // 한 줄 카드

let y = 8;
const lanes = LANES.map((l) => {
  const top = y;
  let cy = top + HEAD;
  const cards = l.cards.map((c) => {
    const h = c.sub ? h2 : h1;
    const o = { ...c, y: cy, h };
    cy += h + CARD_GAP;
    return o;
  });
  const bottom = cy - CARD_GAP + PAD;
  y = bottom + LANE_GAP;
  return { ...l, top, bottom, cards };
});
const VB_H = lanes[lanes.length - 1].bottom + 1 + 8;

const cardClass = (k: Lane['kind']) => (k === 'now' ? 'svg-berg' : k === 'next' ? 'svg-box-key' : 'svg-box');

export default function RoadmapBoard() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="Now-Next-Later 로드맵 한 장. Now 에는 목표와 지표를, Next 에는 목표 초안과 문제를, Later 에는 문제만 적는다. 아래로 갈수록 확신이 낮아진다.">
      {lanes.map((l) => (
        <g key={l.name}>
          <rect className="svg-box" x="8" y={l.top} width="344" height={l.bottom - l.top} rx="8" />
          <text className="t-strong" x="22" y={l.top + 26}>{l.name}</text>
          <text className="t-sub" x="74" y={l.top + 26}>{l.hint}</text>
          <text className="t-sub" x="338" y={l.top + 26} textAnchor="end">{l.conf}</text>
          {l.cards.map((c) => (
            <g key={c.title}>
              <rect
                className={cardClass(l.kind)}
                x="20" y={c.y} width="320" height={c.h} rx="8"
                strokeDasharray={l.kind === 'later' ? '5 3' : undefined}
              />
              {c.sub ? (
                <>
                  <text className="t-strong" x="34" y={c.y + 28}>{c.title}</text>
                  <text className="t-sub" x="34" y={c.y + 50}>{c.sub}</text>
                </>
              ) : (
                <text className="t-sub" x="34" y={c.y + 27}>{c.title}</text>
              )}
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
