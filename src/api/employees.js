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
