import axios from 'axios'
import CONSTANT from '@/constant'

export default {
  getSonProInfoTableDate(params, cb) {
    const url = '/api/sonProInfoTableDate'
    return axios.get(url, params).then((response) => {
      response = response.data
      if (response.status === CONSTANT.STATUS.SUCCESS && typeof cb === 'function') {
        cb(response)
      }
    })
  }
}
