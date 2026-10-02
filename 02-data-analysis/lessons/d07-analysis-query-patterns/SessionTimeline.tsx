/** 가정한 한 사용자의 하루 이벤트(예제 쿼리 결과)를 앞 이벤트와의 간격이 30분을 넘는 곳에서 끊어 세션으로 묶는다. 간격과 세션 번호는 코드로 계산한다. */
// 여백 기준: 행 간격 28px(위아래 글자 사이 12px 이상), 상자 안 위아래 12px 이상, 상자 사이 34px(간격 글자는 상자에서 8px 이상), 두 줄 상자 높이 66 이상.
const EVENTS: [string, string][] = [
  ['08:50:00', 'signup'],
  ['08:51:10', 'open'],
  ['08:58:30', 'view'],
  ['09:14:00', 'view'],
  ['09:44:00', 'cart'],
  ['10:15:30', 'view'],
  ['10:20:00', 'purchase'],
  ['14:02:00', 'open'],
  ['14:09:40', 'view'],
];
const LIMIT = 30 * 60;
const ROW = 28; // 행 baseline 간격(글자 높이 14 + 위아래 12 이상)
const FIRST = 28; // 상자 윗변에서 첫 baseline 까지
const PAD_B = 16; // 마지막 baseline 에서 상자 아랫변까지
const GAP = 34;
const TOP = 34;

const sec = (t: string) => {
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + s;
};
const fmt = (d: number) => {
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = d % 60;
  return `${h ? `${h}시간 ` : ''}${m}분${s ? ` ${String(s).padStart(2, '0')}초` : ''}`;
};

type Item = { t: string; e: string; gap: number | null };
const sessions: Item[][] = [];
EVENTS.forEach(([t, e], i) => {
  const gap = i === 0 ? null : sec(t) - sec(EVENTS[i - 1][0]);
  if (gap === null || gap > LIMIT) sessions.push([]);
  sessions[sessions.length - 1].push({ t, e, gap });
});

export default function SessionTimeline() {
  let y = TOP;
  const boxes = sessions.map((s, k) => {
    const h = FIRST + ROW * (s.length - 1) + PAD_B;
    const top = y;
    y += h + GAP;
    return { s, k, top, h };
  });
  const bottom = boxes[boxes.length - 1].top + boxes[boxes.length - 1].h;
  const H = bottom + 1 + 12;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="한 사용자의 하루 이벤트 9건을 앞 이벤트와의 간격이 30분을 넘는 곳에서 끊어 세션 3개로 묶었다. 정확히 30분 간격은 같은 세션이다.">
      <text className="t-accent" x="8" y="18">세션 1 시작</text>
      {boxes.map(({ s, k, top, h }) => (
        <g key={k}>
          {k > 0 && (
            <text className="t-accent" x="180" y={top - GAP / 2 + 4} textAnchor="middle">
              간격 {fmt(s[0].gap as number)}, 세션 {k + 1} 시작
            </text>
          )}
          <rect className="svg-box" x="8" y={top} width="344" height={h} rx="8" />
          {s.map((it, i) => {
            const by = top + FIRST + i * ROW;
            const same = it.gap === LIMIT;
            return (
              <g key={it.t}>
                <text className="t-sub" x="24" y={by}>{it.t}</text>
                <text className="t-strong" x="104" y={by}>{it.e}</text>
                {i > 0 && (
                  <text className={same ? 't-good' : 't-sub'} x="336" y={by} textAnchor="end">
                    +{fmt(it.gap as number)}{same ? ' 같은 세션' : ''}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
