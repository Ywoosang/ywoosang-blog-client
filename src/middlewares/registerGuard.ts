import { useStore } from "vuex";

export default async function (to, from, next) {
  try {
    const hash = to.query.hash;
    if (!hash) return next({ name: "NotFound" });
    const store = useStore();
    await store.dispatch("auth/fetchUserEmail", hash);
  } catch {
    return next({ name: "NotFound" });
  }
  next();
}
