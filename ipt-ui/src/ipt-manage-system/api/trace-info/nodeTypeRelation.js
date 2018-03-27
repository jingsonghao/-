import fetch from '@/utils/fetch'

export default {
  getNodeTypeRelationTreeList() {
    return fetch({
      url:  '/admin/nodeTypeRelation',
      method: 'get'
    })
  }
}
