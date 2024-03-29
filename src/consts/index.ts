export const BASE_URL =
  process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000";

export const GOOGLE_LOGIN_URL = `${BASE_URL}/auth/google`;
export const GITHUB_LOGIN_URL = `${BASE_URL}/auth/github`;
export const KAKAO_LOGIN_URL = `${BASE_URL}/auth/kakao`;
