import fetch from '@/utils/fetch'
export default {
  getCirNoDateInfoTableDate(params) {
    return fetch({
      url:  '/admin/nodeTypeRelation',
      method: 'get',
      params: params
    })
  }
}
