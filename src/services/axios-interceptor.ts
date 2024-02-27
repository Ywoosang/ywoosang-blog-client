import axios, { AxiosError } from 'axios';
import AuthError from '@/exceptions/auth';

const baseURL = process.env.VUE_APP_BACKEND_DOMAIN || 'http://localhost:3000';

const service = axios.create({
	baseURL,
	timeout: 50000,
	withCredentials: true,
});

service.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}

		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

service.interceptors.response.use(
	response => {
		return response;
	},
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				let response;
				try {
					// infinite loop 방지를 위해 service 객체를 이용치 말 것
					response = await axios.post(
						`${baseURL}/auth/refresh`,
						{ refreshToken },
						{
							withCredentials: true,
						},
					);
					const newAccessToken = response.data.accessToken;
					error.config!.headers.Authorization = `Bearer ${newAccessToken}`;
					response = await axios.request(error.config!);
					return response;
				} catch (refreshError: any) {
					return Promise.reject(refreshError);
				}
			}
			return Promise.reject(error);
		}
		return Promise.reject(error);
	},
);

export default service;
