/** 폼 필드별 도달 수(가정). 각 필드에 도달한 사람 수에서 다음 필드에 도달한 사람 수를 빼 이탈률을 코드로 계산한다. */
const FIELDS = [
  { name: '이름', reach: 1000 },
  { name: '이메일', reach: 970 },
  { name: '전화번호', reach: 920 },
  { name: '회사명', reach: 660 },
  { name: '제출', reach: 600 },
];

// 이탈률 = (이 필드 도달 - 다음 필드 도달) / 이 필드 도달
const exits = FIELDS.map((f, i) => (i < FIELDS.length - 1 ? ((f.reach - FIELDS[i + 1].reach) / f.reach) * 100 : null));
const maxExit = Math.max(...exits.filter((v): v is number => v !== null));

// 여백 기준: 막대 높이 24(36 미만이라 글자는 막대 밖), 행 간격 44, 머리글과 첫 행 사이 16.
const X0 = 76; // 막대 시작
const SCALE = 150 / 1000; // 1,000명이 150px
const BAR_H = 24;
const PITCH = 44;
const HEAD_Y = 14;
const TOP = HEAD_Y + 16;
const STROKE = 1.5;
const rowY = (i: number) => TOP + i * PITCH;
const VB_H = Math.ceil(rowY(FIELDS.length - 1) + BAR_H + STROKE / 2 + 8);
const fmt = (n: number) => n.toLocaleString('en-US');

export default function FieldDropoff() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`폼 필드별 도달 수와 이탈률. ${FIELDS.map((f, i) => `${f.name} ${f.reach}명${exits[i] !== null ? `, 이탈 ${(exits[i] as number).toFixed(1)}퍼센트` : ''}`).join('. ')}.`}>
      <text className="t-sub" x="8" y={HEAD_Y}>필드</text>
      <text className="t-sub" x={X0} y={HEAD_Y}>도달 수</text>
      <text className="t-sub" x="352" y={HEAD_Y} textAnchor="end">이 필드에서 이탈</text>
      {FIELDS.map((f, i) => {
        const y = rowY(i);
        const w = f.reach * SCALE;
        const e = exits[i];
        const worst = e !== null && e === maxExit;
        return (
          <g key={f.name}>
            <text className="t-strong" x="8" y={y + 17}>{f.name}</text>
            <rect className={worst ? 'svg-tip' : 'svg-berg'} x={X0} y={y} width={w} height={BAR_H} rx="4" />
            <text className="t-sub" x={X0 + w + 8} y={y + 17}>{fmt(f.reach)}</text>
            {e !== null && (
              <text className={worst ? 't-warm' : 't-sub'} x="352" y={y + 17} textAnchor="end">{e.toFixed(1)}%</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
