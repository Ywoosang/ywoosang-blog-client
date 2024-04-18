import { UsersRole } from "@/types/enums";
import { useStore } from "vuex";

export default async function (to, from, next) {
  const store = useStore();
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  const userRole = store.getters["users/getUserRole"];
  if (!isLoggedIn) {
    next("/auth/signIn");
  } else {
    if (userRole == UsersRole.ADMIN) {
      next();
    } else {
      next({ name: "NotFound" });
    }
  }
}
