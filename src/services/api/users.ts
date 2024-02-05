import request from '@/services/axios-interceptor'

export const getUserProfile = () => {
    return request({
        url: '/users/profile',
        method: 'GET',
    })
}

export const getPublicUserProfile = (userLoginId: string) => {
    return request({
        url: `/users/public/profile/${userLoginId}`,
        method: 'GET',
    })
}

export const updateUserProfileImage = (formData) => {
    return request({
        url: `/files/image`,
        method: 'POST',
        data: formData
    })
} 

export const updateUser = (data) => {
    return request({
        url: '/users/profile',
        method: 'PATCH',
        data
    })
}

