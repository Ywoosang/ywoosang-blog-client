import request from '@/services/axios-interceptor';

export const getUserProfile = () => {
	return request({
		url: '/users/profile',
		method: 'GET',
	});
};

export const getPublicUserProfile = (userId: string) => {
	return request({
		url: `/users/public/profile/${userId}`,
		method: 'GET',
	});
};

export const getUserActivities = (userId: string, payload) => {
	const { page } = payload;
	return request({
		url: `/users/activities/${userId}?page=${page}`,
		method:'GET'
	});
}

export const updateUserProfileImage = formData => {
	return request({
		url: `/files/image`,
		method: 'POST',
		data: formData,
	});
};

export const updateUser = data => {
	return request({
		url: '/users/profile',
		method: 'PATCH',
		data,
	});
};
