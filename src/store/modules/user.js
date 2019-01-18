import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  namespaced: true,

  state: {
    token: getToken(),
    userInfo: {},
    roles: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setToken('demoToken')
          commit('SET_TOKEN', 'demotoken')
          resolve()
        }, 500)

        // login(username, userInfo.password).then(response => {
        //   const data = response.data
        //   setToken(data.token)
        //   commit('SET_TOKEN', data.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const res = {
            code: 0,
            data: {
              name: 'admin',
              roles: ['admin']
            }
          }
          commit('SET_USERINFO', res.data)
          commit('SET_ROLES', res.data.roles)
          resolve(res)
        }, 500)
        // getInfo(state.token).then(response => {
        //   const data = response.data
        //   commit('userInfo', data.userInfo)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
