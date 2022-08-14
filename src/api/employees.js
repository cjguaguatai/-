import request from '@/utils/request'

/**
 * 获取员工列表（简单）
 * @returns
 */
export const getEmployeesApi = () => {
  return request({
    url: '/sys/user/simple',
  })
}

/**
 * 获取员工的综合列表数据
 * ***/
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params,
  })
}
/**
 * 根据ID删除角色
 * @param {String} id
 * @returns
 */
export const delEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete',
  })
}
/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data,
  })
}

/**
 * 批量导入员工
 * @param {Object} data
 * @returns
 */
export function batchAddEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data,
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data,
  })
}
