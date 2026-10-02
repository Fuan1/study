import { Link } from 'react-router-dom';

type Props = { crumb?: string; menu?: { open: boolean; onToggle: () => void } };

export default function TopBar({ crumb, menu }: Props) {
  return (
    <header className="top">
      {menu && (
        <button className="icon-btn" type="button" aria-label="목차" aria-expanded={menu.open} aria-controls="toc" onClick={menu.onToggle}>
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" /></svg>
        </button>
      )}
      <Link className="brand" to="/">학습</Link>
      <span className="crumb">{crumb}</span>
    </header>
  );
}
