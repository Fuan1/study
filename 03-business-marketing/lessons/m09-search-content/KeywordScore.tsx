/** 키워드 점수표(본문 python 과 같은 식)를 계산해서 막대로 그린다. 입력값은 모두 가상이다. */
type Kw = { name: string; intent: number; conv: number; comp: number; vol: number };

const KWS: Kw[] = [
  { name: 'A200 의자 후기', intent: 2, conv: 5, comp: 2, vol: 500 },
  { name: '사무용 의자 추천', intent: 2, conv: 4, comp: 4, vol: 22000 },
  { name: '의자 허리 아플 때', intent: 2, conv: 2, comp: 2, vol: 6000 },
  { name: '사무용 의자', intent: 1, conv: 3, comp: 5, vol: 90000 },
  { name: '의자 만드는 법', intent: 0, conv: 1, comp: 1, vol: 8000 },
];

const level = (v: number) => Math.min(5, Math.max(1, 1 + Math.floor(Math.log10(v))));
const score = (k: Kw) => ((k.intent / 2) * (0.4 * k.conv + 0.3 * (6 - k.comp) + 0.3 * level(k.vol))) / 5 * 100;

const X0 = 8;
const MAXW = 270; // 100점 = 270px
const BAR_H = 22;
const PITCH = 70; // 라벨(18) + 막대(22) + 묶음 사이 24 이상
const TOP = 8;
const STROKE = 1.5;
const fmt = (n: number) => n.toLocaleString('en-US');
const barY = (i: number) => TOP + i * PITCH + 24;
const VB_H = Math.ceil(barY(KWS.length - 1) + BAR_H + STROKE / 2 + 8);

export default function KeywordScore() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="가상 키워드 5개의 점수. A200 의자 후기 82점, 사무용 의자 추천 74점, 의자 허리 아플 때 64점, 사무용 의자 30점, 의자 만드는 법은 의도가 맞지 않아 0점이다. 검색량이 가장 큰 키워드가 가장 높지 않다.">
      {KWS.map((k, i) => {
        const s = score(k);
        const w = (s / 100) * MAXW;
        return (
          <g key={k.name}>
            <text className="t-strong" x={X0} y={TOP + i * PITCH + 14}>{k.name}</text>
            <text className="t-sub" x={352} y={TOP + i * PITCH + 14} textAnchor="end">{`검색량 ${fmt(k.vol)}`}</text>
            {w > 0 && <rect className="svg-berg" x={X0} y={barY(i)} width={w} height={BAR_H} rx="4" />}
            {w === 0 && <rect className="svg-box" x={X0} y={barY(i)} width={4} height={BAR_H} rx="2" />}
            <text className={s === 0 ? 't-bad' : 't-strong'} x={X0 + Math.max(w, 4) + 8} y={barY(i) + 16}>{s === 0 ? '0점 · 의도 불일치' : `${s.toFixed(0)}점`}</text>
          </g>
        );
      })}
    </svg>
  );
}
