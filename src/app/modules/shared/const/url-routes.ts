
const AUTH = '/auth'
const ADMIN = '/admin'

const HOME = '/home';
const MOVIE = '/movie';
const PRODUCTO = '/product'

export const URL_ROUTES = {
  // ? Rutas authenticación
  LOGIN: `${AUTH}/login`,
  REGISTER: `${AUTH}/register`,
  CHANGE_PASSWORD: `${AUTH}/change-password`,

  // ? Rutas administrativas
  DASHBOARD: `${ADMIN}${HOME}/dashboard`,
  PRODUCTS: `${ADMIN}${HOME}/products`,
  PRODUCT_LIST: `${ADMIN}${HOME}/products/list`,
  MOVIE: `${ADMIN}${MOVIE}`,
  DETAIL: `${ADMIN}${MOVIE}/detail`,
  NOW_PLAYING: `${ADMIN}${MOVIE}/now-playing`,
  POPULARES: `${ADMIN}${MOVIE}/popular`,
  TOP_RATED: `${ADMIN}${MOVIE}/top-rated`,
  UPCOMING: `${ADMIN}${MOVIE}/upcoming`

}
