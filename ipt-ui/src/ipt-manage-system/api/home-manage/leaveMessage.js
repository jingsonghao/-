import fetch from '@/utils/fetch'

export default {
  /** gaoj 2017/12/5 获取留言列表 */
  getNotDealMessageTableData(params) {
    return fetch({
      url:  '/home-admin/message',
      method: 'get',
      params: params
    })
  },
  /** gaoj 2017/12/5 审核 */
  reviewMessage(id, params) {
    return fetch({
      url: '/home-admin/message/' + id + '/review',
      method: 'patch',
      data: params
    })
  },
  deleteMessage(id) {
    return fetch({
      url: '/home-admin/message/' + id,
      method: 'delete'
    })
  },
  getMessageEnums() {
    return fetch({
      url:  '/home-admin/message/getMessageEnums',
      method: 'get'
    })
  }
}
