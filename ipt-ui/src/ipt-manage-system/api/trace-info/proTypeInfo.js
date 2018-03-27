import fetch from '@/utils/fetch'

export default {
  /** gaoj 2017/12/5 获取树型列表 */
  getProTypeInfoTableDate(params) {
    return fetch({
      url:  '/admin/cate',
      method: 'get',
      params: params
    })
  }
}
