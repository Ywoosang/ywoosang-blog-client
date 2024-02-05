import { createRouter, createWebHistory } from 'vue-router'

// Views
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import PostCreate from '@/views/PostCreate.vue'
import AllPosts from '@/views/AllPosts.vue'
import PostDetail from '@/views/PostDetail.vue'
import NotFound from '@/views/NotFound.vue'
import AdminPage from '@/views/AdminPage.vue'
import CategoryPosts from '@/views/CategoryPosts.vue'
import TagPosts from '@/views/TagPosts.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import ProfileManage from '@/views/ProfileManage.vue'

// Layouts
import BlogLayout from '@/layouts/BlogLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
 
// Guards
import postListGuard from '@/middlewares/postListGuard'
import commonGuard from '@/middlewares/common'
import adminGuard from '@/middlewares/adminGuard'
import postDetailGuard from '@/middlewares/postDetailGuard'
import profileGuard from '@/middlewares/profileGuard'
import profileManageGuard from '@/middlewares/profileManageGuard'
// 
 
const routes = [
    {
        path: '/',
        redirect: '/post'
    },
    {
        path: '/post',
        component: BlogLayout,
        children: [
            {
                path: '',
                name: 'AllPosts',
                component: AllPosts,
                beforeEnter: postListGuard
            },
            {
                path: ':id',
                name: 'Post',
                component: PostDetail,
                beforeEnter: postDetailGuard
            },
        ]
    },
    {
        path: '/category',
        component: BlogLayout,
        children: [
            {
                path: ':id',
                name: 'Category',
                component: CategoryPosts,
                beforeEnter: postListGuard
            }
        ]
    },
    {
        path: '/tag',
        component: BlogLayout,
        children: [
            {
                path: ':id',
                name: 'Tag',
                component: TagPosts,
                beforeEnter: postListGuard
            }
        ]
    },
    {
        path: '/admin',
        component: AdminLayout,
        beforeEnter: adminGuard,
        children: [
            {
                path: '',
                name: 'Admin',
                component: AdminPage
            },
            {
                path: 'create',
                name: 'Create',
                component: PostCreate
            }
        ]
    },
    {
        path: '/auth',
        component: BlogLayout,
        children: [
            {
                path: 'signin',
                name: 'SignIn',
                component: SignIn
            },
            {
                path: 'signup',
                name: 'SignUp',
                component: SignUp
            }
        ]
    },
    {
        path: '/profile',
        component: BlogLayout,
        children: [
            {
                path: ':userLoginId',
                component: ProfilePage,
                beforeEnter: profileGuard
            },
            {
                path: ':userLoginId/manage',
                component: ProfileManage,
                beforeEnter: profileManageGuard
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(commonGuard);

export default router