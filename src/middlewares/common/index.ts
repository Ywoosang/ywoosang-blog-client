import { UsersRole } from "@/types/enums";
import { useStore } from "vuex";

export default async function (to, from, next) {
    const id = to.params.id;
    // id 가 존재하지만 숫자가 아닌 경우
    if (id && !/^\d+$/.test(id)) {
        next({ name: 'NotFound' });
    } else {
        const store = useStore();
        try {
            await store.dispatch('users/fetchUser');
            store.commit('auth/SET_IS_LOGGED_IN', true);
        } catch (e) {
            store.commit('auth/SET_IS_LOGGED_IN', false);
        }
        const userRole: UsersRole = store.getters['users/getUserRole'];
        try {
            await store.dispatch('sidebar/fetchSideBar', userRole);
        }  catch(e) {
            console.log(e);
        }
    }
    next();
}