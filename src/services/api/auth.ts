import request from '@/services/axios-interceptor'

export const signIn = (data) => {
    return request({
        url: '/auth/signin',
        method: 'POST',
        data
    })
}

export const signUp = (data) => {
    return request({
        url: '/auth/signup',
        method: 'POST',
        data
    })
}
