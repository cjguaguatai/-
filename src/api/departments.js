import request from '@/utils/request'

/**
 * 查询企业的部门列表
 * @returns
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department',
  })
}

/**
 * 删除部门
 * @param {*} id
 * @returns
 */
export const delDeptsApi = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}
