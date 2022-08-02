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

/**
 * 获取用户基本信息
 * @returns
 */
export const getUserInfo = () =>
  request({
    url: '/sys/profile',
    method: 'post',
  })

  /**
   * 获取用户详细信息
   * @param {String} id 
   * @returns 
   */
export const getUserDetail = (id) =>
  request({
    url: '/sys/user/' + id,
  })
