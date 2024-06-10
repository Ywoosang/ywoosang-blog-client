import request from '@/services/axios-interceptor';

export const getSidebarTags = () => {
  return request({
    url: '/tags',
    method: 'GET'
  });
};

export const getSidebarPublicTags = () => {
  return request({
    url: '/tags/public',
    method: 'GET'
  });
};

export const getTag = (id, page, limit) => {
  return request({
    url: `tags/${id}`,
    method: 'GET',
    params: {
      page,
      limit
    }
  });
};

export const getPublicTag = (id, page, limit) => {
  return request({
    url: `tags/public/${id}`,
    method: 'GET',
    params: {
      page,
      limit
    }
  });
};
