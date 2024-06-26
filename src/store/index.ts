import { createStore, Store } from 'vuex';
import { RootState } from '@/types/interfaces';
import sidebarModule from './modules/sidebar';
import authModule from './modules/auth';
import usersModule from './modules/users';
import postModule from './modules/post';
import tagModule from './modules/tag';
import categoryModule from './modules/category';
import commentModule from './modules/comment';
import headerModule from './modules/header';
import errorModule from './modules/error';

const store: Store<RootState> = createStore({
  modules: {
    sidebar: sidebarModule,
    auth: authModule,
    users: usersModule,
    post: postModule,
    tag: tagModule,
    category: categoryModule,
    comment: commentModule,
    header: headerModule,
    error: errorModule,
  },
});

export default store;
