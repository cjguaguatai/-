import request from '@/utils/request'

export const getEmployeesApi = () => {
  return request({
    url: '/sys/user/simple',
  })
}
