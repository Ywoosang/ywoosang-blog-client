import request from '@/services/axios-interceptor';

export const uploadImageFile = (formData) => {
  return request({
    url: `/files/image`,
    method: 'POST',
    data: formData,
  });
};
