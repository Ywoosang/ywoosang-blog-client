import { UsersRole } from "@/types/enums";
import { useStore } from "vuex";
import { isServerError } from "@/utils";

export default async function (to, from, next) {
  const store = useStore();
  try {
    const id = to.params.id;
    if (to.meta.requiresAuth == false) return next();
    if (id && !/^\d+$/.test(id)) return next({ name: "NotFound" });

    const user = await store.dispatch("users/fetchUser");
    const isLoggedIn: boolean = user ? true : false;
    const userRole: UsersRole = store.getters["users/getUserRole"];
    await store.dispatch("sidebar/fetchSideBar", userRole);
    store.commit("auth/SET_IS_LOGGED_IN", isLoggedIn);
    next();
  } catch (error: any) {
    if (error.response) {
      const statusCode: number = error.response.status;
      if (isServerError(statusCode)) {
        return next({ name: "ServerError" });
      } else if (statusCode == 401) {
        const errorMessage =
          error.response.data.message == "Unauthorized"
            ? "로그인이 만료되었습니다. 다시 로그인 해주세요."
            : error.response.data.message;
        store.dispatch("auth/logout");
        store.dispatch("auth/openLoginModal");
        store.commit("error/ADD_MODAL", errorMessage);
        return next();
      }
    } else if (error.message == "Network Error") {
      return next({ name: "NetworkError" });
    }
    next({ name: "NotFound" });
  }
}
