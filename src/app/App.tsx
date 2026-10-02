import { Navigate, Route, Routes, useParams } from 'react-router-dom';
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
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path=":slug" element={<CourseRedirect />} />
      <Route path=":slug/:unitId" element={<UnitPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
