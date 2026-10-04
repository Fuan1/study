type Row = [rule: string, ex: string];

const THIRD: Row[] = [
  ['대부분', 'work → works'],
  ['ch, sh 끝', 'watch → watches'],
  ['자음 + y', 'study → studies'],
  ['불규칙', 'have → has, go → goes'],
];
const PAST: Row[] = [
  ['대부분', 'work → worked'],
  ['e 끝', 'like → liked'],
  ['모음 + 자음 끝', 'stop → stopped'],
  ['자음 + y', 'try → tried'],
  ['모음 + y', 'play → played'],
  ['불규칙', 'go → went, eat → ate'],
];

const BH = 36;
const PITCH = 44;

function Group({ title, rows, y0 }: { title: string; rows: Row[]; y0: number }) {
  return (
    <g>
      <text className="t-strong" x="8" y={y0 + 14}>{title}</text>
      {rows.map(([rule, ex], i) => {
        const y = y0 + 26 + i * PITCH;
        return (
          <g key={ex}>
            <rect className="svg-box" x="8" y={y} width="344" height={BH} rx="6" />
            <text className="t-sub" x="20" y={y + 23}>{rule}</text>
            <text className="t-strong" x="138" y={y + 23}>{ex}</text>
          </g>
        );
      })}
    </g>
  );
}

export default function Spelling() {
  const yPast = 8 + 26 + (THIRD.length - 1) * PITCH + BH + 24;
  const VB_H = yPast + 26 + (PAST.length - 1) * PITCH + BH + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="동사 끝 모양별 변화. he, she, it 현재형은 대부분 s, ch나 sh로 끝나면 es, 자음 뒤 y는 ies 이고 have는 has, go는 goes 이다. 과거형은 대부분 ed, e로 끝나면 d, 모음과 자음으로 끝나면 자음을 겹치고, 자음 뒤 y는 ied, 모음 뒤 y는 그대로 ed 이고 불규칙은 따로 외운다.">
      <Group title="he, she, it 현재형" rows={THIRD} y0={8} />
      <Group title="과거형" rows={PAST} y0={yPast} />
    </svg>
  );
}
