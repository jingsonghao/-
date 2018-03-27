import Api from '@/ipt-manage-system/api'
import * as types from '../../mutation-types'

const moduleDepartmentManageData = {
  state: {
    departmentList: {},
    parentDepartment: {}
  },
  getters: {
    departmentList: state => state.departmentList,
    parentDepartment: state => state.parentDepartment
  },
  actions: {
    getDepartmentManageList({commit}) {
      Api.DepartmentManage.getAllDepartment().then((departmentList) => {
        departmentList = departmentList.data
        commit(types.GET_DEPARTMENT_MANAGE_DEPARTMENT_LIST, {departmentList})
      })
    },
    getParentDepartment({commit}) {
      Api.DepartmentManage.findParentDepartment().then((parentDepartment) => {
        parentDepartment = parentDepartment.data
        commit(types.GET_DEPARTMENT_MANAGE_PARENT_DEPARTMENT, {parentDepartment})
      })
    }
  },
  mutations: {
    [types.GET_DEPARTMENT_MANAGE_DEPARTMENT_LIST](state, {departmentList}) {
      state.departmentList = departmentList
    },
    [types.GET_DEPARTMENT_MANAGE_PARENT_DEPARTMENT](state, {parentDepartment}) {
      state.parentDepartment = parentDepartment
    }
  }
}
export default {
  modules: {
    moduleDepartmentManageData
  }
}
