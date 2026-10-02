import type { ReactNode } from 'react';

/** 가정한 회의실 예약 앱의 위반 화면과 고친 화면. 실제 서비스가 아니다. */
// 여백 기준: 나쁜 예/고친 예를 위아래로 쌓아 상자 안 여백 14px 이상, 버튼 높이 42, 두 묶음 사이 24px 이상.
const X = 8;
const PW = 344;
const CX = X + 76; // 내용 열 시작

function Panel({ y, h, kind, children }: { y: number; h: number; kind: 'bad' | 'good'; children: ReactNode }) {
  return (
    <g>
      <rect className={kind === 'bad' ? 'svg-box-bad' : 'svg-box-good'} x={X} y={y} width={PW} height={h} rx="8" />
      <text className={kind === 'bad' ? 't-bad' : 't-good'} x={X + 16} y={y + 31}>{kind === 'bad' ? '나쁜 예' : '고친 예'}</text>
      {children}
    </g>
  );
}

function Btn({ x, y, label, primary }: { x: number; y: number; label: string; primary?: boolean }) {
  return (
    <g>
      <rect className={primary ? 'svg-box-key' : 'svg-box'} x={x} y={y} width="80" height="42" rx="6" />
      <text x={x + 40} y={y + 26} textAnchor="middle" fontSize="12.5">{label}</text>
    </g>
  );
}

export default function ViolationFixes() {
  // 첫째 묶음
  const a1 = 40; // 나쁜 예 y
  const a2 = a1 + 52 + 14; // 고친 예 y
  // 둘째 묶음
  const t2 = a2 + 70 + 24 + 13; // 둘째 제목 baseline (앞 묶음에서 24px 아래 + 글자 윗면)
  const b1 = t2 + 16;
  const b2 = b1 + 106 + 14;
  return (
    <svg viewBox="0 0 360 468" role="img" aria-label="위반 화면과 고친 화면 비교. 오류 메시지는 코드 한 줄에서 원인과 해결 방법을 말하는 문장으로, 취소 확인창은 모호한 취소와 확인 버튼에서 동작을 적은 돌아가기와 예약 취소 버튼으로 바뀐다.">
      <text className="t-strong" x="8" y="24">9 오류 인식·진단·복구</text>
      <Panel y={a1} h={52} kind="bad">
        <text x={CX} y={a1 + 31} fontSize="12.5">오류 E-102</text>
      </Panel>
      <Panel y={a2} h={70} kind="good">
        <text x={CX} y={a2 + 31} fontSize="12.5">이미 예약된 시간이에요</text>
        <text x={CX} y={a2 + 52} fontSize="12.5">다른 시간을 고르세요</text>
      </Panel>
      <text className="t-strong" x="8" y={t2}>4 일관성과 표준 (취소 확인창)</text>
      <Panel y={b1} h={106} kind="bad">
        <text x={CX} y={b1 + 31} fontSize="12.5">예약을 취소할까요?</text>
        <Btn x={CX} y={b1 + 48} label="취소" />
        <Btn x={CX + 92} y={b1 + 48} label="확인" />
      </Panel>
      <Panel y={b2} h={106} kind="good">
        <text x={CX} y={b2 + 31} fontSize="12.5">예약을 취소할까요?</text>
        <Btn x={CX} y={b2 + 48} label="돌아가기" />
        <Btn x={CX + 92} y={b2 + 48} label="예약 취소" primary />
      </Panel>
    </svg>
  );
}
