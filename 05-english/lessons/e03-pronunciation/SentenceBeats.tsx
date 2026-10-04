/**
 * 형태 예시(가상 값). 높이는 힘을 준 정도의 모양일 뿐 측정값이 아니다.
 * 내용어(want, buy, new, phone)는 높고 기능어(I, to, a)는 낮다. 가장 센 단어 하나가 핵심 단어다.
 */
type W = { t: string; strong: boolean };

const SENT: W[] = [
  { t: 'I', strong: false },
  { t: 'want', strong: true },
  { t: 'to', strong: false },
  { t: 'buy', strong: true },
  { t: 'a', strong: false },
  { t: 'new', strong: true },
  { t: 'phone', strong: true },
];

const ROWS = [
  { head: '기본: 마지막 내용어가 핵심', key: 6 },
  { head: 'buy 를 강조: 핵심이 앞으로 이동', key: 3 },
];

const SW = 56;
const WW = 28;
const GAP = 6;
const SH = 40;
const WH = 16;
const ROW_H = 112;

const widths = SENT.map((w) => (w.strong ? SW : WW));
const total = widths.reduce((a, b) => a + b, 0) + GAP * (SENT.length - 1);
const X0 = Math.round((360 - total) / 2);

export default function SentenceBeats() {
  const VB_H = ROW_H * ROWS.length + 4;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="문장 리듬의 모양. 내용어는 크게 기능어는 작게 말하고, 가장 센 핵심 단어는 기본 문장에서는 마지막 내용어 phone, 강조하면 buy 로 옮겨 간다.">
      {ROWS.map((r, ri) => {
        const y0 = 4 + ri * ROW_H;
        const base = y0 + 70;
        let x = X0;
        return (
          <g key={r.head}>
            <text className="t-sub" x="8" y={y0 + 14}>{r.head}</text>
            {SENT.map((w, i) => {
              const bw = widths[i];
              const h = w.strong ? SH : WH;
              const el = (
                <g key={i}>
                  <rect className={i === r.key ? 'svg-berg' : 'svg-box'} x={x} y={base - h} width={bw} height={h} rx="4" />
                  <text className={w.strong ? 't-strong' : 't-sub'} x={x + bw / 2} y={base + 22} textAnchor="middle">{w.t}</text>
                </g>
              );
              x += bw + GAP;
              return el;
            })}
          </g>
        );
      })}
    </svg>
  );
}
