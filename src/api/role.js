import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {Object} params
 * @returns
 */
export const getRolesApi = (params) => {
  return request({
    url: '/sys/role',
    params,
  })
}

/**
 * 添加角色
 * @param {Object} data
 * @returns
 */
export const addRolesApi = (data) => {
  return request({
    url: '/sys/role',
    method: 'post',
    data,
  })
}
