import fetch from '@/utils/fetch'

export default {
  apiUrl: '/trace-base/enterprises',
  findEnterprisesList(params) {
    return fetch({
      url: this.apiUrl + '/findEnterprisesList',
      method: 'get',
      params: params
    })
  }
}
