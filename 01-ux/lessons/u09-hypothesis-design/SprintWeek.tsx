const DAYS = [
  { d: '월', t: '지도', s: '목표와 문제를 그리고 집중할 곳 고르기', tag: '' },
  { d: '화', t: '스케치', s: '해법을 각자 종이에 그린다', tag: '발산' },
  { d: '수', t: '결정', s: '고른 안을 테스트할 가설로 만든다', tag: '수렴' },
  { d: '목', t: '프로토타입', s: '진짜처럼 보이는 모형을 만든다', tag: '' },
  { d: '금', t: '테스트', s: '실제 사용자와 인터뷰한다', tag: '' },
];

export default function SprintWeek() {
  return (
    <svg viewBox="0 0 360 296" role="img" aria-label="디자인 스프린트 5일. 월요일 지도, 화요일 스케치(발산), 수요일 결정(수렴), 목요일 프로토타입, 금요일 테스트.">
      {DAYS.map((x, i) => {
        const y = 4 + i * 58;
        return (
          <g key={x.d}>
            <rect className={x.tag === '발산' ? 'svg-box-key' : x.tag === '수렴' ? 'svg-box-bad' : 'svg-box'} x="8" y={y} width="344" height="50" rx="8" />
            <text className="t-warm" x="22" y={y + 30}>{x.d}</text>
            <text className="t-strong" x="52" y={y + 21}>{x.t}</text>
            <text className="t-sub" x="52" y={y + 40}>{x.s}</text>
            {x.tag && <text className="t-accent" x="338" y={y + 21} textAnchor="end">{x.tag}</text>}
          </g>
        );
      })}
    </svg>
  );
}
