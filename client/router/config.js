import lazyLoader from './lazyLoader'

export default [
  {
    path: '/home',
    component: lazyLoader(() => import('../pages/home')),
  },
  {
    path: '/detail',
    component: lazyLoader(() => import('../pages/home')),
  },
]
