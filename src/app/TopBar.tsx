import { Link } from 'react-router-dom';

type Props = { title?: string; section?: string; menu?: { open: boolean; onToggle: () => void } };

export const SearchIcon = ({ size = 22 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M16 16l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** 위 고정 바. 글을 읽는 중에는 지금 보고 있는 섹션 이름을 보여 줘서 위치를 기억하지 않아도 되게 한다. */
export default function TopBar({ title, section, menu }: Props) {
  return (
    <header className="top">
      {menu && (
        <button className="icon-btn menu press" type="button" aria-label="목차" aria-expanded={menu.open} aria-controls="toc" onClick={menu.onToggle}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
        </button>
      )}
      <Link className="brand" to="/">학습</Link>
      <div className="crumb">
        {title && <small>{title}</small>}
        {section && <b>{section}</b>}
      </div>
      <Link className="icon-btn press" to="/search" aria-label="검색"><SearchIcon /></Link>
    </header>
  );
}
