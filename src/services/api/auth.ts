import request from '@/services/axios-interceptor';

export const getEmail = (hash: string) => {
	return request({
		url: `/auth/email?hash=${hash}`,
		method: 'GET',
	});
};

export const signIn = data => {
	return request({
		url: '/auth/login',
		method: 'POST',
		data,
	});
};

export const signUp = data => {
	return request({
		url: '/auth/register',
		method: 'POST',
		data,
	});
};

export const sendAuthEmail = data => {
	return request({
		url: '/auth/send-email',
		method: 'POST',
		data,
	});
};
