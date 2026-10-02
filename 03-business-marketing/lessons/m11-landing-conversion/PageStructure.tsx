/** 랜딩 페이지 섹션 순서. 첫 화면 묶음(헤드라인, 하위 문장, 주 CTA, 증거 한 줄) 아래에 나머지 섹션이 쌓인다. 가정한 구성이다. */
const FIRST = [
  { label: '헤드라인', key: false },
  { label: '하위 문장', key: false },
  { label: '주 CTA 버튼', key: true },
  { label: '증거 한 줄', key: false },
];
const REST = [
  { label: '증거', note: '후기·로고·수치' },
  { label: '혜택', note: '얻는 결과 위주' },
  { label: '제품 설명', note: '필요한 사람만 읽음' },
  { label: '반론 처리·FAQ', note: '망설임 해소' },
  { label: 'CTA 반복', note: '같은 행동·문구' },
];

// 여백 기준: 상자 안 글자 위아래 12px 이상(높이 40), 첫 화면 묶음과 나머지 사이 24, 라벨은 선과 12px.
const FX = 8; // 폰 틀 x
const FW = 196;
const PAD = 12;
const GX = FX + PAD; // 묶음 x
const GW = FW - PAD * 2;
const IH = 40; // 상자 높이
const IG = 8; // 같은 묶음 안 간격
const STROKE = 1.5;
const GTOP = 8 + PAD; // 첫 화면 묶음 y
const GH = PAD + FIRST.length * IH + (FIRST.length - 1) * IG + PAD;
const REST_TOP = GTOP + GH + 24;
const restY = (i: number) => REST_TOP + i * (IH + 12);
const REST_BOTTOM = restY(REST.length - 1) + IH;
const FRAME_H = REST_BOTTOM + PAD - 8;
const VB_H = Math.ceil(8 + FRAME_H + STROKE / 2 + 8);
const BX = FX + FW + 8; // 묶음 괄호 선 x
const LX = BX + 12; // 라벨 x
const MID = GTOP + GH / 2;

export default function PageStructure() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="랜딩 페이지 섹션 순서. 첫 화면에 헤드라인, 하위 문장, 주 CTA 버튼, 증거 한 줄이 들어간다. 그 아래에 증거, 혜택, 제품 설명, 반론 처리와 FAQ, 반복 CTA 순서로 쌓는다.">
      <rect className="svg-box" x={FX} y="8" width={FW} height={FRAME_H} rx="12" />
      <rect className="svg-berg" x={GX} y={GTOP} width={GW} height={GH} rx="8" />
      {FIRST.map((f, i) => {
        const y = GTOP + PAD + i * (IH + IG);
        return (
          <g key={f.label}>
            <rect className={f.key ? 'svg-box-key' : 'svg-box'} x={GX + PAD} y={y} width={GW - PAD * 2} height={IH} rx="6" />
            <text className="t-strong" x={GX + PAD * 2} y={y + IH / 2 + 5}>{f.label}</text>
          </g>
        );
      })}
      <line className="svg-flow" x1={BX} y1={GTOP} x2={BX} y2={GTOP + GH} />
      <text className="t-strong" x={LX} y={MID - 8}>첫 화면</text>
      <text className="t-sub" x={LX} y={MID + 14}>스크롤 전에</text>
      <text className="t-sub" x={LX} y={MID + 34}>약속과 행동</text>
      {REST.map((r, i) => {
        const y = restY(i);
        return (
          <g key={r.label}>
            <rect className={i === REST.length - 1 ? 'svg-box-key' : 'svg-box'} x={GX} y={y} width={GW} height={IH} rx="6" />
            <text className="t-strong" x={GX + PAD} y={y + IH / 2 + 5}>{r.label}</text>
            <text className="t-sub" x={LX} y={y + IH / 2 + 5}>{r.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
