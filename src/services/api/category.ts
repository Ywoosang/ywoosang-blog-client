import request from '@/services/axios-interceptor';

export const getSidebarCategories = () => {
  return request({
    url: '/categories',
    method: 'GET',
  });
};

export const getSidebarPublicCategories = () => {
  return request({
    url: '/categories/public',
    method: 'GET',
  });
};

export const getCategory = (id, page) => {
  return request({
    url: `/categories/${id}`,
    method: 'GET',
    params: {
      page,
    },
  });
};

export const getPublicCategory = (id, page) => {
  return request({
    url: `/categories/public/${id}`,
    method: 'GET',
    params: {
      page,
    },
  });
};

export const getCategories = () => {
  return request({
    url: '/categories/list',
    method: 'GET',
  });
};

export const createCategory = (data) => {
  return request({
    url: '/categories',
    method: 'POST',
    data,
  });
};

export const updateCategory = (id, data) => {
  return request({
    url: `categories/${id}`,
    method: 'PUT',
    data,
  });
};

export const deleteCategory = (id) => {
  return request({
    url: `/categories/${id}`,
    method: 'DELETE',
  });
};
