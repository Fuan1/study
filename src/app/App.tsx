import { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Search from './Search';
import Home from './Home';
import UnitPage from './UnitPage';
import NotFound from './NotFound';
import { getCourse } from '../lib/catalog';

/** /:slug → 첫 번째 제작된 글로 */
function CourseRedirect() {
  const { slug = '' } = useParams();
  const course = getCourse(slug);
  const first = course?.units.find((u) => u.lessonKey) ?? course?.units[0];
  if (!course || !first) return <NotFound message={course ? '이 과정에는 아직 글이 없습니다.' : undefined} />;
  return <Navigate to={`/${slug}/${first.id}`} replace />;
}

export default function App() {
  const navigate = useNavigate();
  // 데스크톱: "/" 키로 어디서든 검색으로 이동
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey || (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))) return;
      e.preventDefault();
      navigate('/search');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="search" element={<Search />} />
      <Route path=":slug" element={<CourseRedirect />} />
      <Route path=":slug/:unitId" element={<UnitPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
