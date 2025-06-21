import { joinStrings } from '@shared/helper/string.helper';

export const ROUTES = {
  HOME: '/courses',
  LOGIN: '/auth/login',
  SIGN_UP: '/auth/signup',
  CALENDAR: '/calendar',
  SETTINGS: '/settings',
};

export const DYNAMIC_ROUTES = {
  COURSES: (...routeParts: string[]) => getDynamicRoute(routeParts),
};

const getDynamicRoute = (routeParts: string[]): string => {
  if (!routeParts || routeParts.length === 0) return '/';
  return '/' + joinStrings(routeParts, '/');
};
