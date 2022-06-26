import { lazy } from 'react'
import Index from '../pages/index'
export type RouterType = {
  path: string
  component: React.LazyExoticComponent<any> | React.FC
  root: string[]
}

const HomeRouter: RouterType = {
  path: '/',
  component: Index,
  root: [],
}
// 总路由
const Routers: RouterType[] = [
  HomeRouter,
  {
    path: '/login',
    component: lazy(() => import('../pages/login')),
    root: [],
  },
]

export default Routers
