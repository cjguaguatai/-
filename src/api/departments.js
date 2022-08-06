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

/**
 * code		     部门编码，同级部门不可重复
 * introduce	 介绍
 * manager		 负责人名称
 * name		     部门名称
 * pid		     父级部门ID
 * @returns
 */
export const addDeptsApi = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data,
  })
}

/**
 * 根据ID查询部门详情
 * @param {String} id
 * @returns
 */
export const getDeptsByIdApi = (id) =>
  request({
    url: '/company/department/' + id,
  })
  
/**
 * 根据ID修改部门详情
 * @param {String} id
 * @returns
 */
export const changeDeptsByIdApi = (data) =>
  request({
    url: '/company/department/' + data.id,
    method: 'put',
    data,
  })
