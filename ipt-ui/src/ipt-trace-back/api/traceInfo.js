import axios from 'axios'
import CONSTANT from '@/constant'

export default {
  getBusinessesInfo(params, cb) {
    const url = '/trace-base/businesses'
    return axios.get(url, params).then((response) => {
      response = response.data
      if (response.status === CONSTANT.STATUS.SUCCESS && typeof cb === 'function') {
        cb(response)
      }
    })
  }
}
