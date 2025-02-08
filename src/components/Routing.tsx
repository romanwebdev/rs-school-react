import { Route, Routes } from 'react-router';
import App from '../App';
import NotFound from '../pages/NotFound';
import Details from './Details';

export default function Routing() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="details/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
