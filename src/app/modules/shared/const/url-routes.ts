
const AUTH = '/auth'
const ADMIN = '/admin'

const HOME = '/home';
const MOVIE = '/movie';

export const URL_ROUTES = {
  // ? Rutas authenticación
  LOGIN: `${AUTH}/login`,
  REGISTER: `${AUTH}/register`,
  CHANGE_PASSWORD: `${AUTH}/change-password`,

  // ? Rutas administrativas
  DASHBOARD: `${ADMIN}${HOME}/dashboard`,
  MOVIE: `${ADMIN}${MOVIE}`,
  DETAIL: `${ADMIN}${MOVIE}/detail`,
  NOW_PLAYING: `${ADMIN}${MOVIE}/now-playing`

}
