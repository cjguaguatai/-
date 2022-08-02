import request from '@/utils/request'

/**
 *  登录接口
 * @param {object} data
 * @returns
 */
export const login = (data) =>
  request({
    url: '/sys/login',
    method: 'post',
    data,
  })
