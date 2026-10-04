/**
 * 시간 전치사는 바깥 상자일수록 긴 기간이다. 예시 표현은 British Council 문법 페이지의 용법에서 골랐다.
 * 좌표는 상자 안 글자가 가장자리에서 14px 이상, 안쪽 상자는 바깥 상자에서 12px 이상 들어오게 계산한다.
 */
type Layer = { x: number; w: number; cls: string; title: string; lines: string[] };

const LAYERS: Layer[] = [
  { x: 8, w: 344, cls: 'svg-box', title: 'in · 달, 계절, 연도, 하루의 큰 구간', lines: ['in May · in summer · in 2015', 'in the morning · in the evening'] },
  { x: 20, w: 320, cls: 'svg-box', title: 'on · 요일, 날짜, 생일', lines: ['on Friday · on 19 October', 'on Tuesday afternoon'] },
  { x: 32, w: 296, cls: 'svg-berg', title: 'at · 시각, 식사 때', lines: ['at 6.30 · at lunchtime', 'at night · at the weekend (예외)'] },
];

const TITLE = 28; // 상자 위에서 제목 baseline 까지
const LINE = 22; // 제목에서 첫 예시, 이후 예시 사이 간격은 20
const NEXT = 16; // 마지막 줄 baseline 에서 안쪽 상자 윗변까지
const PAD_END = 16; // 마지막 줄 baseline 에서 가장 안쪽 상자 아랫변까지
const RING = 12; // 안쪽 상자와 바깥 상자의 아래 간격

export default function TimeLayers() {
  const tops: number[] = [];
  let y = 8;
  LAYERS.forEach((l, i) => {
    tops.push(y);
    y += TITLE + LINE + 20 * (l.lines.length - 1) + (i < LAYERS.length - 1 ? NEXT : PAD_END);
  });
  const innerBottom = y;
  const bottoms = LAYERS.map((_, i) => innerBottom + (LAYERS.length - 1 - i) * RING);
  const VB_H = bottoms[0] + 14;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시간 전치사의 크기. 가장 바깥이 in으로 달, 계절, 연도, 하루의 큰 구간. 그 안이 on으로 요일과 날짜. 가장 안쪽이 at으로 시각과 식사 때이고, at night와 at the weekend는 예외.">
      {LAYERS.map((l, i) => (
        <g key={l.title}>
          <rect className={l.cls} x={l.x} y={tops[i]} width={l.w} height={bottoms[i] - tops[i]} rx="10" />
          <text className="t-strong" x={l.x + 14} y={tops[i] + TITLE}>{l.title}</text>
          {l.lines.map((t, j) => (
            <text key={t} className="t-sub" x={l.x + 14} y={tops[i] + TITLE + LINE + 20 * j}>{t}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}
