const ROWS = [
  { name: '종이 스케치', w: 130, q: '이 아이디어가 문제를 푸는가' },
  { name: '와이어프레임', w: 190, q: '무엇을 어디에, 어떤 순서로 두는가' },
  { name: '클릭 가능 프로토타입', w: 262, q: '과업을 끝까지 해낼 수 있는가' },
  { name: '실제 코드와 데이터', w: 344, q: '실제 내용과 속도에서도 되는가' },
];

export default function FidelityLadder() {
  return (
    <svg viewBox="0 0 360 424" role="img" aria-label="충실도 사다리. 종이 스케치, 와이어프레임, 클릭 가능 프로토타입, 실제 코드와 데이터 순으로 막대가 길어지고, 각 단계가 답하는 질문이 적혀 있다.">
      <text className="t-sub" x="8" y="18">막대가 길수록 비용이 크다(상대 비교)</text>
      {ROWS.map((r, i) => {
        const y = 52 + i * 96;
        return (
          <g key={r.name}>
            <rect className={i === 0 ? 'svg-box-key' : 'svg-box'} x="8" y={y} width={r.w} height="46" rx="8" />
            <text className="t-strong" x="20" y={y + 29}>{r.name}</text>
            <text className="t-sub" x="8" y={y + 70}>{r.q}</text>
          </g>
        );
      })}
    </svg>
  );
}
