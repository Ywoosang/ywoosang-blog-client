import { createRouter, createWebHistory } from 'vue-router';

// Pages
import SignIn from '@/pages/SignIn.vue';
import SignUp from '@/pages/SignUp.vue';
import PostEdit from '@/pages/PostEdit.vue';
import AllPosts from '@/pages/AllPosts.vue';
import PostDetail from '@/pages/PostDetail.vue';
import NotFound from '@/pages/NotFound.vue';
import AdminPage from '@/pages/AdminPage.vue';
import CategoryPosts from '@/pages/CategoryPosts.vue';
import TagPosts from '@/pages/TagPosts.vue';
import ProfilePage from '@/pages/ProfilePage.vue';
import ProfileManage from '@/pages/ProfileManage.vue';

// Layouts
import BlogLayout from '@/layouts/BlogLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

// Navigation Guards
import postListGuard from '@/middlewares/postListGuard';
import commonGuard from '@/middlewares/common';
import adminGuard from '@/middlewares/adminGuard';
import postDetailGuard from '@/middlewares/postDetailGuard';
import profileGuard from '@/middlewares/profileGuard';
import profileManageGuard from '@/middlewares/profileManageGuard';
import registerGuard from '@/middlewares/registerGuard';
import loginGuard from '@/middlewares/loginGuard';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/post',
	},
	{
		path: '/post',
		component: BlogLayout,
		children: [
			{
				path: '',
				name: 'AllPosts',
				component: AllPosts,
				beforeEnter: postListGuard,
			},
			{
				path: ':id',
				name: 'Post',
				component: PostDetail,
				beforeEnter: postDetailGuard,
			},
		],
	},
	{
		path: '/category',
		component: BlogLayout,
		children: [
			{
				path: ':id',
				name: 'Category',
				component: CategoryPosts,
				beforeEnter: postListGuard,
			},
		],
	},
	{
		path: '/tag',
		component: BlogLayout,
		children: [
			{
				path: ':id',
				name: 'Tag',
				component: TagPosts,
				beforeEnter: postListGuard,
			},
		],
	},
	{
		path: '/admin',
		component: AdminLayout,
		beforeEnter: adminGuard,
		children: [
			{
				path: '',
				name: 'Admin',
				component: AdminPage,
			},
			{
				path: 'create',
				name: 'Create',
				component: PostEdit,
			},
			{
				path: 'update/:id',
				name: 'Update',
				component: PostEdit,
			},
		],
	},
	{
		path: '/auth',
		component: AdminLayout,
		meta: {
			requiresAuth: false // 로그인이 필요하지 않음
		},
		children: [
			{
				path: 'register',
				name: 'Register',
				component: SignUp,
				beforeEnter: registerGuard,
			},
			{
				path: 'login',
				name: 'Login',
				beforeEnter: loginGuard,
				component: SignIn,
 
			},
		],
	},
	{
		path: '/profile',
		component: BlogLayout,
		children: [
			{
				path: ':userId/manage',
				component: ProfileManage,
				beforeEnter: profileManageGuard,
			},
			{
				path: ':userId',
				component: ProfilePage,
				beforeEnter: profileGuard,
			},
		],
	},
	{
		path: '/404',
		name: 'NotFound',
		meta: {
			requiresAuth: false
		},
		component: NotFound
	},
	{
		path: '/404',
		name: 'NotFound',
		meta: {
			requiresAuth: false
		},
		component: NotFound
	},
	{
		path: '/:pathMatch(.*)',
		redirect: '/404'
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(commonGuard);

export default router;
