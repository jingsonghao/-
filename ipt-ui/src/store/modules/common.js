import Api from '@/api'
import * as types from '../mutation-types'
import {removeToken, setToken} from '@/utils/auth'

// initial state
const state = {
  menuList: [],
  token: '',
  loginUser: {},
  dialogFormVisible: false
}

// getters
const getters = {
  menuList: state => state.menuList,
  token: state => state.token,
  loginUser: state => state.loginUser,
  dialogFormVisible: state => state.dialogFormVisible
}

// actions
const actions = {
  getMenuList({commit}, params) {
    Api.Common.getMenuList(params).then((menuList) => {
      commit(types.GET_MENU_LIST, {menuList})
    }, () => {
      console.error("菜单拉取失败，当前的菜单列表为Vuex中的数据。")
      commit(types.GET_MENU_LIST, state.menuList)
    })
  },
  getToken({commit}, params) {
    Api.Common.getToken(params).then((token) => {
      token = token.msg
      setToken(token)
      commit(types.GET_TOKEN, {token})
    })
  },
  getLoginUser({commit}, params) {
    Api.Common.getLoginUser(params).then((loginUser) => {
      commit(types.GET_LOGIN_USER, {loginUser: loginUser.data})
    })
  },
  removeToken({commit}) {
    removeToken()
    commit(types.GET_TOKEN, '')
  },
  setDialogFormVisible({commit}, params) {
    commit(types.SET_DIALOG_FORM_VISIBLE, {dialogFormVisible: params})
  }
}

// mutations
const mutations = {
  [types.GET_MENU_LIST](state, {menuList}) {
    state.menuList = menuList
  },
  [types.GET_TOKEN](state, {token}) {
    state.token = token
  },
  [types.GET_LOGIN_USER](state, {loginUser}) {
    state.loginUser = loginUser
  },
  [types.SET_DIALOG_FORM_VISIBLE](state, {dialogFormVisible}) {
    state.dialogFormVisible = dialogFormVisible
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
