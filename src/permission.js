import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

function goFirstPermissionedRoute() {
  let toPath = ''
  for (var i = 0; i < store.getters.addRouters.length; i++) {
    const item = store.getters.addRouters[i]
    if (item.children.length > 0) {
      toPath = item.children[0].path
      break
    }
  }
  router.push({ path: toPath })
}

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (whiteList.indexOf(to.path) !== -1) {
      goFirstPermissionedRoute()
      NProgress.done()
    } else {
      if (store.getters.roles === '') {
        store.dispatch('user/GetInfo').then(res => {
          if (res.code === 0) {
            const roles = store.getters.roles
            store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              if (to.path === '/') {
                goFirstPermissionedRoute()
              } else {
                next({ ...to, replace: true })
              }
            })
          }
        }).catch((err) => {
          console.log(err)
          store.dispatch('user/FedLogOut').then(() => {
            next({ path: '/' })
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()//
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
