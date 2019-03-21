const getters = {
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,

  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles
}
export default getters
