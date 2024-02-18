import request from '@/services/axios-interceptor';
import { CreatePostDto } from '@/types/dto';

export const uploadImageFile = formData => {
	return request({
		url: `/files/image`,
		method: 'POST',
		data: formData,
	});
};

export const create = (data: CreatePostDto) => {
	return request({
		url: '/posts',
		method: 'POST',
		data,
	});
};

export const getPublicPost = (postId: number) => {
	return request({
		url: `/posts/public/${postId}`,
		method: 'GET',
	});
};

export const getPost = (postId: number) => {
	return request({
		url: `/posts/${postId}`,
		method: 'GET',
	});
};

export const getPublicPosts = (page, limit) => {
	return request({
		url: `/posts/public`,
		method: 'GET',
		params: {
			page,
			limit,
		},
	});
};

export const getPosts = (page, limit) => {
	return request({
		url: '/posts',
		method: 'GET',
		params: {
			page,
			limit,
		},
	});
};

export const getTotalCount = () => {
	return request({
		url: '/posts/count',
		method: 'GET',
	});
};

export const getPublicCount = () => {
	return request({
		url: '/posts/public/count',
		method: 'GET',
	});
};

export const update = (id: number, data) => {
	return request({
		url: `/posts/${id}`,
		method: 'PUT',
		data,
	});
};

export const deleteOne = (id: number) => {
	return request({
		url: `/posts/${id}`,
		method: 'DELETE',
	});
};
