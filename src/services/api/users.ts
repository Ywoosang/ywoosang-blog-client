import request from '@/services/axios-interceptor'

export const getUser = () => {
    return request({
        url: '/users/profile',
        method: 'GET',
    })
}