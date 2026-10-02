/** 근접(라벨-입력칸 짝)과 유사(링크 모양) 의 Before / After. 가정한 예시이며 특정 서비스 화면이 아니다. */
const LABELS = ['이름', '연락처', '주소'];

function FormBefore({ x }: { x: number }) {
  return (
    <g>
      {LABELS.flatMap((t, i) => {
        const yl = 56 + i * 48;
        return [
          <text key={`l${i}`} x={x} y={yl + 12}>{t}</text>,
          <rect key={`f${i}`} className="svg-box" x={x} y={yl + 24} width="150" height="16" rx="3" />,
        ];
      })}
    </g>
  );
}

function FormAfter({ x }: { x: number }) {
  return (
    <g>
      {LABELS.map((t, i) => {
        const y0 = 56 + i * 44;
        return (
          <g key={t}>
            <text x={x} y={y0 + 12}>{t}</text>
            <rect className="svg-box" x={x} y={y0 + 16} width="150" height="16" rx="3" />
          </g>
        );
      })}
    </g>
  );
}

const LINES = [
  { t: '주문 내역 보기', link: true },
  { t: '배송 준비 중입니다', link: false },
  { t: '주문 취소하기', link: true },
];

function Lines({ x, styled }: { x: number; styled: boolean }) {
  return (
    <g>
      {LINES.map((l, i) => {
        const on = styled && l.link;
        return (
          <text key={l.t} className={on ? 't-accent' : 't-sub'} x={x} y={282 + i * 24} style={on ? { textDecoration: 'underline' } : undefined}>
            {l.t}
          </text>
        );
      })}
    </g>
  );
}

export default function ProximitySimilarity() {
  return (
    <svg viewBox="0 0 360 372" role="img" aria-label="위쪽은 근접. 라벨과 입력칸 사이 간격이 모두 같으면 짝이 안 보이고, 라벨을 입력칸에 붙이고 짝 사이를 벌리면 짝이 보인다. 아래쪽은 유사. 세 줄이 모두 같은 회색이면 눌리는 줄을 모르고, 눌리는 줄만 같은 색과 밑줄로 묶으면 구분된다.">
      <text className="t-strong" x="8" y="20">Before</text>
      <text className="t-strong" x="188" y="20">After</text>
      <text className="t-accent" x="8" y="44">근접: 간격으로 짝을 만든다</text>
      <FormBefore x={8} />
      <FormAfter x={188} />
      <text className="t-bad" x="8" y="214">모든 간격이 같다</text>
      <text className="t-bad" x="8" y="231">라벨이 어느 칸 것인가</text>
      <text className="t-good" x="188" y="214">짝 안은 좁게</text>
      <text className="t-good" x="188" y="231">짝 사이는 넓게</text>
      <line x1="8" y1="244" x2="352" y2="244" stroke="var(--line)" />
      <text className="t-accent" x="8" y="266">유사: 같은 모양은 같은 역할로 읽힌다</text>
      <Lines x={8} styled={false} />
      <Lines x={188} styled />
      <text className="t-bad" x="8" y="360">눌리는 줄을 구분 못 한다</text>
      <text className="t-good" x="188" y="360">눌리는 것끼리 같은 모양</text>
    </svg>
  );
}
