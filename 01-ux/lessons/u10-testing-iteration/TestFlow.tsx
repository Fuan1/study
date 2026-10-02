const STEPS: { title: string; note: string }[] = [
  { title: '1 · 목표와 질문 정하기', note: '무엇을 알고 싶은가. 가설(U9)에서 가져온다' },
  { title: '2 · 과업 시나리오 쓰기', note: '현실적인 목표를 단서 없이 적는다' },
  { title: '3 · 참가자 모집', note: '실제 사용자와 비슷한 사람. 사용자군마다' },
  { title: '4 · 파일럿', note: '한 명으로 과업 문구와 장비를 먼저 점검' },
  { title: '5 · 세션 진행', note: '동의, 소리 내어 생각하기, 관찰과 기록' },
  { title: '6 · 정리와 우선순위', note: '문제 목록, 심각도, 빈도, 의심 층' },
  { title: '7 · 고치고 다시 테스트', note: '고친 부분이 실제로 나아졌는지 확인' },
];

export default function TestFlow() {
  const x = 8;
  const w = 322;
  const h = 44;
  const gap = 14;
  const y = (i: number) => 6 + i * (h + gap);
  const last = STEPS.length - 1;
  return (
    <svg viewBox="0 0 360 410" role="img" aria-label="사용성 테스트 진행 순서. 목표 정하기, 과업 쓰기, 모집, 파일럿, 세션, 정리, 수정 후 재테스트의 7단계이고 마지막에서 첫 단계로 돌아가는 화살표가 있다.">
      <defs>
        <marker id="ar-tf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={i === 4 ? 'svg-box-key' : 'svg-box'} x={x} y={y(i)} width={w} height={h} rx="6" />
          <text className="t-strong" x={x + 12} y={y(i) + 19}>{s.title}</text>
          <text className="t-sub" x={x + 12} y={y(i) + 36}>{s.note}</text>
          {i < last && <line className="svg-flow" x1={x + w / 2} y1={y(i) + h + 1} x2={x + w / 2} y2={y(i) + h + gap - 1} markerEnd="url(#ar-tf)" />}
        </g>
      ))}
      <path className="svg-flow" d={`M${x + w},${y(last) + h / 2} H350 V${y(0) + h / 2} H${x + w + 2}`} markerEnd="url(#ar-tf)" strokeDasharray="4 3" />
    </svg>
  );
}
