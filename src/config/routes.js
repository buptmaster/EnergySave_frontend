import UserLogin from '@/pages/UserLogin';
import UserRegister from '@/pages/UserRegister';
import Dashboard from '@/pages/Dashboard';
import StrategyOverView from '@/pages/StrategyOverView';
import AddStrategy from '@/pages/AddStrategy';
import AddCategory from '@/pages/AddCategory';
import NotFound from '@/pages/NotFound';

import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: UserLogin,
      },
      {
        path: '/register',
        component: UserRegister,
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/device/strategy',
        component: StrategyOverView,
      },
      {
        path: '/add/strategy',
        component: AddStrategy,
      },
      {
        path: '/add/category',
        component: AddCategory,
      },
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
