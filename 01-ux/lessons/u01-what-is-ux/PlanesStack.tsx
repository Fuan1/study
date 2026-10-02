type Plane = { name: string; en: string; q: string; tag: string; cls: string };

const PLANES: Plane[] = [
  { name: '표면', en: 'Surface', q: '눈에 어떻게 보이는가', tag: 'UI', cls: 'pl-ui' },
  { name: '골격', en: 'Skeleton', q: '어디에 두고 어떻게 조작하게 하는가', tag: 'UI·UX 경계', cls: 'pl-mid' },
  { name: '구조', en: 'Structure', q: '기능과 정보를 어떤 순서·묶음으로 잇는가', tag: 'UX', cls: 'pl-ux' },
  { name: '범위', en: 'Scope', q: '무엇을 만들고 무엇은 만들지 않는가', tag: 'UX', cls: 'pl-ux' },
  { name: '전략', en: 'Strategy', q: '누구에게 왜 필요한가', tag: 'UX', cls: 'pl-ux' },
];

export default function PlanesStack() {
  const h = 54;
  const gap = 8;
  return (
    <svg viewBox="0 0 360 306" role="img" aria-label="위에서 아래로 표면, 골격, 구조, 범위, 전략 순서로 쌓인 UX의 5개 층. 위는 눈에 보이는 UI이고 아래로 갈수록 이유에 가깝다.">
      {PLANES.map((p, i) => {
        const y = 4 + i * (h + gap);
        return (
          <g key={p.name}>
            <rect className={p.cls} x="8" y={y} width="344" height={h} rx="8" />
            <text x="22" y={y + 23}><tspan className="t-strong">{p.name}</tspan><tspan className="t-sub" dx="8">{p.en}</tspan></text>
            <text className={p.tag === 'UI' ? 't-warm' : p.tag === 'UX' ? 't-accent' : 't-sub'} x="338" y={y + 23} textAnchor="end">{p.tag}</text>
            <text className="t-sub" x="22" y={y + 44}>{p.q}</text>
          </g>
        );
      })}
    </svg>
  );
}
