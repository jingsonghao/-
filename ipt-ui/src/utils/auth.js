// https://github.com/alfhen/vue-cookie
import Vue from 'vue'
import BaseApi from '@/api'
import DateUtil from '@/utils/dateUtil'

const TokenKey = 'Admin-Token'
const TokenParams = 'Token-Params'
const TokenStartTime = 'Token-Start-Time'
const vm = new Vue()

// ************** TokenParams ****************
export function getTokenParams () {
  let params = vm.$cookie.get(TokenParams)
  if (!params || params === 'null') {
    return null
  }
  flushTokenParams()
  return params
}

export function setTokenParams (params) {
  if (!params || params === 'null') {
    return null
  }
  return vm.$cookie.set(TokenParams, params, {expires: '1h'})
}

export function removeTokenParams () {
  removeTokenStartTime()
  return vm.$cookie.delete(TokenParams)
}

export function flushTokenParams () {
  flushTokenStartTime()
  return setTokenParams(vm.$cookie.get(TokenParams))
}

// ************** TokenKey ****************
export function getToken () {
  let token = vm.$cookie.get(TokenKey)
  let computeSeconds = DateUtil.computeSeconds(getTokenStartTime(), new Date().getTime())
  if (computeSeconds > 30 * 60) {
    let params = getTokenParams()
    if (params) {
      BaseApi.Common.getTokenByEncode(params).then(function (data) {
        setToken(data.msg)
      })
    }
  }
  if (!token || token === 'null') {
    return null
  }
  return token
}

export function setToken (token) {
  if (!token || token === 'null') {
    return null
  }
  flushTokenParams()
  return vm.$cookie.set(TokenKey, token, {expires: '30m'})
}

export function removeToken () {
  removeTokenParams()
  return vm.$cookie.delete(TokenKey)
}

// ************** TokenStartTime ****************
export function getTokenStartTime () {
  let startTime = vm.$cookie.get(TokenStartTime)
  if (!startTime || startTime === 'null') {
    return null
  }
  return startTime
}

export function setTokenStartTime (startTime) {
  if (!startTime || startTime === 'null') {
    return null
  }
  return vm.$cookie.set(TokenStartTime, startTime, {expires: '1h'})
}

export function removeTokenStartTime () {
  return vm.$cookie.delete(TokenStartTime)
}

export function flushTokenStartTime () {
  return setTokenStartTime(new Date().getTime())
}
