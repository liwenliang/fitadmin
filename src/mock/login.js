const userRes = {
  code: 0,
  data: {
    userInfo: {
      name: 'admin'
    },
    token: 'tokenxxxxxxx',
    roles: ['admin']
  }
}

export default {
  login: config => {
    return userRes
  },
  getInfo: config => {
    return userRes
  }
}
