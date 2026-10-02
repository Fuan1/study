import type { ReactNode } from 'react';

/** 가정한 회의실 예약 앱의 위반 화면과 고친 화면. 실제 서비스가 아니다. */
const PW = 170;
const XB = 8;
const XF = 182;

function Panel({ x, y, h, kind, children }: { x: number; y: number; h: number; kind: 'bad' | 'good'; children: ReactNode }) {
  return (
    <g>
      <rect className={kind === 'bad' ? 'svg-box-bad' : 'svg-box-good'} x={x} y={y} width={PW} height={h} rx="8" />
      <text className={kind === 'bad' ? 't-bad' : 't-good'} x={x + 12} y={y + 20}>{kind === 'bad' ? '나쁜 예' : '고친 예'}</text>
      {children}
    </g>
  );
}

function Btn({ x, y, label, primary }: { x: number; y: number; label: string; primary?: boolean }) {
  return (
    <g>
      <rect className={primary ? 'svg-box-key' : 'svg-box'} x={x} y={y} width="68" height="28" rx="6" />
      <text x={x + 34} y={y + 19} textAnchor="middle" fontSize="12.5">{label}</text>
    </g>
  );
}

export default function ViolationFixes() {
  return (
    <svg viewBox="0 0 360 268" role="img" aria-label="위반 화면과 고친 화면 비교. 오류 메시지는 코드 한 줄에서 원인과 해결 방법을 말하는 문장으로, 취소 확인창은 모호한 취소와 확인 버튼에서 동작을 적은 돌아가기와 예약 취소 버튼으로 바뀐다.">
      <text className="t-strong" x="8" y="18">9 오류 인식·진단·복구</text>
      <Panel x={XB} y={28} h={92} kind="bad">
        <text x={XB + 12} y="80" fontSize="12.5">오류 E-102</text>
      </Panel>
      <Panel x={XF} y={28} h={92} kind="good">
        <text x={XF + 12} y="80" fontSize="12.5">이미 예약된 시간이에요</text>
        <text x={XF + 12} y="100" fontSize="12.5">다른 시간을 고르세요</text>
      </Panel>
      <text className="t-strong" x="8" y="148">4 일관성과 표준 (취소 확인창)</text>
      <Panel x={XB} y={158} h={102} kind="bad">
        <text x={XB + 12} y="204" fontSize="12.5">예약을 취소할까요?</text>
        <Btn x={XB + 12} y={216} label="취소" />
        <Btn x={XB + 90} y={216} label="확인" />
      </Panel>
      <Panel x={XF} y={158} h={102} kind="good">
        <text x={XF + 12} y="204" fontSize="12.5">예약을 취소할까요?</text>
        <Btn x={XF + 12} y={216} label="돌아가기" />
        <Btn x={XF + 90} y={216} label="예약 취소" primary />
      </Panel>
    </svg>
  );
}
