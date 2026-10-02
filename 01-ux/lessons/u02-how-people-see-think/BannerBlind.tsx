/** 수치는 각 연구에서 보고된 값이다. 막대 길이는 값에서 계산한다. */
type Bar = { label: string; value: number; tone: 'key' | 'bad'; text: string };

const W = 344;
const X0 = 8;

function Row({ bar, y }: { bar: Bar; y: number }) {
  const w = Math.max((bar.value / 100) * W, 2);
  const fill = bar.tone === 'key' ? 'var(--accent-soft)' : 'var(--bad)';
  const stroke = bar.tone === 'key' ? 'var(--accent)' : 'var(--bad)';
  const inside = w > 250;
  return (
    <g>
      <text className="t-sub" x={X0} y={y}>{bar.label}</text>
      <rect x={X0} y={y + 6} width={W} height="22" rx="4" className="svg-box" />
      <rect x={X0} y={y + 6} width={w} height="22" rx="4" style={{ fill, stroke, strokeWidth: 1.2 }} />
      <text className={bar.tone === 'bad' ? 't-bad' : 't-strong'} x={inside ? X0 + w - 8 : X0 + w + 8} y={y + 22} textAnchor={inside ? 'end' : 'start'}>{bar.text}</text>
    </g>
  );
}

export default function BannerBlind() {
  return (
    <svg viewBox="0 0 360 286" role="img" aria-label="눈에 띄는 요소가 반드시 보이는 것은 아니다. 1998년 실험에서 빨간 배너는 58퍼센트만 발견됐고 일반 링크는 94퍼센트였다. 2018년 시선 추적의 한 페이지에서 화면 면적의 25퍼센트인 오른쪽 영역은 시선의 0.8퍼센트만 받았다.">
      <text className="t-strong" x={X0} y="18">Benway와 Lane (1998) · 목표 항목을 찾은 비율</text>
      <Row bar={{ label: '일반 링크(통제 항목)', value: 94, tone: 'key', text: '94%' }} y={44} />
      <Row bar={{ label: '크고 빨간 배너', value: 58, tone: 'bad', text: '58%' }} y={92} />
      <text className="t-strong" x={X0} y="162">NN/g (2018) · 한 페이지의 오른쪽 영역</text>
      <Row bar={{ label: '화면 면적에서 차지하는 비율', value: 25, tone: 'key', text: '25%' }} y={188} />
      <Row bar={{ label: '그 영역이 받은 시선 비율', value: 0.8, tone: 'bad', text: '0.8%' }} y={236} />
    </svg>
  );
}
