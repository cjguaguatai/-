import request from '@/utils/request'

// 获取所有权限点
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params,
  })
}
/**
 * 添加权限点
 * @param {*} data
 * @returns
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data,
  })
}
