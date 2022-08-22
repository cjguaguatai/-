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

/**
 * 根据id获取角色详情
 * @param {*} id
 * @returns
 */
export const getRoleInfo = (id) => {
  return request({
    url: '/sys/role/' + id,
  })
}

/**
 * 给角色分配权限
 * @param {Object} data
 * @returns
 */
export const updateRoleInfo = (data) => {
  return request({
    url: '/sys/role/assignPrem',
    data,
    method: 'put',
  })
}
