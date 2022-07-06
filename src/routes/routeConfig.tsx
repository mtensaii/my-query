import { routePaths } from '@/const/routePaths';
import HomePage from '@/pages/HomePage/HomePage';
import MessengerPage from '@/pages/MessengerPage/MessengerPage';
import QueriesPage from '@/pages/QueriesPage/QueriesPage';
import QueryDetailPage from '@/pages/QueryDetailPage/QueryDetailPage';
import SignInPage from '@/pages/SignInPage/SignInPage';
import SignUpPage from '@/pages/SignUpPage/SignUpPage';
import TutorDetailPage from '@/pages/TutorDetailPage/TutorDetailPage';
import TutorListPage from '@/pages/TutorListPage/TutorListPage';

export interface RouterInterface {
  path?: string;
  needAuthor?: boolean;
  grantPermission?: Array<any>;
  component?: any;
}

export const routerConfig: Array<RouterInterface> = [
  {
    path: routePaths.HOME,
    component: HomePage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.SIGN_IN_PAGE,
    component: SignInPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.HOME,
    component: SignUpPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.MESSENGER,
    component: MessengerPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.QUERIES_PAGE,
    component: QueriesPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.QUERY_DETAIL,
    component: QueryDetailPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.TUTOR_DETAIL_PAGE,
    component: TutorDetailPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.TUTOR_LIST_PAGE,
    component: TutorListPage,
    needAuthor: true,
    grantPermission: [],
  },
];