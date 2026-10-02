/** 광고성 정보를 보내기 전 확인 순서. 정통망법 제50조 제1항부터 제4항의 순서를 따른다. */
const STEPS: { title: string; sub: string }[] = [
  { title: '1. 보낼 근거가 있나', sub: '사전 동의 기록, 또는 거래 6개월 예외' },
  { title: '2. 거부한 사람을 뺐나', sub: '거부, 철회한 사람은 예외여도 제외' },
  { title: '3. 도달 시각이 야간인가', sub: '오후 9시부터 오전 8시는 별도 동의' },
  { title: '4. 표시를 갖췄나', sub: '(광고), 전송자, 무료 수신거부 방법' },
];
const X = 8;
const W = 344;
const BOX_H = 66;
const GAP = 24;
const TOP = 8;
const boxY = (i: number) => TOP + i * (BOX_H + GAP);
const BOTTOM = boxY(STEPS.length - 1) + BOX_H;
const STROKE = 2;
const VB_H = Math.ceil(BOTTOM + STROKE / 2 + 8);

export default function SendFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="광고성 정보 발송 전 확인 순서. 하나, 사전 동의 기록이나 거래 관계 6개월 예외가 있는지. 둘, 수신거부나 철회한 사람을 뺐는지. 셋, 수신자에게 도달하는 시각이 오후 9시부터 다음 날 오전 8시인지, 그렇다면 별도 동의가 있는지. 넷, 광고 표시와 전송자 정보와 무료 수신거부 방법이 있는지.">
      <defs>
        <marker id="ar-m13f" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={i === 3 ? 'svg-box-key' : 'svg-box'} x={X} y={boxY(i)} width={W} height={BOX_H} rx="8" />
          <text className="t-strong" x={X + 12} y={boxY(i) + 27}>{s.title}</text>
          <text className="t-sub" x={X + 12} y={boxY(i) + 49}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1={X + W / 2} y1={boxY(i) + BOX_H + 4} x2={X + W / 2} y2={boxY(i + 1) - 4} markerEnd="url(#ar-m13f)" />
          )}
        </g>
      ))}
    </svg>
  );
}
