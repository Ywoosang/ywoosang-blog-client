export const BASE_URL =
  process.env.VUE_APP_BACKEND_DOMAIN || "http://localhost:3000";
export const FILE_BASE_URL =
  process.env.VUE_APP_FILE_BASE_URL || "http://localhost:3000";
export const GOOGLE_LOGIN_URL = `${BASE_URL}/auth/google`;
export const GITHUB_LOGIN_URL = `${BASE_URL}/auth/github`;
export const KAKAO_LOGIN_URL = `${BASE_URL}/auth/kakao`;
export const MAX_MODAL_COUNT = 5;
