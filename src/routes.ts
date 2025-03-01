import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', './pages/Home/index.tsx', [
    route('details/:id', './components/Details/index.tsx'),
  ]),
] satisfies RouteConfig;
