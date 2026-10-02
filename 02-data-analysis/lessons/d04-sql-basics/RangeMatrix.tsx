import { ORDERS } from './data';

/** 5건의 주문이 세 가지 기간 조건에 걸리는지 시각 비교로 계산하고(날짜 리터럴은 0시로 읽힌다), 3월 소속(정답)과 맞는지 색으로 보인다. */
const SHOW = ORDERS.filter((o) => [1, 2, 3, 4, 5].includes(o.id));
const COLS = [
  { h1: 'BETWEEN', h2: '~ 03-31', test: (t: string) => t >= '2024-03-01' && t <= '2024-03-31 00:00:00' },
  { h1: 'BETWEEN', h2: '~ 04-01', test: (t: string) => t >= '2024-03-01' && t <= '2024-04-01 00:00:00' },
  { h1: '반열린', h2: '< 04-01', test: (t: string) => t >= '2024-03-01' && t < '2024-04-01' },
];
const CX = [182, 250, 318];

// 여백 기준: 행 높이 40, 행 사이 8, 헤더 두 줄 baseline 간격 20, 헤더와 첫 행 사이 24.
const ROW_H = 40;
const ROW_GAP = 8;
const HEAD_Y = 8 + 14; // 헤더 첫 줄 baseline
const ROWS_TOP = HEAD_Y + 20 + 24; // 두 번째 줄 baseline + 24
const y = (i: number) => ROWS_TOP + i * (ROW_H + ROW_GAP);

export default function RangeMatrix() {
  const lastBottom = y(SHOW.length - 1) + ROW_H;
  const h = Math.ceil(lastBottom + 0.75 + 8); // 아랫변 + 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${h}`} role="img" aria-label="3월 주문 4건과 4월 1일 0시 주문 1건이 세 조건에 포함되는지 보인다. 3월 31일까지의 BETWEEN 은 31일 주문 2건을 놓치고, 4월 1일까지의 BETWEEN 은 4월 1일 0시 주문을 포함한다. 반열린 구간만 모두 맞다.">
      <text className="t-sub" x="20" y={HEAD_Y}>주문 시각</text>
      <text className="t-sub" x="20" y={HEAD_Y + 20}>(실제 월)</text>
      {COLS.map((c, k) => (
        <g key={c.h2}>
          <text className="t-sub" x={CX[k]} y={HEAD_Y} textAnchor="middle">{c.h1}</text>
          <text className="t-sub" x={CX[k]} y={HEAD_Y + 20} textAnchor="middle">{c.h2}</text>
        </g>
      ))}
      {SHOW.map((o, i) => {
        const truth = o.at.startsWith('2024-03');
        return (
          <g key={o.id}>
            <rect className="svg-box" x="8" y={y(i)} width="344" height={ROW_H} rx="8" />
            <text className="t-strong" x="20" y={y(i) + 25}>{o.at.slice(5, 16)}</text>
            <text className="t-sub" x="122" y={y(i) + 25}>{truth ? '3월' : '4월'}</text>
            {COLS.map((c, k) => {
              const hit = c.test(o.at);
              const right = hit === truth;
              return (
                <text key={c.h2} className={right ? 't-good' : 't-bad'} x={CX[k]} y={y(i) + 25} textAnchor="middle">{hit ? '포함' : '제외'}</text>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
