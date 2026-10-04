/**
 * 한 문장 안에서 대문자가 되는 단어와 되지 않는 단어. 형태 예시이고 문장은 이 글이 만들었다.
 * 문장: On Friday, I met Jisoo in Busan in summer.
 */
type Row = { word: string; why: string; cap: boolean };

const ROWS: Row[] = [
  { word: 'On', why: '문장의 첫 글자', cap: true },
  { word: 'Friday', why: '요일과 월 이름', cap: true },
  { word: 'I', why: '문장 어디서나 대문자', cap: true },
  { word: 'Jisoo', why: '사람 이름', cap: true },
  { word: 'Busan', why: '도시·나라 이름', cap: true },
  { word: 'summer', why: '계절은 소문자', cap: false },
];

const H = 40;
const GAP = 10;
const TOP = 8;
const VB_H = TOP + ROWS.length * H + (ROWS.length - 1) * GAP + 16;

export default function CapitalRows() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="On Friday, I met Jisoo in Busan in summer. 문장에서 On, Friday, I, Jisoo, Busan 은 대문자이고 summer 는 소문자다.">
      {ROWS.map((r, i) => {
        const y = TOP + i * (H + GAP);
        return (
          <g key={r.word}>
            <rect className={r.cap ? 'svg-berg' : 'svg-box'} x="8" y={y} width="120" height={H} rx="6" />
            <text className="t-strong" x="22" y={y + 25}>{r.word}</text>
            <text className="t-sub" x="148" y={y + 25}>{r.why}</text>
          </g>
        );
      })}
    </svg>
  );
}
