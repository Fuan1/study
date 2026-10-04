/**
 * Extensive Reading Foundation 안내서(2011)의 구간 구분. 90% 미만, 90~98%, 98% 이상.
 * 축은 80%에서 100%까지이고 위치는 코드로 계산한다.
 */
const X0 = 24;
const X1 = 336;
const pos = (p: number) => X0 + ((p - 80) / 20) * (X1 - X0);

const ZONES = [
  { from: 80, to: 90, cls: 'svg-tip', title: '90% 미만: 쉬운 글로 바꾼다', sub: '느리고 사전을 계속 펴게 된다' },
  { from: 90, to: 98, cls: 'svg-box', title: '90%에서 98%: 공부용으로 읽는다', sub: '이해는 되지만 사전이 필요하다' },
  { from: 98, to: 100, cls: 'svg-berg', title: '98% 이상: 속도를 올려 읽는다', sub: '방해가 적어 즐겁게 읽힌다' },
];
const TICKS = [80, 90, 98, 100];

const BAR_Y = 28;
const BAR_H = 16;
const CARD_TOP = 84;
const CARD_H = 66;
const CARD_GAP = 10;

export default function CoverageZones() {
  const cy = (i: number) => CARD_TOP + i * (CARD_H + CARD_GAP);
  const VB_H = cy(ZONES.length - 1) + CARD_H + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="글에서 아는 단어 비율에 따른 읽기 방식. 90퍼센트 미만은 쉬운 글로 바꾸고, 90에서 98퍼센트는 사전을 쓰며 공부용으로 읽고, 98퍼센트 이상은 속도를 올려 읽는다.">
      <text className="t-sub" x="8" y="16">글에서 아는 단어 비율(%)</text>
      {ZONES.map((z) => (
        <rect key={z.from} className={z.cls} x={pos(z.from)} y={BAR_Y} width={pos(z.to) - pos(z.from)} height={BAR_H} />
      ))}
      {TICKS.map((t) => (
        <text key={t} className="t-sub" x={pos(t)} y={BAR_Y + BAR_H + 22} textAnchor="middle">{t}</text>
      ))}
      {ZONES.map((z, i) => (
        <g key={z.title}>
          <rect className="svg-box" x="8" y={cy(i)} width="344" height={CARD_H} rx="8" />
          <rect className={z.cls} x="22" y={cy(i) + 15} width="12" height="12" rx="3" />
          <text className="t-strong" x="44" y={cy(i) + 26}>{z.title}</text>
          <text className="t-sub" x="44" y={cy(i) + 48}>{z.sub}</text>
        </g>
      ))}
    </svg>
  );
}
