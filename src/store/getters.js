const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,

  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles
}
export default getters
