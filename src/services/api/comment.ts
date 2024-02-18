import request from '@/services/axios-interceptor';

export const createComment = data => {
	return request({
		url: '/comments',
		method: 'POST',
		data,
	});
};

export const createReply = (parentCommentId, data) => {
	return request({
		url: `/comments/${parentCommentId}/replies`,
		method: 'POST',
		data,
	});
};

export const getComments = postId => {
	return request({
		url: `/comments/posts/${postId}`,
		method: 'GET',
	});
};

export const deleteComment = commentId => {
	return request({
		url: `/comments/${commentId}`,
		method: 'DELETE',
	});
};

export const updateComment = (commentId, data) => {
	return request({
		url: `/comments/${commentId}`,
		method: 'PUT',
		data,
	});
};
