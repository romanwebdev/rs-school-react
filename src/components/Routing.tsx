import { Route, Routes } from 'react-router';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Details from './Details';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="details/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
